from django.db import models
from apps.accounts.models import User

class AuditLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=255)
    log_type = models.CharField(max_length=50, default='info')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        uname = self.user.username if self.user else 'System'
        return f'{uname}: {self.action}'
