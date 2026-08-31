from rest_framework import viewsets, permissions, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from django_filters.rest_framework import DjangoFilterBackend
from .models import LeaveType, LeaveBalance, LeaveRequest
from .serializers import LeaveTypeSerializer, LeaveBalanceSerializer, LeaveRequestSerializer
from apps.accounts.permissions import IsAdminOrHR

class LeaveTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeaveType.objects.all()
    serializer_class = LeaveTypeSerializer
    permission_classes = [permissions.IsAuthenticated]

class MyLeaveBalancesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        balances = LeaveBalance.objects.filter(user=request.user)
        serializer = LeaveBalanceSerializer(balances, many=True)
        return Response(serializer.data)

class MyLeaveRequestsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        requests = LeaveRequest.objects.filter(user=request.user).order_by('-created_at')
        serializer = LeaveRequestSerializer(requests, many=True)
        return Response(serializer.data)

class ApplyLeaveView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        leave_type_id = request.data.get('leave_type')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        reason = request.data.get('reason')
        days = int(request.data.get('days', 1))

        try:
            if str(leave_type_id).isdigit():
                leave_type = LeaveType.objects.get(id=int(leave_type_id))
            else:
                leave_type = LeaveType.objects.get(name__iexact=str(leave_type_id))
        except (LeaveType.DoesNotExist, ValueError):
            raise ValidationError('Invalid leave type specified.')

        leave_req = LeaveRequest.objects.create(
            user=request.user,
            leave_type=leave_type,
            start_date=start_date,
            end_date=end_date,
            days=days,
            reason=reason,
            status=LeaveRequest.Status.PENDING
        )

        balance, _ = LeaveBalance.objects.get_or_create(user=request.user, leave_type=leave_type)
        balance.pending_days += days
        balance.save()

        return Response(LeaveRequestSerializer(leave_req).data, status=status.HTTP_201_CREATED)

class PendingLeavesView(APIView):
    permission_classes = [IsAdminOrHR]

    def get(self, request):
        pending = LeaveRequest.objects.filter(status=LeaveRequest.Status.PENDING).order_by('-created_at')
        serializer = LeaveRequestSerializer(pending, many=True)
        return Response(serializer.data)

class ApproveRejectLeaveView(APIView):
    permission_classes = [IsAdminOrHR]

    def post(self, request, pk):
        action = request.data.get('action')
        notes = request.data.get('notes', '')

        try:
            leave_req = LeaveRequest.objects.get(pk=pk)
        except LeaveRequest.DoesNotExist:
            raise NotFound('Leave request not found.')

        balance, _ = LeaveBalance.objects.get_or_create(user=leave_req.user, leave_type=leave_req.leave_type)

        if action == 'approve':
            leave_req.status = LeaveRequest.Status.APPROVED
            balance.pending_days = max(0, balance.pending_days - leave_req.days)
            balance.used_days += leave_req.days
            balance.save()
        elif action == 'reject':
            leave_req.status = LeaveRequest.Status.REJECTED
            balance.pending_days = max(0, balance.pending_days - leave_req.days)
            balance.save()
        else:
            raise ValidationError('Action must be approve or reject.')

        leave_req.reviewed_by = request.user
        leave_req.review_notes = notes
        leave_req.save()

        return Response(LeaveRequestSerializer(leave_req).data)


class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all().select_related('user', 'leave_type', 'reviewed_by', 'user__department', 'user__branch').order_by('-created_at')
    serializer_class = LeaveRequestSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'leave_type', 'user__department', 'user__branch']
    search_fields = ['user__first_name', 'user__last_name', 'user__employee_id', 'reason']
    ordering_fields = ['created_at', 'start_date', 'days']

    def get_permissions(self):
        if self.action in ['destroy']:
            return [IsAdminOrHR()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'hr'] or user.is_superuser:
            return super().get_queryset()
        return LeaveRequest.objects.filter(user=user)
