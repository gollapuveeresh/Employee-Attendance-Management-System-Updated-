import { useState, useEffect } from 'react'
import { attendanceApi } from '../../api/attendance'

const statusColors: Record<string, string> = {
  Present: '#22C55E', Late: '#FACC15', Absent: '#EF4444',
  Leave: '#3B82F6', Holiday: '#A855F7', 'Half Day': '#F97316',
}

export default function AttendanceHistoryPage() {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)
  const perPage = 8

  useEffect(() => {
    attendanceApi.getHistory().then(records => {
      if (records && records.length > 0) {
        setData(records.map(r => ({
          date: r.date,
          day: new Date(r.date).toLocaleDateString('en-US', { weekday: 'long' }),
          checkIn: r.check_in ? r.check_in.slice(0, 5) : '--',
          checkOut: r.check_out ? r.check_out.slice(0, 5) : '--',
          hours: r.working_hours > 0 ? `${r.working_hours}h` : (r.check_in && !r.check_out ? 'Live' : '--'),
          break: r.break_duration_seconds > 0 ? `${Math.round(r.break_duration_seconds / 60)}m` : '0m',
          status: r.status,
        })))
      }
    }).catch(() => {})
  }, [])

  const statuses = ['All', 'Present', 'Late', 'Absent', 'Leave', 'Half Day']

  const filtered = data.filter(d =>
    (filter === 'All' || d.status === filter) &&
    (d.date.includes(search) || d.day.toLowerCase().includes(search.toLowerCase()) || d.status.toLowerCase().includes(search.toLowerCase()))
  )

  const total = filtered.length
  const pageData = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  const summary = {
    present: data.filter(d => d.status === 'Present').length,
    late: data.filter(d => d.status === 'Late').length,
    absent: data.filter(d => d.status === 'Absent').length,
    leave: data.filter(d => d.status === 'Leave').length,
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Attendance History</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Your complete attendance record</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Present', value: summary.present, color: '#22C55E' },
          { label: 'Late', value: summary.late, color: '#FACC15' },
          { label: 'Absent', value: summary.absent, color: '#EF4444' },
          { label: 'On Leave', value: summary.leave, color: '#3B82F6' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
            <div className="text-xs mb-2" style={{ color: '#6B6B6B' }}>{s.label}</div>
            <div className="font-heading text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters + search */}
      <div className="rounded-2xl p-4 flex flex-col sm:flex-row gap-4" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by date or status..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none"
            style={{ background: '#171717', border: '1px solid #2A2A2A' }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => { setFilter(s); setPage(1) }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: filter === s ? 'rgba(212,175,55,0.12)' : '#171717',
                color: filter === s ? '#D4AF37' : '#BDBDBD',
                border: filter === s ? '1px solid rgba(212,175,55,0.3)' : '1px solid #2A2A2A',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #1E1E1E' }}>
                {['Date', 'Day', 'Check-in', 'Check-out', 'Working Hours', 'Break', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-medium" style={{ color: '#6B6B6B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((row, i) => (
                <tr key={i} className="transition-colors hover:bg-white/[0.02]" style={{ borderBottom: i < pageData.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                  <td className="px-5 py-4 text-sm font-mono text-white">{row.date}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: '#BDBDBD' }}>{row.day}</td>
                  <td className="px-5 py-4 text-sm font-mono" style={{ color: '#BDBDBD' }}>{row.checkIn}</td>
                  <td className="px-5 py-4 text-sm font-mono" style={{ color: '#BDBDBD' }}>{row.checkOut}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: row.hours === 'Live' ? '#D4AF37' : '#BDBDBD' }}>{row.hours}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: '#BDBDBD' }}>{row.break}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${statusColors[row.status]}15`, color: statusColors[row.status] }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y" style={{ borderColor: '#1A1A1A' }}>
          {pageData.map((row, i) => (
            <div key={i} className="p-4 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{row.date}</span>
                  <span className="text-xs" style={{ color: '#6B6B6B' }}>{row.day}</span>
                </div>
                <div className="text-xs mt-1" style={{ color: '#6B6B6B' }}>
                  {row.checkIn} → {row.checkOut} · {row.hours}
                </div>
              </div>
              <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${statusColors[row.status]}15`, color: statusColors[row.status] }}>
                {row.status}
              </span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: '1px solid #1E1E1E' }}>
          <span className="text-xs" style={{ color: '#6B6B6B' }}>
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-xs transition-all disabled:opacity-40"
              style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}
            >Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className="w-8 h-8 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: page === n ? 'rgba(212,175,55,0.12)' : '#171717',
                  color: page === n ? '#D4AF37' : '#BDBDBD',
                  border: page === n ? '1px solid rgba(212,175,55,0.3)' : '1px solid #2A2A2A',
                }}
              >{n}</button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs transition-all disabled:opacity-40"
              style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
