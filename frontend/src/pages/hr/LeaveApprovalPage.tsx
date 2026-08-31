import { useState, useEffect } from 'react'
import { leavesApi } from '../../api/leaves'

type LeaveStatus = 'Pending' | 'Approved' | 'Rejected'

interface Leave {
  id: number
  name: string
  dept: string
  type: string
  start: string
  end: string
  days: number
  reason: string
  requested: string
  status: LeaveStatus
}

const statusColors: Record<string, { color: string; bg: string }> = {
  Pending:  { color: '#FACC15', bg: 'rgba(250,204,21,0.1)' },
  Approved: { color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  Rejected: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
}

export default function LeaveApprovalPage() {
  const [leaves, setLeaves] = useState<Leave[]>([])
  const [filter, setFilter] = useState<'All' | LeaveStatus>('All')
  const [detail, setDetail] = useState<Leave | null>(null)

  useEffect(() => {
    leavesApi.getPending().then(res => {
      if (res && res.length > 0) {
        setLeaves(prev => {
          const apiLeaves: Leave[] = res.map(r => ({
            id: r.id,
            name: r.user_name,
            dept: r.department || 'Engineering',
            type: r.leave_type_name,
            start: r.start_date,
            end: r.end_date,
            days: r.days,
            reason: r.reason,
            requested: r.created_at ? r.created_at.slice(0, 10) : 'Recent',
            status: r.status as LeaveStatus,
          }))
          // Merge avoiding duplicates
          const ids = new Set(apiLeaves.map(a => a.id))
          return [...apiLeaves, ...prev.filter(p => !ids.has(p.id))]
        })
      }
    }).catch(() => {})
  }, [])

  const update = async (id: number, status: LeaveStatus) => {
    try {
      await leavesApi.action(id, status === 'Approved' ? 'approve' : 'reject')
    } catch {}
    setLeaves(ls => ls.map(l => l.id === id ? { ...l, status } : l))
    if (detail?.id === id) setDetail(d => d ? { ...d, status } : null)
  }

  const filtered = filter === 'All' ? leaves : leaves.filter(l => l.status === filter)

  const counts = { pending: leaves.filter(l => l.status === 'Pending').length, approved: leaves.filter(l => l.status === 'Approved').length, rejected: leaves.filter(l => l.status === 'Rejected').length }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Leave Approval</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Review and manage leave requests</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: counts.pending, color: '#FACC15' },
          { label: 'Approved', value: counts.approved, color: '#22C55E' },
          { label: 'Rejected', value: counts.rejected, color: '#EF4444' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4 cursor-pointer transition-all" style={{ background: '#111111', border: '1px solid #2A2A2A' }} onClick={() => setFilter(s.label as LeaveStatus)}>
            <div className="text-xs mb-2" style={{ color: '#6B6B6B' }}>{s.label}</div>
            <div className="font-heading text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className="px-4 py-2 rounded-xl text-xs font-medium transition-all" style={{ background: filter === f ? 'rgba(212,175,55,0.12)' : '#171717', color: filter === f ? '#D4AF37' : '#BDBDBD', border: filter === f ? '1px solid rgba(212,175,55,0.3)' : '1px solid #2A2A2A' }}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map(leave => (
            <div
              key={leave.id}
              className="rounded-2xl p-5 cursor-pointer transition-all"
              style={{ background: detail?.id === leave.id ? '#1A1A1A' : '#111111', border: `1px solid ${detail?.id === leave.id ? 'rgba(212,175,55,0.3)' : '#2A2A2A'}` }}
              onClick={() => setDetail(leave)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-xs" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
                    {leave.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">{leave.name}</div>
                    <div className="text-xs" style={{ color: '#6B6B6B' }}>{leave.dept} · {leave.type}</div>
                  </div>
                </div>
                <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: statusColors[leave.status].bg, color: statusColors[leave.status].color }}>
                  {leave.status}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: '#6B6B6B' }}>
                <span>{leave.start} → {leave.end}</span>
                <span style={{ color: '#D4AF37' }}>{leave.days} day{leave.days > 1 ? 's' : ''}</span>
                <span>Requested: {leave.requested}</span>
              </div>

              {leave.status === 'Pending' && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={e => { e.stopPropagation(); update(leave.id, 'Approved') }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Approve
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); update(leave.id, 'Rejected') }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 rounded-2xl" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
              <div className="text-3xl mb-2">📋</div>
              <p className="text-sm" style={{ color: '#6B6B6B' }}>No {filter !== 'All' ? filter.toLowerCase() : ''} requests</p>
            </div>
          )}
        </div>

        {/* Detail */}
        <div>
          {detail ? (
            <div className="rounded-2xl p-5 sticky top-6" style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 className="font-heading font-semibold text-white mb-4">Request Details</h3>
              <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: '1px solid #1E1E1E' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold" style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A' }}>
                  {detail.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-white">{detail.name}</div>
                  <div className="text-xs" style={{ color: '#6B6B6B' }}>{detail.dept}</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ['Leave Type', detail.type],
                  ['Start Date', detail.start],
                  ['End Date', detail.end],
                  ['Duration', `${detail.days} day${detail.days > 1 ? 's' : ''}`],
                  ['Requested On', detail.requested],
                  ['Status', detail.status],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between items-start gap-2">
                    <span className="text-xs" style={{ color: '#6B6B6B' }}>{label}</span>
                    {label === 'Status' ? (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: statusColors[value as string].bg, color: statusColors[value as string].color }}>{value}</span>
                    ) : (
                      <span className="text-xs font-medium text-right" style={{ color: '#FFFFFF' }}>{value}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #1E1E1E' }}>
                <div className="text-xs mb-1" style={{ color: '#6B6B6B' }}>Reason</div>
                <p className="text-sm" style={{ color: '#BDBDBD' }}>{detail.reason}</p>
              </div>
              {detail.status === 'Pending' && (
                <div className="mt-5 flex gap-2">
                  <button onClick={() => update(detail.id, 'Approved')} className="flex-1 py-2 rounded-xl text-sm font-heading font-medium" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>Approve</button>
                  <button onClick={() => update(detail.id, 'Rejected')} className="flex-1 py-2 rounded-xl text-sm font-heading font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>Reject</button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl p-8 text-center" style={{ background: '#111111', border: '1px dashed #2A2A2A' }}>
              <p className="text-sm" style={{ color: '#6B6B6B' }}>Select a request to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
