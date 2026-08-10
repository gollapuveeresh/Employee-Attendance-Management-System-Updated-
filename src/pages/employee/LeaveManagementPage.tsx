import { useState } from 'react'

const leaveHistory = [
  { type: 'Annual Leave', start: '2026-08-08', end: '2026-08-08', days: 1, reason: 'Personal work', status: 'Approved' },
  { type: 'Sick Leave', start: '2026-07-29', end: '2026-07-29', days: 1, reason: 'Medical appointment', status: 'Approved' },
  { type: 'Annual Leave', start: '2026-06-20', end: '2026-06-22', days: 3, reason: 'Family vacation', status: 'Approved' },
  { type: 'Casual Leave', start: '2026-05-15', end: '2026-05-15', days: 1, reason: 'Personal errand', status: 'Rejected' },
  { type: 'Annual Leave', start: '2026-04-10', end: '2026-04-12', days: 3, reason: 'Travel', status: 'Approved' },
]

const statusColors: Record<string, { color: string; bg: string }> = {
  Approved: { color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  Rejected: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  Pending:  { color: '#FACC15', bg: 'rgba(250,204,21,0.1)' },
}

const leaveBalance = [
  { type: 'Annual Leave', total: 20, used: 8, pending: 0 },
  { type: 'Sick Leave', total: 12, used: 1, pending: 0 },
  { type: 'Casual Leave', total: 8, used: 1, pending: 0 },
  { type: 'Maternity Leave', total: 90, used: 0, pending: 0 },
]

export default function LeaveManagementPage() {
  const [tab, setTab] = useState<'request' | 'history' | 'balance'>('request')
  const [form, setForm] = useState({ type: 'Annual Leave', start: '', end: '', reason: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [history, setHistory] = useState(leaveHistory)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 800))
    const days = Math.max(1, Math.round((new Date(form.end).getTime() - new Date(form.start).getTime()) / 86400000) + 1)
    setHistory(h => [{ ...form, days, status: 'Pending' }, ...h])
    setSuccess(true)
    setSubmitting(false)
    setTimeout(() => { setSuccess(false); setTab('history'); setForm({ type: 'Annual Leave', start: '', end: '', reason: '' }) }, 1500)
  }

  const inputStyle = {
    background: '#171717', border: '1px solid #2A2A2A', color: '#FFFFFF',
  }
  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { e.target.style.borderColor = '#D4AF37' }
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { e.target.style.borderColor = '#2A2A2A' }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Leave Management</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>Request and manage your leave</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: '#171717', border: '1px solid #2A2A2A' }}>
        {(['request', 'history', 'balance'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
            style={{
              background: tab === t ? 'rgba(212,175,55,0.12)' : 'transparent',
              color: tab === t ? '#D4AF37' : '#BDBDBD',
              border: tab === t ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
            }}
          >
            {t === 'request' ? 'Request Leave' : t === 'history' ? 'Leave History' : 'Balance'}
          </button>
        ))}
      </div>

      {/* Request form */}
      {tab === 'request' && (
        <div className="max-w-xl">
          {success ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: '#111111', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-heading font-bold text-white text-lg mb-1">Request Submitted!</h3>
              <p className="text-sm" style={{ color: '#BDBDBD' }}>Your leave request is pending approval.</p>
            </div>
          ) : (
            <div className="rounded-2xl p-6" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
              <h3 className="font-heading font-semibold text-white mb-5">New Leave Request</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#BDBDBD' }}>Leave Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  >
                    {['Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity Leave', 'Paternity Leave', 'Emergency Leave'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#BDBDBD' }}>Start Date</label>
                    <input
                      type="date"
                      value={form.start}
                      onChange={e => setForm(f => ({ ...f, start: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ ...inputStyle, colorScheme: 'dark' }}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#BDBDBD' }}>End Date</label>
                    <input
                      type="date"
                      value={form.end}
                      onChange={e => setForm(f => ({ ...f, end: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ ...inputStyle, colorScheme: 'dark' }}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#BDBDBD' }}>Reason</label>
                  <textarea
                    value={form.reason}
                    onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                    required
                    rows={4}
                    placeholder="Describe the reason for your leave request..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{ ...inputStyle }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#BDBDBD' }}>Attachment (optional)</label>
                  <div
                    className="w-full px-4 py-4 rounded-xl text-sm border-2 border-dashed flex items-center gap-3 cursor-pointer"
                    style={{ borderColor: '#2A2A2A', color: '#6B6B6B' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
                    Click to upload or drag file here
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl font-heading font-semibold text-sm"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A', boxShadow: '0 4px 16px rgba(212,175,55,0.2)' }}
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* History */}
      {tab === 'history' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #1E1E1E' }}>
                  {['Leave Type', 'Start Date', 'End Date', 'Days', 'Reason', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-medium" style={{ color: '#6B6B6B' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((r, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: i < history.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                    <td className="px-5 py-4 text-sm text-white font-medium">{r.type}</td>
                    <td className="px-5 py-4 text-sm font-mono" style={{ color: '#BDBDBD' }}>{r.start}</td>
                    <td className="px-5 py-4 text-sm font-mono" style={{ color: '#BDBDBD' }}>{r.end}</td>
                    <td className="px-5 py-4 text-sm font-heading font-semibold" style={{ color: '#D4AF37' }}>{r.days}d</td>
                    <td className="px-5 py-4 text-sm max-w-[160px] truncate" style={{ color: '#BDBDBD' }}>{r.reason}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: statusColors[r.status].bg, color: statusColors[r.status].color }}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y" style={{ borderColor: '#1A1A1A' }}>
            {history.map((r, i) => (
              <div key={i} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">{r.type}</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: statusColors[r.status].bg, color: statusColors[r.status].color }}>{r.status}</span>
                </div>
                <div className="text-xs" style={{ color: '#6B6B6B' }}>{r.start} → {r.end} · {r.days} day{r.days > 1 ? 's' : ''}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>{r.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Balance */}
      {tab === 'balance' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaveBalance.map(lb => {
            const pct = ((lb.used / lb.total) * 100)
            return (
              <div key={lb.type} className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
                <div className="text-xs font-medium mb-3 text-white">{lb.type}</div>
                <div className="font-heading text-2xl font-bold mb-1" style={{ color: '#D4AF37' }}>
                  {lb.total - lb.used}
                  <span className="text-sm font-normal ml-1" style={{ color: '#6B6B6B' }}>remaining</span>
                </div>
                <div className="text-xs mb-3" style={{ color: '#6B6B6B' }}>{lb.used} used of {lb.total}</div>
                <div className="h-1.5 rounded-full" style={{ background: '#2A2A2A' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #D4AF37, #E8CB5A)' }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
