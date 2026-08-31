from rest_framework import serializers
from .models import LeaveType, LeaveBalance, LeaveRequest

class LeaveTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveType
        fields = '__all__'

class LeaveBalanceSerializer(serializers.ModelSerializer):
    leave_type_name = serializers.CharField(source='leave_type.name', read_only=True)
    remaining_days = serializers.ReadOnlyField()

    class Meta:
        model = LeaveBalance
        fields = ['id', 'leave_type', 'leave_type_name', 'total_days', 'used_days', 'pending_days', 'remaining_days']

class LeaveRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    employee_id = serializers.CharField(source='user.employee_id', read_only=True)
    department = serializers.CharField(source='user.department.name', read_only=True)
    leave_type_name = serializers.CharField(source='leave_type.name', read_only=True)
    reviewed_by_name = serializers.CharField(source='reviewed_by.get_full_name', read_only=True)

    class Meta:
        model = LeaveRequest
        fields = [
            'id', 'user', 'user_name', 'employee_id', 'department',
            'leave_type', 'leave_type_name', 'start_date', 'end_date',
            'days', 'reason', 'status', 'reviewed_by', 'reviewed_by_name',
            'review_notes', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'status', 'reviewed_by', 'created_at']
