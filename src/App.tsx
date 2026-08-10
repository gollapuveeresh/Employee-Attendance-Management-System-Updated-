import { useState, useEffect } from 'react'
import SplashScreen from './pages/SplashScreen'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import OTPVerificationPage from './pages/OTPVerificationPage'
import Layout from './components/Layout'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import AttendanceHistoryPage from './pages/employee/AttendanceHistoryPage'
import AttendanceCalendarPage from './pages/employee/AttendanceCalendarPage'
import LeaveManagementPage from './pages/employee/LeaveManagementPage'
import ProfilePage from './pages/shared/ProfilePage'
import HRDashboard from './pages/hr/HRDashboard'
import EmployeeDirectoryPage from './pages/hr/EmployeeDirectoryPage'
import LeaveApprovalPage from './pages/hr/LeaveApprovalPage'
import AttendanceManagementPage from './pages/hr/AttendanceManagementPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import BranchManagementPage from './pages/admin/BranchManagementPage'
import DepartmentManagementPage from './pages/admin/DepartmentManagementPage'
import RolesPermissionsPage from './pages/admin/RolesPermissionsPage'
import ReportsPage from './pages/admin/ReportsPage'
import CompanyManagementPage from './pages/admin/CompanyManagementPage'

export type Screen = 'splash' | 'login' | 'forgot' | 'otp' | 'reset' | 'app'
export type Role = 'employee' | 'hr' | 'admin'
export type Page =
  | 'dashboard'
  | 'attendance-history'
  | 'calendar'
  | 'leave'
  | 'profile'
  | 'employee-directory'
  | 'leave-approval'
  | 'attendance-management'
  | 'hr-reports'
  | 'company'
  | 'branches'
  | 'departments'
  | 'roles'
  | 'admin-reports'

export interface AppUser {
  name: string
  email: string
  role: Role
  department: string
  designation: string
  employeeId: string
  avatar?: string
}

const DEMO_USERS: Record<string, AppUser & { password: string }> = {
  'employee@vpd.com': {
    name: 'Arjun Sharma',
    email: 'employee@vpd.com',
    password: '123456',
    role: 'employee',
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    employeeId: 'VPD-EMP-0042',
  },
  'hr@vpd.com': {
    name: 'Priya Mehta',
    email: 'hr@vpd.com',
    password: '123456',
    role: 'hr',
    department: 'Human Resources',
    designation: 'HR Manager',
    employeeId: 'VPD-HR-0007',
  },
  'admin@vpd.com': {
    name: 'Rahul Verma',
    email: 'admin@vpd.com',
    password: '123456',
    role: 'admin',
    department: 'Executive',
    designation: 'Super Administrator',
    employeeId: 'VPD-ADM-0001',
  },
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [page, setPage] = useState<Page>('dashboard')
  const [user, setUser] = useState<AppUser | null>(null)
  const [forgotEmail, setForgotEmail] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setScreen('login'), 2800)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (email: string, password: string): string | null => {
    const found = DEMO_USERS[email.toLowerCase()]
    if (!found) return 'No account found with this email.'
    if (found.password !== password) return 'Incorrect password.'
    const { password: _, ...u } = found
    setUser(u)
    setPage('dashboard')
    setScreen('app')
    return null
  }

  const handleForgot = (email: string) => {
    setForgotEmail(email)
    setScreen('otp')
  }

  const handleOTP = () => {
    setScreen('login')
  }

  const handleLogout = () => {
    setUser(null)
    setPage('dashboard')
    setScreen('login')
  }

  if (screen === 'splash') return <SplashScreen />
  if (screen === 'login')
    return (
      <LoginPage
        onLogin={handleLogin}
        onForgot={() => setScreen('forgot')}
      />
    )
  if (screen === 'forgot')
    return (
      <ForgotPasswordPage
        onSendOTP={handleForgot}
        onBack={() => setScreen('login')}
      />
    )
  if (screen === 'otp')
    return (
      <OTPVerificationPage
        email={forgotEmail}
        onVerify={handleOTP}
        onBack={() => setScreen('forgot')}
      />
    )

  if (!user) return null

  const renderPage = () => {
    if (user.role === 'employee') {
      switch (page) {
        case 'attendance-history': return <AttendanceHistoryPage />
        case 'calendar': return <AttendanceCalendarPage />
        case 'leave': return <LeaveManagementPage />
        case 'profile': return <ProfilePage user={user} />
        default: return <EmployeeDashboard user={user} />
      }
    }
    if (user.role === 'hr') {
      switch (page) {
        case 'employee-directory': return <EmployeeDirectoryPage />
        case 'leave-approval': return <LeaveApprovalPage />
        case 'attendance-management': return <AttendanceManagementPage />
        case 'hr-reports': return <ReportsPage role="hr" />
        case 'profile': return <ProfilePage user={user} />
        default: return <HRDashboard user={user} />
      }
    }
    // admin
    switch (page) {
      case 'company': return <CompanyManagementPage />
      case 'branches': return <BranchManagementPage />
      case 'departments': return <DepartmentManagementPage />
      case 'roles': return <RolesPermissionsPage />
      case 'admin-reports': return <ReportsPage role="admin" />
      case 'profile': return <ProfilePage user={user} />
      default: return <AdminDashboard user={user} />
    }
  }

  return (
    <Layout user={user} page={page} setPage={setPage} onLogout={handleLogout}>
      {renderPage()}
    </Layout>
  )
}
