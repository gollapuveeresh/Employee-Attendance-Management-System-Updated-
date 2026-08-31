from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from apps.accounts.models import User
from apps.attendance.models import AttendanceRecord

class AttendanceAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='emp_attend@vpd.com',
            email='emp_attend@vpd.com',
            password='password123',
            role=User.Role.EMPLOYEE
        )
        self.client.force_authenticate(user=self.user)

    def test_check_in_and_status(self):
        response = self.client.post(reverse('check_in'))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNotNone(response.data['check_in'])

        status_resp = self.client.get(reverse('today_attendance'))
        self.assertEqual(status_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(status_resp.data['status'], 'checked-in')

    def test_duplicate_check_in_rejected(self):
        self.client.post(reverse('check_in'))
        dup_resp = self.client.post(reverse('check_in'))
        self.assertEqual(dup_resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(dup_resp.data.get('success', True))

    def test_break_and_checkout_flow(self):
        self.client.post(reverse('check_in'))
        
        break_resp = self.client.post(reverse('toggle_break'))
        self.assertEqual(break_resp.status_code, status.HTTP_200_OK)
        self.assertTrue(break_resp.data['is_on_break'])

        resume_resp = self.client.post(reverse('toggle_break'))
        self.assertEqual(resume_resp.status_code, status.HTTP_200_OK)
        self.assertFalse(resume_resp.data['is_on_break'])

        checkout_resp = self.client.post(reverse('check_out'))
        self.assertEqual(checkout_resp.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(checkout_resp.data['check_out'])
