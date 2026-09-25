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

// Public Pages
import PublicLayout from './components/public/PublicLayout'
import { PublicPage } from './components/public/Navbar'
import Home from './pages/public/Home'
import About from './pages/public/About'
import Features from './pages/public/Features'
import Solutions from './pages/public/Solutions'
import Contact from './pages/public/Contact'
import FAQ from './pages/public/FAQ'
import ExploreSolutions from './pages/public/ExploreSolutions'
import SolutionDetail from './pages/public/SolutionDetail'

export type Screen = 'splash' | 'public' | 'login' | 'forgot' | 'otp' | 'reset' | 'app'
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

import { authApi } from './api/auth'

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [page, setPage] = useState<Page>('dashboard')
  const [publicPage, setPublicPage] = useState<PublicPage>('home')
  const [user, setUser] = useState<AppUser | null>(null)
  const [forgotEmail, setForgotEmail] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('vpd_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {}
    }
    const timer = setTimeout(() => {
      setScreen(saved ? 'app' : 'public')
    }, 2400)
    return () => clearTimeout(timer)
  }, [])

  // Sync state to URL for public pages
  useEffect(() => {
    if (screen === 'public') {
      const path = publicPage === 'home' ? '/' : `/${publicPage}`
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path)
      }
    }
  }, [publicPage, screen])

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      if (screen !== 'public') return
      const path = window.location.pathname.slice(1)
      if (path.startsWith('solutions/explore')) {
        setPublicPage(path as PublicPage)
      } else if (['about', 'features', 'solutions', 'contact', 'faq'].includes(path)) {
        setPublicPage(path as PublicPage)
      } else {
        setPublicPage('home')
      }
    }
    window.addEventListener('popstate', handlePopState)
    handlePopState() // sync on mount
    return () => window.removeEventListener('popstate', handlePopState)
  }, [screen])

  const handleLogin = async (email: string, password: string): Promise<string | null> => {
    try {
      const res = await authApi.login(email, password)
      setUser(res.user)
      setPage('dashboard')
      setScreen('app')
      return null
    } catch (err: any) {
      // Fallback for offline demo accounts
      const found = DEMO_USERS[email.toLowerCase()]
      if (found && found.password === password) {
        const { password: _, ...u } = found
        setUser(u)
        setPage('dashboard')
        setScreen('app')
        return null
      }
      return err.message || 'Incorrect credentials or user not found.'
    }
  }

  const handleForgot = (email: string) => {
    setForgotEmail(email)
    setScreen('otp')
  }

  const handleOTP = () => {
    setScreen('login')
  }

  const handleLogout = () => {
    authApi.logout()
    setUser(null)
    setPage('dashboard')
    setScreen('login')
  }

  if (screen === 'splash') return <SplashScreen />
  
  if (screen === 'public') {
    const renderPublicPage = () => {
      if (publicPage.startsWith('solutions/explore/')) {
        return <SolutionDetail id={publicPage.replace('solutions/explore/', '')} setPage={setPublicPage} />
      }
      switch (publicPage) {
        case 'about': return <About onGetStarted={() => setScreen('login')} setPage={setPublicPage} />
        case 'features': return <Features onGetStarted={() => setScreen('login')} setPage={setPublicPage} />
        case 'solutions': return <Solutions onGetStarted={() => setScreen('login')} setPage={setPublicPage} />
        case 'contact': return <Contact />
        case 'faq': return <FAQ />
        case 'solutions/explore': return <ExploreSolutions setPage={setPublicPage} />
        default: return <Home onGetStarted={() => setScreen('login')} setPage={setPublicPage} />
      }
    }
    return (
      <PublicLayout page={publicPage} setPage={setPublicPage} onLoginClick={() => setScreen('login')}>
        {renderPublicPage()}
      </PublicLayout>
    )
  }

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
      case 'employee-directory': return <EmployeeDirectoryPage />
      case 'attendance-management': return <AttendanceManagementPage />
      case 'leave-approval': return <LeaveApprovalPage />
      case 'departments': return <DepartmentManagementPage />
      case 'branches': return <BranchManagementPage />
      case 'admin-reports': return <ReportsPage role="admin" />
      case 'company': return <CompanyManagementPage />
      case 'roles': return <RolesPermissionsPage />
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
