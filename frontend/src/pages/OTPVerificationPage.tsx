import { useState, useRef, useEffect } from 'react'

interface Props {
  email: string
  onVerify: () => void
  onBack: () => void
}

export default function OTPVerificationPage({ email, onVerify, onBack }: Props) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 5) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      refs.current[5]?.focus()
    }
    e.preventDefault()
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) { setError('Enter the complete 6-digit OTP.'); return }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    onVerify()
  }

  const handleResend = () => {
    setCanResend(false)
    setCountdown(60)
    setOtp(['', '', '', '', '', ''])
    refs.current[0]?.focus()
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
          Back
        </button>

        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 13l2 2 4-4"/></svg>
        </div>

        <h2 className="font-heading text-2xl font-bold text-white mb-2">OTP Verification</h2>
        <p className="text-sm mb-1" style={{ color: '#BDBDBD' }}>Enter the 6-digit code sent to</p>
        <p className="text-sm font-medium mb-8" style={{ color: '#D4AF37' }}>{email}</p>

        {error && (
          <div className="p-3 rounded-xl text-sm mb-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="flex gap-3 mb-6 justify-center" onPaste={handlePaste}>
            {otp.map((d, i) => (
              <input
                key={i}
                ref={el => { refs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-heading font-bold rounded-xl outline-none transition-all"
                style={{
                  background: '#171717',
                  border: d ? '1px solid #D4AF37' : '1px solid #2A2A2A',
                  color: '#FFFFFF',
                  boxShadow: d ? '0 0 12px rgba(212,175,55,0.15)' : 'none',
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-heading font-semibold text-sm transition-all mb-4"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)', color: '#0A0A0A', boxShadow: '0 4px 20px rgba(212,175,55,0.25)' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0110 10" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round"/></svg>
                Verifying...
              </span>
            ) : 'Verify OTP'}
          </button>
        </form>

        <div className="text-center text-sm" style={{ color: '#BDBDBD' }}>
          {canResend ? (
            <button onClick={handleResend} className="font-medium hover:opacity-80" style={{ color: '#D4AF37' }}>
              Resend OTP
            </button>
          ) : (
            <span>Resend in <span style={{ color: '#D4AF37' }}>{countdown}s</span></span>
          )}
        </div>
      </div>
    </div>
  )
}
