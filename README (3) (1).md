# VPD Technologies — Employee Attendance Management System

A full-stack, enterprise-grade **Employee Attendance & Leave Management System** built with:

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4
- **Backend:** Python + Django 5 + Django REST Framework
- **Database:** PostgreSQL
- **Authentication:** JWT

---

## 📁 Repository Structure

```text
Employee-Attendance-Management-System/
├── frontend/                     # React 19 + TypeScript + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── api/                  # API client & services
│   │   │   ├── Auth
│   │   │   ├── Attendance
│   │   │   ├── Leaves
│   │   │   └── Analytics
│   │   ├── components/           # Navigation layout, sidebars, modals
│   │   ├── pages/                # Admin, HR, Employee, Auth pages
│   │   ├── App.tsx               # Main application component
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                      # Django 5 + Django REST Framework
│   ├── core/                     # Project root settings, URLs, WSGI
│   │   ├── settings.py           # PostgreSQL/SQLite, JWT, CORS configuration
│   │   └── urls.py               # Root API router
│   ├── apps/
│   │   ├── accounts/             # Custom User model, roles & JWT authentication
│   │   ├── organization/         # Company, Branch, Department models & APIs
│   │   ├── attendance/           # Clock in/out, break tracker, work duration
│   │   ├── leaves/               # Leave types, balances, application & approval
│   │   └── analytics/            # Dashboard metrics & audit logs
│   ├── requirements.txt
│   └── manage.py
│
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup — Django REST Framework

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment on Windows:

```bash
python -m venv venv
.\venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create migrations:

```bash
python manage.py makemigrations organization accounts attendance leaves analytics
```

Apply migrations:

```bash
python manage.py migrate
```

Seed the demo database:

```bash
python manage.py seed_data
```

Run the backend server:

```bash
python manage.py runserver 8000
```

The backend will be available at:

```text
http://localhost:8000
```

---

### 2. Frontend Setup — React + Vite

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies using pnpm:

```bash
pnpm install
```

Or using npm:

```bash
npm install
```

Start the Vite development server:

```bash
pnpm run dev
```

Or:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:8443
```

or:

```text
http://localhost:5173
```

depending on the Vite configuration.

---

## 🔑 Demo Login Accounts

| Role | Username / Email | Password | Permissions & Capabilities |
|---|---|---|---|
| **Super Admin** | `admin@vpd.com` | `123456` | Executive dashboard, Branch/Department management, Roles & Permissions matrix, Audit logs |
| **HR Manager** | `hr@vpd.com` | `123456` | HR dashboard, Employee directory, Leave approval/rejection, Attendance management |
| **Employee** | `employee@vpd.com` | `123456` | Live check-in/out clock, Break timer, Attendance history & calendar, Leave application |

> **Note:** These credentials are intended for local/demo environments only. Do not use default passwords in production.

---

# 🔌 REST API Endpoints

## Authentication

**Base path:** `/api/auth/`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login/` | Authenticate and receive JWT access & refresh tokens |
| `POST` | `/api/auth/refresh/` | Refresh an expired JWT access token |
| `GET` | `/api/auth/profile/` | Get authenticated user details |
| `POST` | `/api/auth/change-password/` | Change user password |
| `GET` | `/api/auth/users/` | List all employees for HR/Admin users |

---

## Attendance

**Base path:** `/api/attendance/`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/attendance/check-in/` | Clock in for the current day |
| `POST` | `/api/attendance/break/toggle/` | Start or resume a break |
| `POST` | `/api/attendance/check-out/` | Clock out and calculate working duration |
| `GET` | `/api/attendance/today/` | Get today's attendance and elapsed timer |
| `GET` | `/api/attendance/history/` | Get attendance history for the current user |
| `GET` | `/api/attendance/records/` | Get company-wide attendance records for HR/Admin |

---

## Leaves

**Base path:** `/api/leaves/`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/leaves/balances/` | Get user leave balances |
| `GET` | `/api/leaves/my-requests/` | Get user's leave request history |
| `POST` | `/api/leaves/apply/` | Apply for leave |
| `GET` | `/api/leaves/pending/` | Get pending leave requests for HR/Admin |
| `POST` | `/api/leaves/{id}/action/` | Approve or reject a leave request |

Supported leave categories include:

- Annual Leave
- Sick Leave
- Casual Leave
- Maternity Leave

---

## Organization & Analytics

### Organization APIs

**Base path:** `/api/organization/`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/organization/companies/` | Get organization/company profile |
| `GET` | `/api/organization/branches/` | Get branch listings |
| `GET` | `/api/organization/departments/` | Get department listings |

### Analytics APIs

**Base path:** `/api/analytics/`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/analytics/executive-dashboard/` | Executive KPI metrics, branch and department statistics |
| `GET` | `/api/analytics/hr-dashboard/` | HR daily metrics and attendance trends |

---

# 🧪 Running Automated Tests

Navigate to the backend directory:

```bash
cd backend
```

Run the Django test suite:

```bash
.\venv\Scripts\python manage.py test
```

Alternatively, if the virtual environment is already activated:

```bash
python manage.py test
```

---

# 🏗️ Core Modules

The application is organized into the following major modules:

### 1. Accounts

Handles:

- Custom user management
- Authentication
- JWT access and refresh tokens
- Role-based access
- Password management
- Employee directory

### 2. Organization

Handles:

- Company information
- Branch management
- Department management
- Organizational structure

### 3. Attendance

Handles:

- Employee check-in
- Employee check-out
- Break tracking
- Work duration calculation
- Daily attendance
- Attendance history
- HR/Admin attendance records

### 4. Leave Management

Handles:

- Leave types
- Leave balances
- Leave applications
- Pending requests
- Approval/rejection workflow
- Leave history

### 5. Analytics

Handles:

- Executive dashboards
- HR dashboards
- KPI metrics
- Attendance trends
- Branch statistics
- Department statistics
- Audit logging

---

# 👥 User Roles

## Super Admin

Super Admin users can access:

- Executive dashboard
- Company configuration
- Branch management
- Department management
- User management
- Roles and permissions
- Audit logs
- Organization-wide analytics

## HR Manager

HR users can access:

- HR dashboard
- Employee directory
- Attendance management
- Attendance records
- Leave management
- Leave approval/rejection
- HR analytics

## Employee

Employees can access:

- Personal dashboard
- Live check-in/out
- Break timer
- Attendance history
- Attendance calendar
- Leave balances
- Leave applications
- Leave request history

---

# 🔐 Authentication & Authorization

The application uses **JWT-based authentication**.

The authentication flow is:

```text
User Login
    ↓
JWT Access + Refresh Tokens
    ↓
Authenticated API Requests
    ↓
Role-Based Authorization
    ↓
Protected Resources
```

Roles include:

```text
SUPER_ADMIN
HR
EMPLOYEE
```

API access should be restricted according to the authenticated user's role and permissions.

---

# 🗄️ Database

The primary production database is:

```text
PostgreSQL
```

The Django backend can also be configured to use SQLite for local development/testing depending on the project settings.

Database-related configuration is maintained in:

```text
backend/core/settings.py
```

---

# 🌐 Frontend Architecture

The frontend uses:

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- API service modules
- Reusable React components
- Role-based pages
- Protected application routes

High-level flow:

```text
React UI
   ↓
Components / Pages
   ↓
API Service Layer
   ↓
Django REST API
   ↓
PostgreSQL
```

---

# ⚙️ Backend Architecture

The backend uses:

- Python
- Django 5
- Django REST Framework
- JWT authentication
- PostgreSQL
- CORS configuration
- Modular Django applications

High-level architecture:

```text
Client / Browser
       ↓
Django REST API
       ↓
Authentication & Authorization
       ↓
Application Modules
 ┌─────┼────────┬──────────┐
 ↓     ↓        ↓          ↓
Auth  Org   Attendance   Leaves
       ↓        ↓          ↓
       └────────┼──────────┘
                ↓
            Analytics
                ↓
           PostgreSQL
```

---

# 📌 Development Notes

Before starting the application, verify:

1. Python is installed.
2. Node.js and/or pnpm is installed.
3. PostgreSQL is available if configured as the active database.
4. Backend dependencies are installed.
5. Frontend dependencies are installed.
6. Database migrations are applied.
7. Demo data is seeded when required.
8. Backend API is running before testing frontend API integrations.

---

# 🧪 Recommended Validation Flow

After starting both applications:

```text
1. Start PostgreSQL
        ↓
2. Start Django backend
        ↓
3. Verify API availability
        ↓
4. Start React/Vite frontend
        ↓
5. Open the application
        ↓
6. Test Super Admin login
        ↓
7. Test HR Manager login
        ↓
8. Test Employee login
        ↓
9. Test attendance workflow
        ↓
10. Test leave workflow
        ↓
11. Run automated tests
```

---

# 🚀 Production Considerations

Before production deployment, ensure:

- Default demo passwords are changed.
- Django `DEBUG` is disabled.
- Strong Django `SECRET_KEY` is configured.
- PostgreSQL credentials are stored securely.
- CORS is restricted to trusted frontend domains.
- JWT token lifetimes are configured appropriately.
- HTTPS is enabled.
- Production environment variables are used.
- Sensitive credentials are not committed to Git.
- Database backups are configured.
- Audit logging is enabled.
- Proper role-based permissions are enforced.
- Static and media files are configured for production.

---

# 📄 Project Summary

**VPD Technologies Employee Attendance Management System** provides a centralized platform for managing:

- Employee authentication
- Organization structure
- Employee attendance
- Check-in/check-out
- Break tracking
- Working-hour calculation
- Leave balances
- Leave applications
- Leave approvals
- HR operations
- Executive analytics
- Attendance reporting
- Audit logging

The system follows a modular full-stack architecture using **React + TypeScript + Tailwind CSS** on the frontend and **Django REST Framework + PostgreSQL** on the backend.
