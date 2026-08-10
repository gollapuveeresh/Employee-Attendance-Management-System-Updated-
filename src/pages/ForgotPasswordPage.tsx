import { useState } from 'react'

interface Props {
  onSendOTP: (email: string) => void
  onBack: () => void
}

export default function ForgotPasswordPage({ onSendOTP, onBack }: Props) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) { setError('Enter a valid email address.'); return }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
    setTimeout(() => onSendOTP(email), 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0A0A0A' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-80" style={{ color: '#BDBDBD' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Login
        </button>

        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
        </div>

        <h2 className="font-heading text-2xl font-bold text-white mb-2">Forgot Password?</h2>
        <p className="text-sm mb-8" style={{ color: '#BDBDBD' }}>Enter your registered email address and we'll send you an OTP to reset your password.</p>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="font-heading font-semibold text-white mb-1">OTP Sent!</p>
            <p className="text-sm" style={{ color: '#BDBDBD' }}>Redirecting to verification...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#BDBDBD' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                style={{ background: '#171717', border: '1px solid #2A2A2A' }}
                onFocus={e => (e.target.style.borderColor = '#D4AF37')}
                onBlur={e => (e.target.style.borderColor = '#2A2A2A')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-heading font-semibold text-sm transition-all"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A', boxShadow: '0 4px 20px rgba(212,175,55,0.25)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0110 10" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round"/></svg>
                  Sending OTP...
                </span>
              ) : 'Send OTP'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
