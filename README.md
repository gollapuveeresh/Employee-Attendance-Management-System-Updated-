# VPD Technologies — Employee Attendance Management System

A full-stack, enterprise-grade Employee Attendance & Leave Management System built with **React 19 + TypeScript + Tailwind CSS v4** on the frontend and **Python + Django REST Framework + PostgreSQL** on the backend.

---

## 📁 Repository Structure

`
Employee-Attendance-Management-System/
├── frontend/                     # React 19 + TypeScript + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── api/                  # API client & services (Auth, Attendance, Leaves, Analytics)
│   │   ├── components/           # Navigation layout, sidebars, modals
│   │   ├── pages/                # Admin, HR, Employee, Auth pages
│   │   ├── App.tsx               # Main application component
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                      # Django 5 + Django REST Framework (DRF)
│   ├── core/                     # Project root settings, URLs, WSGI
│   │   ├── settings.py           # PostgreSQL/SQLite, JWT, CORS configuration
│   │   └── urls.py               # Root API router
│   ├── apps/
│   │   ├── accounts/             # Custom User model, Roles (Admin, HR, Employee), JWT Auth
│   │   ├── organization/         # Company, Branch, Department models & APIs
│   │   ├── attendance/           # Clock in/out, Break tracker, Work duration calculator
│   │   ├── leaves/               # Leave types, Balances, Application & Approval lifecycle
│   │   └── analytics/            # Executive/HR dashboard metrics & Audit logs
│   ├── requirements.txt
│   └── manage.py
│
└── README.md
`

---

## 🚀 Quick Start Guide

### 1. Backend Setup (Django REST Framework)

`ash
# Navigate to backend directory
cd backend

# Create & activate virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations & seed demo database
python manage.py makemigrations organization accounts attendance leaves analytics
python manage.py migrate
python manage.py seed_data

# Run the backend server (starts on http://localhost:8000)
python manage.py runserver 8000
`

### 2. Frontend Setup (React + Vite)

`ash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
pnpm install
# or npm install

# Start Vite dev server (starts on http://localhost:8443 or http://localhost:5173)
pnpm run dev
`

---

## 🔑 Demo Login Accounts

| Role | Username / Email | Password | Permissions & Capabilities |
| :--- | :--- | :--- | :--- |
| **Super Admin** | dmin@vpd.com | 123456 | Executive dashboard, Branch/Dept management, Roles & Permissions matrix, Audit logs |
| **HR Manager** | hr@vpd.com | 123456 | HR dashboard, Employee directory, Leave approval/rejection, Attendance management |
| **Employee** | employee@vpd.com | 123456 | Live check-in/out clock, break timer, attendance history & calendar, leave application |

---

## 🔌 REST API Endpoints

### Authentication (/api/auth/)
- POST /api/auth/login/ — Authenticate and receive JWT access & refresh tokens
- POST /api/auth/refresh/ — Refresh expired JWT access token
- GET /api/auth/profile/ — Get authenticated user details
- POST /api/auth/change-password/ — Change user password
- GET /api/auth/users/ — List all employees (HR/Admin)

### Attendance (/api/attendance/)
- POST /api/attendance/check-in/ — Clock in for today
- POST /api/attendance/break/toggle/ — Start or resume break
- POST /api/attendance/check-out/ — Clock out and calculate working duration
- GET /api/attendance/today/ — Get today's attendance & elapsed timer
- GET /api/attendance/history/ — Attendance records for current user
- GET /api/attendance/records/ — Company-wide attendance records (HR/Admin)

### Leaves (/api/leaves/)
- GET /api/leaves/balances/ — User leave balances (Annual, Sick, Casual, Maternity)
- GET /api/leaves/my-requests/ — User leave request history
- POST /api/leaves/apply/ — Apply for leave
- GET /api/leaves/pending/ — Pending leave requests (HR/Admin)
- POST /api/leaves/{id}/action/ — Approve or Reject a leave request (HR/Admin)

### Organization & Analytics (/api/organization/ & /api/analytics/)
- GET /api/organization/companies/ — Organization profile
- GET /api/organization/branches/ — Branch listings
- GET /api/organization/departments/ — Department listings
- GET /api/analytics/executive-dashboard/ — Executive KPI metrics, branch & dept stats
- GET /api/analytics/hr-dashboard/ — HR daily metrics & attendance trends

---

## 🧪 Running Automated Tests

`ash
cd backend
.\venv\Scripts\python manage.py test
`
