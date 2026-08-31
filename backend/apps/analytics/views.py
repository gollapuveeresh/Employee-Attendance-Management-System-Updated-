from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from apps.accounts.models import User
from apps.organization.models import Branch, Department
from apps.attendance.models import AttendanceRecord
from apps.leaves.models import LeaveRequest
from .models import AuditLog
from .serializers import AuditLogSerializer
from apps.accounts.permissions import IsAdminOrHR

class ExecutiveDashboardView(APIView):
    permission_classes = [IsAdminOrHR]

    def get(self, request):
        today = timezone.localdate()
        total_employees = User.objects.count()
        today_records = AttendanceRecord.objects.filter(date=today)

        present_count = today_records.filter(status='Present').count()
        late_count = today_records.filter(status='Late').count()
        leave_count = today_records.filter(status='Leave').count()
        absent_count = max(0, total_employees - (present_count + late_count + leave_count))

        branch_stats = []
        for b in Branch.objects.all():
            emp_count = b.members.count()
            pres = AttendanceRecord.objects.filter(date=today, user__branch=b, status__in=['Present', 'Late']).count()
            pct = round((pres / emp_count * 100), 1) if emp_count > 0 else 0
            branch_stats.append({
                'name': b.name,
                'employees': emp_count,
                'present': pres,
                'attendance': f'{pct}%'
            })

        dept_stats = []
        for d in Department.objects.all():
            emp_count = d.members.count()
            pres = AttendanceRecord.objects.filter(date=today, user__department=d, status__in=['Present', 'Late']).count()
            pct = round((pres / emp_count * 100), 1) if emp_count > 0 else 0
            dept_stats.append({
                'name': d.name,
                'employees': emp_count,
                'presentPct': pct
            })

        audit_logs = AuditLogSerializer(AuditLog.objects.all()[:5], many=True).data

        return Response({
            'overview': {
                'totalEmployees': total_employees,
                'activeToday': present_count + late_count,
                'hrManagers': User.objects.filter(role='hr').count(),
                'branches': Branch.objects.count(),
                'departments': Department.objects.count(),
            },
            'todayBreakdown': {
                'present': present_count,
                'absent': absent_count,
                'late': late_count,
                'onLeave': leave_count
            },
            'branchStats': branch_stats,
            'deptStats': dept_stats,
            'auditLogs': audit_logs
        })

class HRDashboardView(APIView):
    permission_classes = [IsAdminOrHR]

    def get(self, request):
        today = timezone.localdate()
        total_employees = User.objects.count()
        today_records = AttendanceRecord.objects.filter(date=today)

        present = today_records.filter(status='Present').count()
        late = today_records.filter(status='Late').count()
        on_leave = today_records.filter(status='Leave').count()
        absent = max(0, total_employees - (present + late + on_leave))
        pending_leaves = LeaveRequest.objects.filter(status='Pending').count()

        return Response({
            'summary': {
                'totalEmployees': total_employees,
                'present': present,
                'absent': absent,
                'late': late,
                'onLeave': on_leave,
                'pendingRequests': pending_leaves
            }
        })


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all().select_related('user').order_by('-created_at')
    serializer_class = AuditLogSerializer
    permission_classes = [IsAdminOrHR]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['log_type']
    search_fields = ['action', 'user__first_name', 'user__last_name', 'user__email']
    ordering_fields = ['created_at']
