from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from apps.accounts.models import User
from apps.organization.models import Company, Branch, Department

class AuthAndPermissionTests(APITestCase):
    def setUp(self):
        self.company = Company.objects.create(name='VPD Technologies', company_code='CO-001')
        self.branch = Branch.objects.create(name='Mumbai HQ', city='Mumbai', company=self.company)
        self.dept = Department.objects.create(name='Engineering', code='ENG', branch=self.branch)
        
        self.admin = User.objects.create_user(
            username='admin_test@vpd.com',
            email='admin_test@vpd.com',
            password='password123',
            role=User.Role.ADMIN,
            is_staff=True,
            is_superuser=True
        )
        self.hr = User.objects.create_user(
            username='hr_test@vpd.com',
            email='hr_test@vpd.com',
            password='password123',
            role=User.Role.HR
        )
        self.emp = User.objects.create_user(
            username='emp_test@vpd.com',
            email='emp_test@vpd.com',
            password='password123',
            role=User.Role.EMPLOYEE,
            department=self.dept,
            branch=self.branch
        )

    def test_jwt_login_success(self):
        response = self.client.post(reverse('token_obtain_pair'), {
            'username': 'emp_test@vpd.com',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertEqual(response.data['user']['email'], 'emp_test@vpd.com')

    def test_jwt_login_invalid_credentials(self):
        response = self.client.post(reverse('token_obtain_pair'), {
            'username': 'emp_test@vpd.com',
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(response.data.get('success', True))

    def test_unauthenticated_request_blocked(self):
        response = self.client.get(reverse('user_profile'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_profile_authenticated(self):
        self.client.force_authenticate(user=self.emp)
        response = self.client.get(reverse('user_profile'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'emp_test@vpd.com')

    def test_employee_cannot_create_users(self):
        self.client.force_authenticate(user=self.emp)
        response = self.client.post(reverse('user-list'), {
            'username': 'newuser@vpd.com',
            'email': 'newuser@vpd.com',
            'password': 'password123',
            'role': 'employee'
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_create_users(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(reverse('user-list'), {
            'username': 'createduser@vpd.com',
            'email': 'createduser@vpd.com',
            'password': 'password123',
            'role': 'employee'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
