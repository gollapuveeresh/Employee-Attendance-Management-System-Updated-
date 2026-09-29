from rest_framework import viewsets, permissions, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from datetime import datetime, date, timedelta, time
from .models import AttendanceRecord
from .serializers import AttendanceRecordSerializer
from .utils import haversine_distance
from apps.accounts.permissions import IsAdminOrHR

class CheckInView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        today = timezone.localdate()
        existing = AttendanceRecord.objects.filter(user=request.user, date=today).first()
        if existing and existing.check_in:
            raise ValidationError('You have already checked in today.')

        user_branch = getattr(request.user, 'branch', None)
        lat = request.data.get('latitude')
        lng = request.data.get('longitude')

        distance = None
        is_verified = False

        # Geofence validation (Strict Mode)
        if user_branch and user_branch.latitude is not None and user_branch.longitude is not None:
            if lat is None or lng is None:
                raise ValidationError('GPS location is strictly required to check in. Please enable location access on your device.')

            try:
                distance = haversine_distance(lat, lng, user_branch.latitude, user_branch.longitude)
            except Exception:
                raise ValidationError('Invalid GPS coordinates provided.')

            if distance > user_branch.radius_meters:
                raise ValidationError('You are not at office location')
            is_verified = True
        elif lat is not None and lng is not None:
            is_verified = True

        now_time = timezone.localtime().time()
        status_val = AttendanceRecord.Status.LATE if now_time > time(9, 15) else AttendanceRecord.Status.PRESENT

        record, created = AttendanceRecord.objects.update_or_create(
            user=request.user,
            date=today,
            defaults={
                'check_in': now_time,
                'status': status_val,
                'is_on_break': False,
                'check_in_lat': lat,
                'check_in_lng': lng,
                'distance_from_branch_meters': distance,
                'is_location_verified': is_verified,
                'ip_address': getattr(request, 'client_ip', None)
            }
        )
        return Response(AttendanceRecordSerializer(record).data, status=status.HTTP_201_CREATED)

class ToggleBreakView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        today = timezone.localdate()
        record = AttendanceRecord.objects.filter(user=request.user, date=today).first()
        if not record or not record.check_in:
            raise ValidationError('You must check in first.')
        if record.check_out:
            raise ValidationError('You have already checked out for today.')

        now = timezone.now()
        if record.is_on_break:
            if record.break_start_time:
                break_diff = (now - record.break_start_time).total_seconds()
                record.break_duration_seconds += int(break_diff)
            record.is_on_break = False
            record.break_start_time = None
        else:
            record.is_on_break = True
            record.break_start_time = now

        record.save()
        return Response(AttendanceRecordSerializer(record).data)

class CheckOutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        today = timezone.localdate()
        record = AttendanceRecord.objects.filter(user=request.user, date=today).first()
        if not record or not record.check_in:
            raise ValidationError('No active check-in found for today.')
        if record.check_out:
            raise ValidationError('You have already checked out today.')

        now_time = timezone.localtime().time()
        record.check_out = now_time

        lat = request.data.get('latitude')
        lng = request.data.get('longitude')
        if lat is not None and lng is not None:
            record.check_out_lat = lat
            record.check_out_lng = lng

        if record.is_on_break and record.break_start_time:
            break_diff = (timezone.now() - record.break_start_time).total_seconds()
            record.break_duration_seconds += int(break_diff)
            record.is_on_break = False
            record.break_start_time = None

        check_in_dt = datetime.combine(today, record.check_in)
        check_out_dt = datetime.combine(today, now_time)
        total_seconds = max(0, (check_out_dt - check_in_dt).total_seconds() - record.break_duration_seconds)
        record.working_hours = round(total_seconds / 3600.0, 2)
        record.save()

        return Response(AttendanceRecordSerializer(record).data)

class TodayAttendanceView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        today = timezone.localdate()
        record = AttendanceRecord.objects.filter(user=request.user, date=today).first()

        user_branch = getattr(request.user, 'branch', None)
        branch_info = None
        if user_branch:
            branch_info = {
                'id': user_branch.id,
                'name': user_branch.name,
                'city': user_branch.city,
                'latitude': float(user_branch.latitude) if user_branch.latitude is not None else None,
                'longitude': float(user_branch.longitude) if user_branch.longitude is not None else None,
                'radius_meters': user_branch.radius_meters,
                'geofence_enabled': user_branch.geofence_enabled,
            }

        if not record:
            return Response({
                'status': 'not-checked-in',
                'record': None,
                'branch': branch_info
            })
        
        now_dt = datetime.combine(today, timezone.localtime().time())
        check_in_dt = datetime.combine(today, record.check_in) if record.check_in else now_dt
        elapsed_seconds = max(0, int((now_dt - check_in_dt).total_seconds()) - record.break_duration_seconds)

        return Response({
            'status': 'checked-out' if record.check_out else ('on-break' if record.is_on_break else 'checked-in'),
            'elapsed_seconds': elapsed_seconds,
            'break_duration_seconds': record.break_duration_seconds,
            'record': AttendanceRecordSerializer(record).data,
            'branch': branch_info
        })

class AttendanceHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        records = AttendanceRecord.objects.filter(user=request.user).order_by('-date')[:30]
        serializer = AttendanceRecordSerializer(records, many=True)
        return Response(serializer.data)

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = AttendanceRecord.objects.all().select_related('user', 'user__department', 'user__branch').order_by('-date')
    serializer_class = AttendanceRecordSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['date', 'status', 'user__department', 'user__branch']
    search_fields = ['user__first_name', 'user__last_name', 'user__employee_id']
    ordering_fields = ['date', 'check_in', 'working_hours']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminOrHR()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'hr'] or user.is_superuser:
            return super().get_queryset()
        return AttendanceRecord.objects.filter(user=user)
