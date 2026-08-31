import { useState, useEffect } from 'react'
import { attendanceApi } from '../../api/attendance'

const statusColors: Record<string, { color: string; bg: string }> = {
  Present: { color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  Absent: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  Late: { color: '#FACC15', bg: 'rgba(250,204,21,0.1)' },
  Leave: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
}

export default function AttendanceManagementPage() {
  const [data, setData] = useState<any[]>([])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [dept, setDept] = useState('All')
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    attendanceApi.getAllRecords().then(res => {
      const list = res.results || res
      if (Array.isArray(list) && list.length > 0) {
        setData(list.map((r: any) => ({
          name: r.user_name || 'Employee',
          id: r.employee_id || `VPD-${r.id}`,
          dept: r.department || 'General',
          branch: r.branch || 'Mumbai HQ',
          checkIn: r.check_in ? r.check_in.slice(0, 5) : '--',
          checkOut: r.check_out ? r.check_out.slice(0, 5) : '--',
          hours: r.working_hours > 0 ? `${r.working_hours}h` : (r.check_in && !r.check_out ? 'Live' : '--'),
          status: r.status || 'Present'
        })))
      }
    }).catch(() => {})
  }, [date])

  const depts = ['All', ...Array.from(new Set(data.map(r => r.dept)))]

  const filtered = data.filter(r =>
    (dept === 'All' || r.dept === dept) &&
    (status === 'All' || r.status === status) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Attendance Management</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Monitor and manage employee attendance</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-2xl p-4 flex flex-wrap gap-3" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="px-3 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: '#171717', border: '1px solid #2A2A2A', color: '#FFFFFF', colorScheme: 'dark' }}
        />
        <div className="relative flex-1 min-w-[180px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search employees..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none"
            style={{ background: '#171717', border: '1px solid #2A2A2A' }}
          />
        </div>
        <select value={dept} onChange={e => setDept(e.target.value)} className="px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: '#171717', border: '1px solid #2A2A2A', color: '#BDBDBD' }}>
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: '#171717', border: '1px solid #2A2A2A', color: '#BDBDBD' }}>
          {['All', 'Present', 'Absent', 'Late', 'Leave'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #1E1E1E' }}>
                {['Employee', 'Department', 'Branch', 'Check-in', 'Check-out', 'Hours', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-medium" style={{ color: '#6B6B6B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-xs" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
                        {r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{r.name}</div>
                        <div className="text-xs" style={{ color: '#6B6B6B' }}>{r.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: '#BDBDBD' }}>{r.dept}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: '#BDBDBD' }}>{r.branch}</td>
                  <td className="px-5 py-4 text-sm font-mono" style={{ color: '#BDBDBD' }}>{r.checkIn}</td>
                  <td className="px-5 py-4 text-sm font-mono" style={{ color: '#BDBDBD' }}>{r.checkOut}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: r.hours === 'Live' ? '#D4AF37' : '#BDBDBD' }}>{r.hours}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: statusColors[r.status].bg, color: statusColors[r.status].color }}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-xs px-2.5 py-1 rounded-lg transition-colors" style={{ color: '#D4AF37', background: 'rgba(212,175,55,0.08)' }}>
                      Correct
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y" style={{ borderColor: '#1A1A1A' }}>
          {filtered.map(r => (
            <div key={r.id} className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs flex-shrink-0" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
                  {r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{r.name}</div>
                  <div className="text-xs" style={{ color: '#6B6B6B' }}>{r.checkIn} → {r.checkOut} · {r.hours}</div>
                </div>
              </div>
              <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: statusColors[r.status].bg, color: statusColors[r.status].color }}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
