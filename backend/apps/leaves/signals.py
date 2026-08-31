from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import LeaveRequest
from apps.analytics.models import AuditLog

@receiver(post_save, sender=LeaveRequest)
def audit_leave_request_changes(sender, instance, created, **kwargs):
    if created:
        AuditLog.objects.create(
            user=instance.user,
            action=f'Applied for {instance.days} day(s) {instance.leave_type.name}',
            log_type='info'
        )
    elif instance.status in ['Approved', 'Rejected']:
        reviewer = instance.reviewed_by.get_full_name() if instance.reviewed_by else 'HR'
        AuditLog.objects.create(
            user=instance.reviewed_by,
            action=f'{reviewer} {instance.status.lower()} leave request for {instance.user.get_full_name()} ({instance.days} days {instance.leave_type.name})',
            log_type='success' if instance.status == 'Approved' else 'warning'
        )
