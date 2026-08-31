from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from .models import Company, Branch, Department

class DepartmentSerializer(serializers.ModelSerializer):
    employee_count = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = ['id', 'name', 'code', 'branch', 'description', 'employee_count', 'created_at']

    @extend_schema_field(serializers.IntegerField())
    def get_employee_count(self, obj):
        return obj.members.count() if hasattr(obj, 'members') else 0

class BranchSerializer(serializers.ModelSerializer):
    employee_count = serializers.SerializerMethodField()

    class Meta:
        model = Branch
        fields = ['id', 'name', 'city', 'address', 'is_headquarters', 'employee_count', 'created_at']

    @extend_schema_field(serializers.IntegerField())
    def get_employee_count(self, obj):
        return obj.members.count() if hasattr(obj, 'members') else 0

class CompanySerializer(serializers.ModelSerializer):
    branches = BranchSerializer(many=True, read_only=True)
    branch_count = serializers.SerializerMethodField()
    department_count = serializers.SerializerMethodField()
    employee_count = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ['id', 'name', 'company_code', 'plan', 'status', 'branches', 'branch_count', 'department_count', 'employee_count', 'created_at']

    @extend_schema_field(serializers.IntegerField())
    def get_branch_count(self, obj):
        return obj.branches.count()

    @extend_schema_field(serializers.IntegerField())
    def get_department_count(self, obj):
        return Department.objects.count()

    @extend_schema_field(serializers.IntegerField())
    def get_employee_count(self, obj):
        from apps.accounts.models import User
        return User.objects.count()
