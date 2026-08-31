from django.db import models
from django.utils import timezone
from datetime import datetime, time
from apps.accounts.models import User

class AttendanceRecord(models.Model):
    class Status(models.TextChoices):
        PRESENT = 'Present', 'Present'
        LATE = 'Late', 'Late'
        HALF_DAY = 'Half Day', 'Half Day'
        ABSENT = 'Absent', 'Absent'
        LEAVE = 'Leave', 'Leave'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField(default=timezone.now)
    check_in = models.TimeField(null=True, blank=True)
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PRESENT)
    working_hours = models.FloatField(default=0.0, help_text='Working hours in decimal format')
    break_duration_seconds = models.IntegerField(default=0)
    is_on_break = models.BooleanField(default=False)
    break_start_time = models.DateTimeField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'date')
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f'{self.user.username} - {self.date} ({self.status})'
