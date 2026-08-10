import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const monthlyAttendance = [
  { month: 'Jan', present: 88, absent: 7, late: 5 },
  { month: 'Feb', present: 91, absent: 5, late: 4 },
  { month: 'Mar', present: 85, absent: 9, late: 6 },
  { month: 'Apr', present: 89, absent: 6, late: 5 },
  { month: 'May', present: 92, absent: 4, late: 4 },
  { month: 'Jun', present: 87, absent: 8, late: 5 },
  { month: 'Jul', present: 93, absent: 3, late: 4 },
  { month: 'Aug', present: 90, absent: 6, late: 4 },
]

const deptData = [
  { dept: 'Eng', attendance: 92 },
  { dept: 'HR', attendance: 100 },
  { dept: 'Mktg', attendance: 86 },
  { dept: 'Fin', attendance: 89 },
  { dept: 'Sales', attendance: 82 },
  { dept: 'Ops', attendance: 95 },
]

const reports = [
  { name: 'Monthly Attendance Report — July 2026', type: 'Attendance', generated: '2026-08-01', size: '245 KB' },
  { name: 'Leave Summary — Q2 2026', type: 'Leave', generated: '2026-07-01', size: '128 KB' },
  { name: 'Department Performance — H1 2026', type: 'Analytics', generated: '2026-07-01', size: '512 KB' },
  { name: 'Branch Attendance Comparison — June 2026', type: 'Branch', generated: '2026-07-01', size: '198 KB' },
]

const tooltipStyle = {
  contentStyle: { background: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: 8, color: '#BDBDBD', fontSize: 12 },
  labelStyle: { color: '#FFFFFF', fontWeight: 600 },
}

interface Props { role: 'hr' | 'admin' }

export default function ReportsPage({ role }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Generate and download attendance reports</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
          Generate Report
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Attendance', value: '90.3%', color: '#D4AF37' },
          { label: 'Total Present Days', value: '18,420', color: '#22C55E' },
          { label: 'Total Absent Days', value: '1,240', color: '#EF4444' },
          { label: 'Leave Days Used', value: '842', color: '#3B82F6' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
            <div className="text-xs mb-2" style={{ color: '#6B6B6B' }}>{s.label}</div>
            <div className="font-heading text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>YTD 2026</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">Monthly Attendance Trend (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyAttendance} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
              <YAxis stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} domain={[75, 100]} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="present" stroke="#D4AF37" strokeWidth={2} fill="url(#rPresent)" name="Present %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="font-heading font-semibold text-white mb-4">Department Attendance (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="dept" stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
              <YAxis stroke="#333" tick={{ fill: '#6B6B6B', fontSize: 11 }} domain={[75, 100]} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="attendance" fill="#D4AF37" radius={[4, 4, 0, 0]} name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Saved reports */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #1E1E1E' }}>
          <h3 className="font-heading font-semibold text-white">Generated Reports</h3>
        </div>
        <div className="divide-y" style={{ borderColor: '#1A1A1A' }}>
          {reports.map((r, i) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{r.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>{r.type} · {r.generated} · {r.size}</div>
                </div>
              </div>
              <button className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: 'rgba(212,175,55,0.08)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.15)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
