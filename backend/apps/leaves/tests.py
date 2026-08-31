from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from datetime import date, timedelta
from apps.accounts.models import User
from apps.leaves.models import LeaveType, LeaveRequest, LeaveBalance

class LeaveAndSignalsTests(APITestCase):
    def setUp(self):
        self.leave_type = LeaveType.objects.create(name='Annual Leave', default_days_per_year=20)
        self.hr = User.objects.create_user(
            username='hr_leaves@vpd.com',
            email='hr_leaves@vpd.com',
            password='password123',
            role=User.Role.HR
        )
        self.emp = User.objects.create_user(
            username='emp_leaves@vpd.com',
            email='emp_leaves@vpd.com',
            password='password123',
            role=User.Role.EMPLOYEE
        )

    def test_signal_auto_creates_leave_balances(self):
        balance = LeaveBalance.objects.filter(user=self.emp, leave_type=self.leave_type).first()
        self.assertIsNotNone(balance)
        self.assertEqual(balance.total_days, 20)
        self.assertEqual(balance.remaining_days, 20)

    def test_apply_leave_updates_pending_balance(self):
        self.client.force_authenticate(user=self.emp)
        today = date.today()
        response = self.client.post(reverse('apply_leave'), {
            'leave_type': self.leave_type.id,
            'start_date': str(today + timedelta(days=2)),
            'end_date': str(today + timedelta(days=4)),
            'days': 3,
            'reason': 'Vacation trip'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'Pending')

        balance = LeaveBalance.objects.get(user=self.emp, leave_type=self.leave_type)
        self.assertEqual(balance.pending_days, 3)
        self.assertEqual(balance.remaining_days, 17)

    def test_hr_approval_deducts_balance(self):
        self.client.force_authenticate(user=self.emp)
        today = date.today()
        apply_resp = self.client.post(reverse('apply_leave'), {
            'leave_type': self.leave_type.id,
            'start_date': str(today + timedelta(days=2)),
            'end_date': str(today + timedelta(days=3)),
            'days': 2,
            'reason': 'Medical checkup'
        })
        leave_id = apply_resp.data['id']

        self.client.force_authenticate(user=self.hr)
        action_resp = self.client.post(reverse('approve_reject_leave', kwargs={'pk': leave_id}), {
            'action': 'approve',
            'notes': 'Granted by HR'
        })
        self.assertEqual(action_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(action_resp.data['status'], 'Approved')

        balance = LeaveBalance.objects.get(user=self.emp, leave_type=self.leave_type)
        self.assertEqual(balance.pending_days, 0)
        self.assertEqual(balance.used_days, 2)
        self.assertEqual(balance.remaining_days, 18)

    def test_employee_cannot_approve_own_leave(self):
        self.client.force_authenticate(user=self.emp)
        today = date.today()
        apply_resp = self.client.post(reverse('apply_leave'), {
            'leave_type': self.leave_type.id,
            'start_date': str(today + timedelta(days=2)),
            'end_date': str(today + timedelta(days=2)),
            'days': 1,
            'reason': 'Personal'
        })
        leave_id = apply_resp.data['id']

        # Employee attempts to approve
        action_resp = self.client.post(reverse('approve_reject_leave', kwargs={'pk': leave_id}), {
            'action': 'approve'
        })
        self.assertEqual(action_resp.status_code, status.HTTP_403_FORBIDDEN)
