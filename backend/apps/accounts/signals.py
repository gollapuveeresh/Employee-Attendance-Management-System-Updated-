from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User
from apps.leaves.models import LeaveType, LeaveBalance
from apps.analytics.models import AuditLog

@receiver(post_save, sender=User)
def initialize_user_balances_and_audit(sender, instance, created, **kwargs):
    if created:
        # Create LeaveBalances for each LeaveType
        for lt in LeaveType.objects.all():
            LeaveBalance.objects.get_or_create(
                user=instance,
                leave_type=lt,
                defaults={
                    'total_days': lt.default_days_per_year,
                    'used_days': 0,
                    'pending_days': 0
                }
            )
        # Log AuditLog
        AuditLog.objects.create(
            user=instance,
            action=f'New employee account created: {instance.get_full_name() or instance.username} ({instance.role})',
            log_type='success'
        )
