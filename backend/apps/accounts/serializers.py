from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from drf_spectacular.utils import extend_schema_field
from .models import User
from apps.organization.serializers import DepartmentSerializer, BranchSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'] = serializers.CharField(required=False)
        self.fields['username'] = serializers.CharField(required=False)

    def validate(self, attrs):
        # Support login via email or username
        login_id = attrs.get('email') or attrs.get('username')
        if login_id and '@' in login_id:
            user = User.objects.filter(email__iexact=login_id).first()
            if user:
                attrs['username'] = user.username
        elif login_id:
            attrs['username'] = login_id

        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'name': self.user.get_full_name() or self.user.username,
            'email': self.user.email,
            'role': self.user.role,
            'employeeId': self.user.employee_id or f'VPD-EMP-{self.user.id:04d}',
            'designation': self.user.designation or 'Team Member',
            'department': self.user.department.name if self.user.department else 'General',
            'branch': self.user.branch.name if self.user.branch else 'HQ',
        }
        return data

class UserSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'name', 'first_name', 'last_name', 'email',
            'role', 'employee_id', 'designation', 'department', 'department_name',
            'branch', 'branch_name', 'phone_number', 'date_of_joining', 'is_active'
        ]
        read_only_fields = ['id']

    @extend_schema_field(serializers.CharField())
    def get_name(self, obj):
        return obj.get_full_name() or obj.username

class UserCreateUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 'password',
            'role', 'employee_id', 'designation', 'department', 'branch',
            'phone_number', 'date_of_joining', 'is_active'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password', '123456')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
