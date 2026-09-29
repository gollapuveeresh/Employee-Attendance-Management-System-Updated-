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

    def test_geofence_strict_check_in(self):
        from apps.organization.models import Branch
        branch = Branch.objects.create(
            name='Test Office',
            city='Bangalore',
            latitude=12.935200,
            longitude=77.624500,
            radius_meters=200,
            geofence_enabled=True
        )
        self.user.branch = branch
        self.user.save()

        # 1. Missing coordinates should be rejected
        res_no_loc = self.client.post(reverse('check_in'), {})
        self.assertEqual(res_no_loc.status_code, status.HTTP_400_BAD_REQUEST)

        # 2. Coordinates too far away (e.g., 5km away: lat 12.9800, lng 77.6245) should be rejected
        res_far = self.client.post(reverse('check_in'), {'latitude': 12.980000, 'longitude': 77.624500})
        self.assertEqual(res_far.status_code, status.HTTP_400_BAD_REQUEST)

        # 3. Coordinates within radius (50m away: lat 12.9353, lng 77.6245) should succeed
        res_inside = self.client.post(reverse('check_in'), {'latitude': 12.935300, 'longitude': 77.624500})
        self.assertEqual(res_inside.status_code, status.HTTP_201_CREATED)
        self.assertTrue(res_inside.data['is_location_verified'])
        self.assertIsNotNone(res_inside.data['distance_from_branch_meters'])
