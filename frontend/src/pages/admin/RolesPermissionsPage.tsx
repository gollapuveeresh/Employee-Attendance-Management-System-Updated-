const permissions = ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage']

const modules = [
  'Attendance', 'Employees', 'Leave Requests', 'Reports', 'Departments',
  'Branches', 'Companies', 'Roles', 'HR Management', 'Audit Logs',
]

const roleMatrix: Record<string, Record<string, boolean[]>> = {
  'Super Admin': Object.fromEntries(modules.map(m => [m, permissions.map(() => true)])),
  'HR Manager': Object.fromEntries(modules.map((m, i) => [m, permissions.map((_, pi) => {
    if (['Companies', 'Roles', 'Branches', 'Departments'].includes(m)) return pi === 0
    if (m === 'Audit Logs') return false
    return pi <= 4
  })])),
  'Employee': Object.fromEntries(modules.map(m => [m, permissions.map((_, pi) => {
    if (m === 'Attendance' || m === 'Leave Requests') return pi === 0 || pi === 1
    return false
  })])),
}

const roleColors: Record<string, { color: string; bg: string }> = {
  'Super Admin': { color: '#D4AF37', bg: 'rgba(212,175,55,0.1)' },
  'HR Manager': { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  'Employee': { color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
}

export default function RolesPermissionsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Roles & Permissions</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Manage role-based access control</p>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(roleColors).map(([role, { color, bg }]) => (
          <div key={role} className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg, border: `1px solid ${color}30` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                  {role === 'Super Admin'
                    ? <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>
                    : role === 'HR Manager'
                    ? <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>
                    : <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>
                  }
                </svg>
              </div>
              <div>
                <div className="font-heading font-semibold text-white">{role}</div>
                <div className="text-xs" style={{ color: '#6B6B6B' }}>
                  {role === 'Super Admin' ? 'Full system access' : role === 'HR Manager' ? 'HR operations access' : 'Basic self-service access'}
                </div>
              </div>
            </div>
            <div className="text-xs px-3 py-2 rounded-xl" style={{ background: bg, color }}>
              {role === 'Super Admin' ? 'All 70 permissions' : role === 'HR Manager' ? '42 permissions across 7 modules' : '4 permissions (view + create)'}
            </div>
          </div>
        ))}
      </div>

      {/* Permission matrix */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #1E1E1E' }}>
          <h3 className="font-heading font-semibold text-white">Permission Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: '1px solid #1E1E1E' }}>
                <th className="px-5 py-3 text-left text-xs font-medium sticky left-0 z-10" style={{ color: '#6B6B6B', background: '#111111', minWidth: 130 }}>Module</th>
                {Object.keys(roleMatrix).map(role => (
                  <th key={role} colSpan={permissions.length} className="px-3 py-3 text-center text-xs font-medium" style={{ color: roleColors[role].color }}>
                    {role}
                  </th>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid #1E1E1E' }}>
                <th className="px-5 py-2 sticky left-0 z-10" style={{ background: '#111111' }} />
                {Object.keys(roleMatrix).flatMap(role =>
                  permissions.map(p => (
                    <th key={`${role}-${p}`} className="px-1 py-2 text-center text-xs" style={{ color: '#6B6B6B', minWidth: 48 }}>{p.slice(0, 3)}</th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {modules.map((mod, mi) => (
                <tr key={mod} className="hover:bg-white/[0.02]" style={{ borderBottom: mi < modules.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                  <td className="px-5 py-3 text-sm font-medium text-white sticky left-0 z-10" style={{ background: '#111111' }}>{mod}</td>
                  {Object.entries(roleMatrix).flatMap(([role, perms]) =>
                    perms[mod].map((allowed, pi) => (
                      <td key={`${role}-${mod}-${pi}`} className="px-1 py-3 text-center">
                        {allowed
                          ? <span className="inline-flex w-5 h-5 items-center justify-center rounded" style={{ background: 'rgba(34,197,94,0.12)' }}>
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                          : <span className="inline-flex w-5 h-5 items-center justify-center rounded" style={{ background: 'rgba(107,107,107,0.08)' }}>
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><line x1="1" y1="1" x2="7" y2="7" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/><line x1="7" y1="1" x2="1" y2="7" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/></svg>
                            </span>
                        }
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
