import { useState } from 'react'
import type { AppUser, Page, Role } from '../App'

interface NavItem {
  id: Page
  label: string
  icon: React.ReactNode
}

const employeeNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { id: 'attendance-history', label: 'Attendance History', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> },
  { id: 'calendar', label: 'Calendar', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id: 'leave', label: 'Leave Management', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
  { id: 'profile', label: 'My Profile', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

const hrNav: NavItem[] = [
  { id: 'dashboard', label: 'HR Dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { id: 'employee-directory', label: 'Employee Directory', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
  { id: 'attendance-management', label: 'Attendance', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { id: 'leave-approval', label: 'Leave Approval', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> },
  { id: 'hr-reports', label: 'Reports', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { id: 'profile', label: 'My Profile', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

const adminNav: NavItem[] = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { id: 'company', label: 'Company', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: 'branches', label: 'Branches', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v4M8.5 17l-1.5-2M15.5 17l1.5-2M12 12l-3.5 3M12 12l3.5 3"/></svg> },
  { id: 'departments', label: 'Departments', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
  { id: 'roles', label: 'Roles & Permissions', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> },
  { id: 'admin-reports', label: 'Reports & Analytics', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { id: 'profile', label: 'My Profile', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

const navByRole: Record<Role, NavItem[]> = { employee: employeeNav, hr: hrNav, admin: adminNav }

const roleLabels: Record<Role, string> = { employee: 'Employee', hr: 'HR Manager', admin: 'Super Admin' }

interface Props {
  user: AppUser
  page: Page
  setPage: (p: Page) => void
  onLogout: () => void
  children: React.ReactNode
}

export default function Layout({ user, page, setPage, onLogout, children }: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const nav = navByRole[user.role]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid #1E1E1E' }}>
        <div
          className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)' }}
        >
          <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
            <path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8zM22 22h6v6H22z" fill="white" fillOpacity="0.9" />
            <circle cx="31" cy="31" r="3" fill="white" fillOpacity="0.6" />
          </svg>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-heading font-bold text-white text-sm leading-none whitespace-nowrap">VPD Technologies</div>
            <div className="text-xs mt-0.5 whitespace-nowrap" style={{ color: '#6B6B6B' }}>Attendance System</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hidden lg:flex items-center justify-center w-6 h-6 rounded-md transition-colors"
          style={{ color: '#6B6B6B' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {collapsed ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}
          </svg>
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 pt-4">
          <div
            className="px-2.5 py-1 rounded-lg text-xs font-medium inline-block"
            style={{
              background: user.role === 'admin' ? 'rgba(212,175,55,0.12)' : user.role === 'hr' ? 'rgba(59,130,246,0.12)' : 'rgba(34,197,94,0.12)',
              color: user.role === 'admin' ? '#D4AF37' : user.role === 'hr' ? '#3B82F6' : '#22C55E',
              border: `1px solid ${user.role === 'admin' ? 'rgba(212,175,55,0.2)' : user.role === 'hr' ? 'rgba(59,130,246,0.2)' : 'rgba(34,197,94,0.2)'}`,
            }}
          >
            {roleLabels[user.role]}
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map(item => {
          const active = page === item.id
          return (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setMobileOpen(false) }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
              style={{
                background: active ? 'rgba(212,175,55,0.12)' : 'transparent',
                color: active ? '#D4AF37' : '#BDBDBD',
                border: active ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {active && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#D4AF37' }} />
              )}
            </button>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="p-3" style={{ borderTop: '1px solid #1E1E1E' }}>
        <div className="flex items-center gap-3 px-2">
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-heading font-bold text-xs"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}
          >
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">{user.name}</div>
              <div className="text-xs truncate" style={{ color: '#6B6B6B' }}>{user.designation}</div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={onLogout}
              className="flex-shrink-0 p-1 rounded-lg transition-colors hover:opacity-80"
              style={{ color: '#6B6B6B' }}
              title="Logout"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 transition-all duration-300"
        style={{
          width: collapsed ? 68 : 240,
          background: '#0D0D0D',
          borderRight: '1px solid #1E1E1E',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside
            className="relative flex flex-col w-64 z-10"
            style={{ background: '#0D0D0D', borderRight: '1px solid #1E1E1E' }}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header
          className="flex items-center gap-4 px-6 h-14 flex-shrink-0"
          style={{ background: '#0D0D0D', borderBottom: '1px solid #1E1E1E' }}
        >
          <button
            className="lg:hidden p-1.5 rounded-lg"
            style={{ color: '#BDBDBD' }}
            onClick={() => setMobileOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          {/* Page title */}
          <div className="font-heading font-semibold text-sm text-white">
            {nav.find(n => n.id === page)?.label ?? 'Dashboard'}
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl transition-colors" style={{ color: '#BDBDBD', background: '#171717', border: '1px solid #2A2A2A' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-xs"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}
              >
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-medium text-white">{user.name.split(' ')[0]}</div>
                <div className="text-xs" style={{ color: '#6B6B6B' }}>{roleLabels[user.role]}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6" style={{ background: '#0A0A0A' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
