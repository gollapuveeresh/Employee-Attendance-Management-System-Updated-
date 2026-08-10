import { useState } from 'react'

const STATUS_COLORS: Record<string, { dot: string; bg: string; text: string }> = {
  Present: { dot: '#22C55E', bg: 'rgba(34,197,94,0.12)', text: '#22C55E' },
  Late:    { dot: '#FACC15', bg: 'rgba(250,204,21,0.12)', text: '#FACC15' },
  Absent:  { dot: '#EF4444', bg: 'rgba(239,68,68,0.12)', text: '#EF4444' },
  Leave:   { dot: '#3B82F6', bg: 'rgba(59,130,246,0.12)', text: '#3B82F6' },
  Holiday: { dot: '#A855F7', bg: 'rgba(168,85,247,0.12)', text: '#A855F7' },
}

const mockData: Record<string, string> = {
  '2026-08-01': 'Present', '2026-08-04': 'Present', '2026-08-05': 'Present',
  '2026-08-06': 'Late', '2026-08-07': 'Present', '2026-08-08': 'Leave',
  '2026-08-09': 'Present', '2026-08-11': 'Present', '2026-08-12': 'Present',
  '2026-08-13': 'Late', '2026-08-14': 'Absent', '2026-08-15': 'Holiday',
  '2026-07-31': 'Late', '2026-07-30': 'Present', '2026-07-29': 'Leave',
  '2026-07-28': 'Present', '2026-07-25': 'Present', '2026-07-24': 'Present',
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function AttendanceCalendarPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState<string | null>(null)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const dateKey = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const isToday = (d: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === d
  const isWeekend = (d: number) => {
    const day = new Date(year, month, d).getDay()
    return day === 0 || day === 6
  }

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1); setSelected(null) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1); setSelected(null) }

  const summary = {
    present: Object.entries(mockData).filter(([k, v]) => k.startsWith(`${year}-${String(month+1).padStart(2,'0')}`) && v === 'Present').length,
    late: Object.entries(mockData).filter(([k, v]) => k.startsWith(`${year}-${String(month+1).padStart(2,'0')}`) && v === 'Late').length,
    absent: Object.entries(mockData).filter(([k, v]) => k.startsWith(`${year}-${String(month+1).padStart(2,'0')}`) && v === 'Absent').length,
    leave: Object.entries(mockData).filter(([k, v]) => k.startsWith(`${year}-${String(month+1).padStart(2,'0')}`) && v === 'Leave').length,
  }

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Attendance Calendar</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Your monthly attendance overview</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-3 rounded-2xl p-6" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="text-center">
              <div className="font-heading font-bold text-white text-lg">{MONTHS[month]} {year}</div>
              <button
                onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()) }}
                className="text-xs px-2 py-0.5 rounded-full mt-1"
                style={{ color: '#D4AF37', background: 'rgba(212,175,55,0.1)' }}
              >
                Today
              </button>
            </div>
            <button
              onClick={nextMonth}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: '#171717', color: '#BDBDBD', border: '1px solid #2A2A2A' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center py-2 text-xs font-medium" style={{ color: '#6B6B6B' }}>{d}</div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={i} />
              const key = dateKey(d)
              const status = mockData[key]
              const sc = status ? STATUS_COLORS[status] : null
              const today_ = isToday(d)
              const weekend = isWeekend(d)
              const sel = selected === key

              return (
                <button
                  key={i}
                  onClick={() => setSelected(sel ? null : key)}
                  className="aspect-square flex flex-col items-center justify-center rounded-xl transition-all relative"
                  style={{
                    background: sel ? 'rgba(212,175,55,0.12)' : sc ? sc.bg : weekend ? 'rgba(255,255,255,0.02)' : 'transparent',
                    border: sel ? '1px solid rgba(212,175,55,0.3)' : today_ ? '1px solid rgba(212,175,55,0.5)' : '1px solid transparent',
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: today_ ? '#D4AF37' : sc ? sc.text : weekend ? '#444' : '#BDBDBD' }}
                  >
                    {d}
                  </span>
                  {status && (
                    <span className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ background: sc!.dot }} />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Summary */}
          <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
            <h3 className="font-heading font-semibold text-white text-sm mb-4">This Month</h3>
            <div className="space-y-3">
              {[
                { label: 'Present', value: summary.present, color: '#22C55E' },
                { label: 'Late', value: summary.late, color: '#FACC15' },
                { label: 'Absent', value: summary.absent, color: '#EF4444' },
                { label: 'Leave', value: summary.leave, color: '#3B82F6' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-sm" style={{ color: '#BDBDBD' }}>{s.label}</span>
                  </div>
                  <span className="font-heading font-bold text-sm" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
            <h3 className="font-heading font-semibold text-white text-sm mb-4">Legend</h3>
            <div className="space-y-2.5">
              {Object.entries(STATUS_COLORS).map(([label, { dot }]) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: dot }} />
                  <span className="text-xs" style={{ color: '#BDBDBD' }}>{label}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full border" style={{ borderColor: 'rgba(212,175,55,0.5)' }} />
                <span className="text-xs" style={{ color: '#BDBDBD' }}>Today</span>
              </div>
            </div>
          </div>

          {/* Selected day detail */}
          {selected && (
            <div className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 className="font-heading font-semibold text-white text-sm mb-3">{selected}</h3>
              {mockData[selected] ? (
                <div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: STATUS_COLORS[mockData[selected]].bg, color: STATUS_COLORS[mockData[selected]].text }}>
                    {mockData[selected]}
                  </span>
                </div>
              ) : (
                <p className="text-xs" style={{ color: '#6B6B6B' }}>No record for this day.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
