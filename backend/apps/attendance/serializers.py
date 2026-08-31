from rest_framework import serializers
from .models import AttendanceRecord

class AttendanceRecordSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    employee_id = serializers.CharField(source='user.employee_id', read_only=True)
    department = serializers.CharField(source='user.department.name', read_only=True)
    branch = serializers.CharField(source='user.branch.name', read_only=True)

    class Meta:
        model = AttendanceRecord
        fields = [
            'id', 'user', 'user_name', 'employee_id', 'department', 'branch',
            'date', 'check_in', 'check_out', 'status', 'working_hours',
            'break_duration_seconds', 'is_on_break', 'break_start_time', 'notes'
        ]
        read_only_fields = ['id', 'user', 'created_at']
