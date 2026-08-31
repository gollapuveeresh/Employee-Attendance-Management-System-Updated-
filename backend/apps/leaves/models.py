from django.db import models
from apps.accounts.models import User

class LeaveType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    default_days_per_year = models.IntegerField(default=12)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class LeaveBalance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leave_balances')
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    total_days = models.IntegerField(default=12)
    used_days = models.IntegerField(default=0)
    pending_days = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'leave_type')

    @property
    def remaining_days(self):
        return max(0, self.total_days - (self.used_days + self.pending_days))

    def __str__(self):
        return f'{self.user.username} - {self.leave_type.name}: {self.remaining_days} left'

class LeaveRequest(models.Model):
    class Status(models.TextChoices):
        PENDING = 'Pending', 'Pending'
        APPROVED = 'Approved', 'Approved'
        REJECTED = 'Rejected', 'Rejected'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leave_requests')
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    days = models.IntegerField(default=1)
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_leaves')
    review_notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.username} - {self.leave_type.name} ({self.status})'
