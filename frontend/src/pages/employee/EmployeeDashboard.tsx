import { useState, useEffect } from 'react'
import type { AppUser } from '../../App'

type AttendanceStatus = 'not-checked-in' | 'checked-in' | 'on-break' | 'checked-out'

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="rounded-2xl p-5 transition-all hover:scale-[1.01]" style={{ background: '#171717', border: '1px solid #2A2A2A' }}>
      <div className="text-xs font-medium mb-3" style={{ color: '#6B6B6B' }}>{label}</div>
      <div className="font-heading text-2xl font-bold" style={{ color }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: '#6B6B6B' }}>{sub}</div>}
    </div>
  )
}

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const map: Record<AttendanceStatus, { label: string; color: string; bg: string }> = {
    'not-checked-in': { label: 'Not Checked In', color: '#6B6B6B', bg: 'rgba(107,107,107,0.1)' },
    'checked-in': { label: 'Checked In', color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
    'on-break': { label: 'On Break', color: '#FACC15', bg: 'rgba(250,204,21,0.1)' },
    'checked-out': { label: 'Checked Out', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  }
  const s = map[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}30` }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  )
}

function LiveTimer({ seconds }: { seconds: number }) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return (
    <span className="font-mono text-5xl font-bold tracking-tight" style={{ color: '#D4AF37' }}>
      {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </span>
  )
}

import { attendanceApi } from '../../api/attendance'

const statusColors: Record<string, string> = {
  Present: '#22C55E',
  Late: '#FACC15',
  Absent: '#EF4444',
  Leave: '#3B82F6',
  Holiday: '#A855F7',
  'Half Day': '#F97316',
}

export default function EmployeeDashboard({ user }: Props) {
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>('not-checked-in')
  const [elapsed, setElapsed] = useState(0)
  const [breakElapsed, setBreakElapsed] = useState(0)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [recentAttendance, setRecentAttendance] = useState<any[]>([])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  useEffect(() => {
    attendanceApi.getHistory().then(records => {
      if (records && records.length > 0) {
        setRecentAttendance(records.slice(0, 5).map(r => ({
          date: new Date(r.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          checkIn: r.check_in ? r.check_in.slice(0, 5) : '--',
          checkOut: r.check_out ? r.check_out.slice(0, 5) : '--',
          hours: r.working_hours > 0 ? `${r.working_hours}h` : (r.check_in && !r.check_out ? 'Live' : '--'),
          status: r.status,
        })))
      }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    // Fetch today's actual attendance from backend
    attendanceApi.getToday().then(res => {
      if (res && res.status) {
        setAttendanceStatus(res.status)
        setElapsed(res.elapsed_seconds || 0)
        setBreakElapsed(res.break_duration_seconds || 0)
        if (res.record && res.record.check_in) {
          setCheckInTime(res.record.check_in.slice(0, 5))
        }
      }
    }).catch(() => {
      // Offline fallback
    })
  }, [])

  useEffect(() => {
    if (attendanceStatus !== 'checked-in') return
    const t = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(t)
  }, [attendanceStatus])

  useEffect(() => {
    if (attendanceStatus !== 'on-break') return
    const t = setInterval(() => setBreakElapsed(e => e + 1), 1000)
    return () => clearInterval(t)
  }, [attendanceStatus])

  const handleCheckIn = async () => {
    setLoading(true)
    try {
      const res = await attendanceApi.checkIn()
      setCheckInTime(res.check_in ? res.check_in.slice(0, 5) : new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
      setAttendanceStatus('checked-in')
      setElapsed(0)
    } catch {
      setCheckInTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
      setAttendanceStatus('checked-in')
      setElapsed(0)
    } finally {
      setLoading(false)
    }
  }

  const handleBreak = async () => {
    try {
      const res = await attendanceApi.toggleBreak()
      setAttendanceStatus(res.is_on_break ? 'on-break' : 'checked-in')
    } catch {
      setAttendanceStatus(s => s === 'on-break' ? 'checked-in' : 'on-break')
    }
  }

  const handleCheckOut = async () => {
    setLoading(true)
    try {
      await attendanceApi.checkOut()
      setAttendanceStatus('checked-out')
    } catch {
      setAttendanceStatus('checked-out')
    } finally {
      setLoading(false)
    }
  }

  const progressPct = Math.min((elapsed / (8 * 3600)) * 100, 100)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">{greeting}, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <StatusBadge status={attendanceStatus} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's card */}
        <div
          className="lg:col-span-2 rounded-2xl p-6"
          style={{ background: '#111111', border: '1px solid #2A2A2A' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold text-white">Today's Attendance</h2>
            <span className="text-xs px-2 py-1 rounded-lg" style={{ background: '#171717', color: '#6B6B6B' }}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Info row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Check-in', value: checkInTime ?? '--:--' },
              { label: 'Status', value: attendanceStatus === 'checked-out' ? 'Done' : attendanceStatus === 'on-break' ? 'Break' : attendanceStatus === 'checked-in' ? 'Active' : 'Pending' },
              { label: 'Working', value: elapsed > 0 ? `${Math.floor(elapsed / 3600)}h ${Math.floor((elapsed % 3600) / 60)}m` : '--' },
              { label: 'Break', value: breakElapsed > 0 ? `${Math.floor(breakElapsed / 60)}m ${breakElapsed % 60}s` : '--' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3" style={{ background: '#171717' }}>
                <div className="text-xs mb-1" style={{ color: '#6B6B6B' }}>{label}</div>
                <div className="font-heading font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          {attendanceStatus !== 'not-checked-in' && (
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-2" style={{ color: '#6B6B6B' }}>
                <span>Progress</span>
                <span>{Math.round(progressPct)}% of 8h target</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: '#2A2A2A' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #D4AF37, #E8CB5A)' }}
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {attendanceStatus === 'not-checked-in' && (
              <button
                onClick={handleCheckIn}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm transition-all"
                style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)', color: 'white', boxShadow: '0 4px 16px rgba(34,197,94,0.25)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {loading ? 'Checking in...' : 'Check In'}
              </button>
            )}
            {attendanceStatus === 'checked-in' && (
              <>
                <button
                  onClick={handleBreak}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-heading font-semibold text-sm transition-all"
                  style={{ background: 'rgba(250,204,21,0.1)', color: '#FACC15', border: '1px solid rgba(250,204,21,0.2)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  Take Break
                </button>
                <button
                  onClick={handleCheckOut}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-heading font-semibold text-sm transition-all"
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  {loading ? 'Checking out...' : 'Check Out'}
                </button>
              </>
            )}
            {attendanceStatus === 'on-break' && (
              <button
                onClick={handleBreak}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #FACC15, #D97706)', color: '#0A0A0A' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Resume Work
              </button>
            )}
            {attendanceStatus === 'checked-out' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(59,130,246,0.08)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.2)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Day complete — great work!
              </div>
            )}
          </div>
        </div>

        {/* Live timer */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
          style={{ background: '#111111', border: '1px solid #2A2A2A' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
          />
          <div className="text-xs font-medium mb-4 uppercase tracking-widest" style={{ color: '#6B6B6B' }}>
            {attendanceStatus === 'on-break' ? 'Break Time' : 'Working Time'}
          </div>
          <LiveTimer seconds={attendanceStatus === 'on-break' ? breakElapsed : elapsed} />
          <div className="mt-4 text-xs" style={{ color: '#6B6B6B' }}>
            {attendanceStatus === 'not-checked-in' ? 'Check in to start timer' :
              attendanceStatus === 'checked-out' ? 'Session ended' :
              attendanceStatus === 'on-break' ? 'Break in progress' :
              'Timer running'}
          </div>

          {/* Circular indicator */}
          <div className="mt-6 relative w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#2A2A2A" strokeWidth="4" />
              <circle
                cx="40" cy="40" r="34" fill="none"
                stroke="#D4AF37"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - progressPct / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-sm font-bold" style={{ color: '#D4AF37' }}>{Math.round(progressPct)}%</span>
            </div>
          </div>
          <div className="mt-2 text-xs" style={{ color: '#6B6B6B' }}>of 8h target</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Present Days" value={18} sub="This month" color="#22C55E" />
        <StatCard label="Absent Days" value={1} sub="This month" color="#EF4444" />
        <StatCard label="Late Arrivals" value={2} sub="This month" color="#FACC15" />
        <StatCard label="Leave Balance" value={12} sub="Days remaining" color="#D4AF37" />
      </div>

      {/* Recent attendance */}
      <div className="rounded-2xl" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #1E1E1E' }}>
          <h3 className="font-heading font-semibold text-white">Recent Attendance</h3>
          <span className="text-xs" style={{ color: '#6B6B6B' }}>This week</span>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #1E1E1E' }}>
                {['Date', 'Check-in', 'Check-out', 'Hours', 'Status'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium" style={{ color: '#6B6B6B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentAttendance.map((row, i) => (
                <tr key={i} className="transition-colors" style={{ borderBottom: i < recentAttendance.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                  <td className="px-6 py-4 text-sm text-white">{row.date}</td>
                  <td className="px-6 py-4 text-sm font-mono" style={{ color: '#BDBDBD' }}>{row.checkIn}</td>
                  <td className="px-6 py-4 text-sm font-mono" style={{ color: '#BDBDBD' }}>{row.checkOut}</td>
                  <td className="px-6 py-4 text-sm" style={{ color: row.hours === 'Live' ? '#D4AF37' : '#BDBDBD' }}>{row.hours}</td>
                  <td className="px-6 py-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${statusColors[row.status]}15`, color: statusColors[row.status] }}
                    >
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
          {recentAttendance.map((row, i) => (
            <div key={i} className="px-4 py-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-white">{row.date}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>{row.checkIn} → {row.checkOut} · {row.hours}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${statusColors[row.status]}15`, color: statusColors[row.status] }}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
