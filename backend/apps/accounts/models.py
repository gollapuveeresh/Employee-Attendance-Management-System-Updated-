from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.organization.models import Department, Branch

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Super Admin'
        HR = 'hr', 'HR Manager'
        EMPLOYEE = 'employee', 'Employee'

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.EMPLOYEE)
    employee_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    designation = models.CharField(max_length=150, blank=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True, related_name='members')
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True, blank=True, related_name='members')
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    date_of_joining = models.DateField(null=True, blank=True)

    def is_admin_user(self):
        return self.role == self.Role.ADMIN or self.is_superuser

    def is_hr_user(self):
        return self.role == self.Role.HR

    def is_employee_user(self):
        return self.role == self.Role.EMPLOYEE

    def __str__(self):
        return f'{self.get_full_name() or self.username} ({self.role})'
