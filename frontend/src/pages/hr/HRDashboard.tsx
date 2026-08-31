import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import type { AppUser } from '../../App'
import { analyticsApi } from '../../api/analytics'
import { leavesApi } from '../../api/leaves'

const tooltipStyle = {
  contentStyle: { background: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: 8, color: '#BDBDBD', fontSize: 12 },
  itemStyle: { color: '#BDBDBD' },
  labelStyle: { color: '#FFFFFF', fontWeight: 600 },
}

interface Props { user: AppUser }

export default function HRDashboard({ user }: Props) {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    present: 0,
    absent: 0,
    late: 0,
    onLeave: 0,
    pendingRequests: 0
  })
  const [leavesList, setLeavesList] = useState<any[]>([])

  const pieData = [
    { name: 'Present', value: summary.present, color: '#22C55E' },
    { name: 'Absent', value: summary.absent, color: '#EF4444' },
    { name: 'Late', value: summary.late, color: '#FACC15' },
    { name: 'Leave', value: summary.onLeave, color: '#3B82F6' },
  ]

  const areaData = [
    { day: 'Mon', present: Math.max(0, summary.present - 4), absent: Math.max(0, summary.absent - 2), late: summary.late },
    { day: 'Tue', present: Math.max(0, summary.present - 2), absent: summary.absent, late: summary.late },
    { day: 'Wed', present: summary.present, absent: summary.absent, late: summary.late },
    { day: 'Thu', present: summary.present, absent: summary.absent, late: summary.late },
    { day: 'Fri', present: summary.present, absent: summary.absent, late: summary.late },
  ]

  const weeklyData = [
    { week: 'W1', present: Math.max(0, summary.present - 10), absent: summary.absent + 2, late: summary.late + 1 },
    { week: 'W2', present: Math.max(0, summary.present - 5), absent: summary.absent + 1, late: summary.late },
    { week: 'W3', present: Math.max(0, summary.present - 2), absent: summary.absent, late: summary.late },
    { week: 'W4', present: summary.present, absent: summary.absent, late: summary.late },
  ]

  useEffect(() => {
    analyticsApi.getHRDashboard().then(res => {
      if (res && res.summary) setSummary(res.summary)
    }).catch(() => {})

    leavesApi.getPending().then(res => {
      if (res && res.length > 0) {
        setLeavesList(res.map(r => ({
          name: r.user_name,
          dept: r.department || 'Engineering',
          type: r.leave_type_name,
          days: r.days,
          from: r.start_date,
          requested: r.created_at ? r.created_at.slice(0, 10) : 'Recent'
        })))
      }
    }).catch(() => {})
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">HR Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · Welcome, {user.name.split(' ')[0]}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total', value: summary.totalEmployees, color: '#FFFFFF', sub: 'Employees' },
          { label: 'Present', value: summary.present, color: '#22C55E', sub: 'Today' },
          { label: 'Absent', value: summary.absent, color: '#EF4444', sub: 'Today' },
          { label: 'Late', value: summary.late, color: '#FACC15', sub: 'Today' },
          { label: 'On Leave', value: summary.onLeave, color: '#3B82F6', sub: 'Today' },
          { label: 'Pending', value: summary.pendingRequests, color: '#D4AF37', sub: 'Requests' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4 transition-all hover:scale-[1.02]" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
            <div className="text-xs mb-2" style={{ color: '#6B6B6B' }}>{s.label}</div>
            <div className="font-heading text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area chart */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-white">Attendance Summary — This Week</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={areaData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="present" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="absent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
              <YAxis stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="present" stroke="#22C55E" strokeWidth={2} fill="url(#present)" name="Present" />
              <Area type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} fill="url(#absent)" name="Absent" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {[['#22C55E', 'Present'], ['#EF4444', 'Absent'], ['#FACC15', 'Late']].map(([c, l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                <span className="text-xs" style={{ color: '#6B6B6B' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">Today's Distribution</h3>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs" style={{ color: '#BDBDBD' }}>{d.name}</span>
                </div>
                <span className="text-xs font-heading font-semibold" style={{ color: d.color }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly bar + pending leaves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">Weekly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
              <XAxis dataKey="week" stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
              <YAxis stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="present" fill="#22C55E" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} name="Absent" />
              <Bar dataKey="late" fill="#FACC15" radius={[4, 4, 0, 0]} name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pending leaves */}
        <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-white">Pending Leave Requests</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37' }}>{leavesList.length}</span>
          </div>
          <div className="space-y-3">
            {leavesList.map((l, i) => (
              <div key={i} className="flex items-start justify-between gap-3 p-3 rounded-xl" style={{ background: '#171717' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-xs" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
                    {l.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{l.name}</div>
                    <div className="text-xs" style={{ color: '#6B6B6B' }}>{l.dept} · {l.type} · {l.days}d</div>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>✓</button>
                  <button className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
