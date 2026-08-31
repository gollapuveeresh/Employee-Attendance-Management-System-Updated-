from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date, time, timedelta
from apps.accounts.models import User
from apps.organization.models import Company, Branch, Department
from apps.attendance.models import AttendanceRecord
from apps.leaves.models import LeaveType, LeaveBalance, LeaveRequest
from apps.analytics.models import AuditLog

class Command(BaseCommand):
    help = 'Seeds initial sample data for VPD Technologies Attendance System'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        # 1. Company
        company, _ = Company.objects.get_or_create(
            company_code='CO-001',
            defaults={
                'name': 'VPD Technologies Pvt Ltd',
                'plan': 'Enterprise',
                'status': 'Active'
            }
        )

        # 2. Branches
        branches_data = [
            {'name': 'Mumbai HQ', 'city': 'Mumbai', 'is_headquarters': True, 'address': 'BKC, Bandra East, Mumbai'},
            {'name': 'Bangalore', 'city': 'Bangalore', 'is_headquarters': False, 'address': 'Koramangala, Bangalore'},
            {'name': 'Delhi', 'city': 'Delhi', 'is_headquarters': False, 'address': 'Connaught Place, New Delhi'},
            {'name': 'Chennai', 'city': 'Chennai', 'is_headquarters': False, 'address': 'OMR, Chennai'},
        ]
        branches = {}
        for b_data in branches_data:
            branch, _ = Branch.objects.get_or_create(
                name=b_data['name'],
                defaults={'company': company, **b_data}
            )
            branches[b_data['name']] = branch

        # 3. Departments
        depts_data = [
            {'name': 'Engineering', 'code': 'ENG', 'branch': branches['Mumbai HQ']},
            {'name': 'Human Resources', 'code': 'HR', 'branch': branches['Mumbai HQ']},
            {'name': 'Marketing', 'code': 'MKT', 'branch': branches['Delhi']},
            {'name': 'Finance', 'code': 'FIN', 'branch': branches['Mumbai HQ']},
            {'name': 'Sales', 'code': 'SLS', 'branch': branches['Chennai']},
            {'name': 'Operations', 'code': 'OPS', 'branch': branches['Delhi']},
            {'name': 'Design', 'code': 'DSG', 'branch': branches['Bangalore']},
            {'name': 'Executive', 'code': 'EXEC', 'branch': branches['Mumbai HQ']},
        ]
        depts = {}
        for d_data in depts_data:
            dept, _ = Department.objects.get_or_create(
                code=d_data['code'],
                defaults={'name': d_data['name'], 'branch': d_data['branch']}
            )
            depts[d_data['name']] = dept

        # 4. Leave Types
        leave_types = [
            {'name': 'Annual Leave', 'days': 20, 'desc': 'Paid vacation leave'},
            {'name': 'Sick Leave', 'days': 12, 'desc': 'Medical leave'},
            {'name': 'Casual Leave', 'days': 8, 'desc': 'Personal short leave'},
            {'name': 'Maternity Leave', 'days': 90, 'desc': 'Maternity benefits leave'},
        ]
        lt_objects = {}
        for lt_data in leave_types:
            lt, _ = LeaveType.objects.get_or_create(
                name=lt_data['name'],
                defaults={'default_days_per_year': lt_data['days'], 'description': lt_data['desc']}
            )
            lt_objects[lt_data['name']] = lt

        # 5. Core Users
        users_to_create = [
            {
                'username': 'admin@vpd.com',
                'email': 'admin@vpd.com',
                'first_name': 'Rahul',
                'last_name': 'Verma',
                'role': User.Role.ADMIN,
                'employee_id': 'VPD-ADM-0001',
                'designation': 'Super Administrator',
                'department': depts['Executive'],
                'branch': branches['Mumbai HQ'],
                'is_staff': True,
                'is_superuser': True,
            },
            {
                'username': 'hr@vpd.com',
                'email': 'hr@vpd.com',
                'first_name': 'Priya',
                'last_name': 'Mehta',
                'role': User.Role.HR,
                'employee_id': 'VPD-HR-0007',
                'designation': 'HR Manager',
                'department': depts['Human Resources'],
                'branch': branches['Mumbai HQ'],
                'is_staff': True,
            },
            {
                'username': 'employee@vpd.com',
                'email': 'employee@vpd.com',
                'first_name': 'Arjun',
                'last_name': 'Sharma',
                'role': User.Role.EMPLOYEE,
                'employee_id': 'VPD-EMP-0042',
                'designation': 'Senior Software Engineer',
                'department': depts['Engineering'],
                'branch': branches['Mumbai HQ'],
            },
            {
                'username': 'karan@vpd.com',
                'email': 'karan@vpd.com',
                'first_name': 'Karan',
                'last_name': 'Patel',
                'role': User.Role.EMPLOYEE,
                'employee_id': 'VPD-EMP-0003',
                'designation': 'Frontend Developer',
                'department': depts['Engineering'],
                'branch': branches['Bangalore'],
            },
            {
                'username': 'sneha@vpd.com',
                'email': 'sneha@vpd.com',
                'first_name': 'Sneha',
                'last_name': 'Joshi',
                'role': User.Role.EMPLOYEE,
                'employee_id': 'VPD-EMP-0004',
                'designation': 'Marketing Manager',
                'department': depts['Marketing'],
                'branch': branches['Delhi'],
            },
            {
                'username': 'amit@vpd.com',
                'email': 'amit@vpd.com',
                'first_name': 'Amit',
                'last_name': 'Singh',
                'role': User.Role.EMPLOYEE,
                'employee_id': 'VPD-EMP-0005',
                'designation': 'Finance Analyst',
                'department': depts['Finance'],
                'branch': branches['Mumbai HQ'],
            }
        ]

        created_users = {}
        for u_data in users_to_create:
            pwd = '123456'
            email = u_data['email']
            user, created = User.objects.get_or_create(
                username=u_data['username'],
                defaults=u_data
            )
            if created:
                user.set_password(pwd)
                user.save()
            created_users[email] = user

            # Create leave balances for each user
            for lt_name, lt in lt_objects.items():
                LeaveBalance.objects.get_or_create(
                    user=user,
                    leave_type=lt,
                    defaults={'total_days': lt.default_days_per_year, 'used_days': 2 if lt_name == 'Annual Leave' else 0}
                )

        # 6. Sample Attendance for Employee
        emp = created_users['employee@vpd.com']
        today = timezone.localdate()
        for i in range(1, 10):
            past_date = today - timedelta(days=i)
            if past_date.weekday() < 5:  # Weekday
                AttendanceRecord.objects.get_or_create(
                    user=emp,
                    date=past_date,
                    defaults={
                        'check_in': time(9, 2),
                        'check_out': time(18, 15),
                        'status': AttendanceRecord.Status.PRESENT,
                        'working_hours': 8.5,
                        'break_duration_seconds': 2400
                    }
                )

        # 7. Sample Pending Leaves
        karan = created_users['karan@vpd.com']
        LeaveRequest.objects.get_or_create(
            user=karan,
            leave_type=lt_objects['Annual Leave'],
            start_date=today + timedelta(days=2),
            end_date=today + timedelta(days=4),
            defaults={'days': 3, 'reason': 'Family vacation', 'status': LeaveRequest.Status.PENDING}
        )

        # 8. Sample Audit Logs
        AuditLog.objects.get_or_create(
            action='System initialized with seed company structure and users',
            log_type='info'
        )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
