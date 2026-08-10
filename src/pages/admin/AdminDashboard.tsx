import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import type { AppUser } from '../../App'

const monthlyTrend = [
  { month: 'Mar', attendance: 91.2 }, { month: 'Apr', attendance: 88.5 },
  { month: 'May', attendance: 92.1 }, { month: 'Jun', attendance: 89.3 },
  { month: 'Jul', attendance: 93.4 }, { month: 'Aug', attendance: 90.8 },
]

const weeklyData = [
  { day: 'Mon', present: 142, absent: 8, late: 12, leave: 4 },
  { day: 'Tue', present: 138, absent: 14, late: 10, leave: 4 },
  { day: 'Wed', present: 150, absent: 6, late: 6, leave: 4 },
  { day: 'Thu', present: 144, absent: 10, late: 8, leave: 4 },
  { day: 'Fri', present: 135, absent: 16, late: 11, leave: 4 },
]

const branchStats = [
  { name: 'Mumbai HQ', employees: 72, present: 65, attendance: '90.3%' },
  { name: 'Bangalore', employees: 48, present: 44, attendance: '91.7%' },
  { name: 'Delhi', employees: 31, present: 26, attendance: '83.9%' },
  { name: 'Chennai', employees: 15, present: 14, attendance: '93.3%' },
]

const deptStats = [
  { name: 'Engineering', employees: 58, presentPct: 92 },
  { name: 'Marketing', employees: 22, presentPct: 86 },
  { name: 'Finance', employees: 18, presentPct: 89 },
  { name: 'Sales', employees: 28, presentPct: 82 },
  { name: 'Operations', employees: 24, presentPct: 95 },
  { name: 'Design', employees: 16, presentPct: 93 },
]

const auditLogs = [
  { user: 'Priya Mehta', action: 'Approved leave for Karan Patel', time: '14 min ago', type: 'success' },
  { user: 'System', action: 'Attendance report generated for July 2026', time: '1h ago', type: 'info' },
  { user: 'Rahul Verma', action: 'Added new employee: Rohan Das', time: '2h ago', type: 'success' },
  { user: 'Priya Mehta', action: 'Rejected leave for Rohit Kumar', time: '3h ago', type: 'warning' },
  { user: 'System', action: 'Scheduled backup completed', time: '6h ago', type: 'info' },
]

const systemHealth = [
  { name: 'API Status', status: 'Operational', color: '#22C55E' },
  { name: 'Database', status: 'Operational', color: '#22C55E' },
  { name: 'Authentication', status: 'Operational', color: '#22C55E' },
  { name: 'Notifications', status: 'Degraded', color: '#FACC15' },
  { name: 'System Uptime', status: '99.94%', color: '#22C55E' },
]

const tooltipStyle = {
  contentStyle: { background: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: 8, color: '#BDBDBD', fontSize: 12 },
  labelStyle: { color: '#FFFFFF', fontWeight: 600 },
}

interface Props { user: AppUser }

export default function AdminDashboard({ user }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Executive Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
          style={{ background: 'rgba(212,175,55,0.08)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Super Admin — {user.name}
        </div>
      </div>

      {/* Company overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Employees', value: '166', color: '#FFFFFF' },
          { label: 'Active Today', value: '142', color: '#22C55E' },
          { label: 'HR Managers', value: '4', color: '#3B82F6' },
          { label: 'Branches', value: '4', color: '#D4AF37' },
          { label: 'Departments', value: '8', color: '#A855F7' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4 transition-all hover:scale-[1.02]" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
            <div className="text-xs mb-2" style={{ color: '#6B6B6B' }}>{s.label}</div>
            <div className="font-heading text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Attendance analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Present', value: '142', pct: '85.5%', color: '#22C55E' },
          { label: 'Absent', value: '10', pct: '6.0%', color: '#EF4444' },
          { label: 'Late', value: '8', pct: '4.8%', color: '#FACC15' },
          { label: 'On Leave', value: '6', pct: '3.6%', color: '#3B82F6' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
            <div className="text-xs mb-2" style={{ color: '#6B6B6B' }}>{s.label}</div>
            <div className="flex items-end gap-2">
              <span className="font-heading text-2xl font-bold" style={{ color: s.color }}>{s.value}</span>
              <span className="text-xs mb-1" style={{ color: s.color }}>{s.pct}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly trend */}
        <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">Monthly Attendance Rate (%)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
              <YAxis stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} domain={[80, 100]} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="attendance" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: '#D4AF37', r: 4 }} name="Attendance %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly breakdown */}
        <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">Weekly Breakdown</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
              <XAxis dataKey="day" stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
              <YAxis stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="present" fill="#22C55E" radius={[3, 3, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="#EF4444" radius={[3, 3, 0, 0]} name="Absent" />
              <Bar dataKey="late" fill="#FACC15" radius={[3, 3, 0, 0]} name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Branch + dept stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch */}
        <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">Branch Performance</h3>
          <div className="space-y-3">
            {branchStats.map(b => (
              <div key={b.name} className="flex items-center gap-4">
                <div className="w-28 text-xs font-medium text-white truncate">{b.name}</div>
                <div className="flex-1">
                  <div className="h-2 rounded-full" style={{ background: '#2A2A2A' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: b.attendance, background: 'linear-gradient(90deg, #D4AF37, #E8CB5A)' }}
                    />
                  </div>
                </div>
                <div className="text-xs font-heading font-semibold w-12 text-right" style={{ color: '#D4AF37' }}>{b.attendance}</div>
                <div className="text-xs w-16 text-right" style={{ color: '#6B6B6B' }}>{b.present}/{b.employees}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Department */}
        <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">Department Attendance</h3>
          <div className="space-y-3">
            {deptStats.map(d => (
              <div key={d.name} className="flex items-center gap-4">
                <div className="w-24 text-xs font-medium text-white truncate">{d.name}</div>
                <div className="flex-1">
                  <div className="h-2 rounded-full" style={{ background: '#2A2A2A' }}>
                    <div className="h-full rounded-full" style={{ width: `${d.presentPct}%`, background: d.presentPct >= 90 ? '#22C55E' : d.presentPct >= 85 ? '#FACC15' : '#EF4444' }} />
                  </div>
                </div>
                <div className="text-xs font-heading font-semibold w-10 text-right" style={{ color: d.presentPct >= 90 ? '#22C55E' : d.presentPct >= 85 ? '#FACC15' : '#EF4444' }}>{d.presentPct}%</div>
                <div className="text-xs w-8 text-right" style={{ color: '#6B6B6B' }}>{d.employees}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit logs + system health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {auditLogs.map((log, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: log.type === 'success' ? 'rgba(34,197,94,0.1)' : log.type === 'warning' ? 'rgba(250,204,21,0.1)' : 'rgba(59,130,246,0.1)' }}>
                  {log.type === 'success'
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    : log.type === 'warning'
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FACC15" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
                    : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white">{log.user}</div>
                  <div className="text-xs" style={{ color: '#BDBDBD' }}>{log.action}</div>
                </div>
                <div className="flex-shrink-0 text-xs" style={{ color: '#6B6B6B' }}>{log.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System health */}
        <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">System Health</h3>
          <div className="space-y-3">
            {systemHealth.map(s => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#171717' }}>
                <span className="text-xs text-white">{s.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs font-medium" style={{ color: s.color }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4" style={{ borderTop: '1px solid #1E1E1E' }}>
            <div className="text-xs mb-1" style={{ color: '#6B6B6B' }}>Overall System Status</div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#22C55E' }} />
              <span className="text-sm font-heading font-semibold" style={{ color: '#22C55E' }}>All Systems Go</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
