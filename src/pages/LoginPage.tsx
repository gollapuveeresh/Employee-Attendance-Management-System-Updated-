import { useState } from 'react'

interface Props {
  onLogin: (email: string, password: string) => string | null
  onForgot: () => void
}

export default function LoginPage({ onLogin, onForgot }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    const err = onLogin(email, password)
    if (err) setError(err)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0A0A0A' }}>
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #111111 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(212,175,55,0.1) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(180deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)' }}
          >
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8zM22 22h6v6H22z" fill="white" fillOpacity="0.9" />
              <circle cx="31" cy="31" r="3" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
          <div>
            <div className="font-heading font-bold text-white text-lg leading-none">VPD Technologies</div>
            <div className="text-xs" style={{ color: '#6B6B6B' }}>Enterprise Platform</div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-8"
            style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-gold" />
            Workforce Management Suite
          </div>
          <h2 className="font-heading text-4xl font-bold text-white leading-tight mb-4">
            Monitor. Manage.<br />
            <span style={{ color: '#D4AF37' }}>Excel.</span>
          </h2>
          <p style={{ color: '#BDBDBD', lineHeight: 1.7 }}>
            The complete enterprise attendance solution for modern organizations. Real-time tracking, intelligent analytics, and seamless HR operations.
          </p>

          {/* Feature bullets */}
          <div className="mt-10 space-y-4">
            {[
              'Real-time check-in & check-out tracking',
              'Role-based access: Employee, HR, Admin',
              'Advanced analytics & automated reports',
              'Leave management & approval workflows',
            ].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: '#BDBDBD' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 flex gap-8">
          {[['2,400+', 'Employees'], ['99.9%', 'Uptime'], ['150+', 'Companies']].map(([val, label]) => (
            <div key={label}>
              <div className="font-heading text-xl font-bold" style={{ color: '#D4AF37' }}>{val}</div>
              <div className="text-xs" style={{ color: '#6B6B6B' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #A08820)' }}
            >
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                <path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8zM22 22h6v6H22z" fill="white" fillOpacity="0.9" />
                <circle cx="31" cy="31" r="3" fill="white" fillOpacity="0.6" />
              </svg>
            </div>
            <div className="font-heading font-bold text-white text-lg">VPD Technologies</div>
          </div>

          <h3 className="font-heading text-2xl font-bold text-white mb-1">Welcome back</h3>
          <p className="text-sm mb-8" style={{ color: '#BDBDBD' }}>Sign in to your account to continue</p>

          {/* Demo hint */}
          <div
            className="p-3 rounded-xl mb-6 text-xs"
            style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <div className="font-semibold mb-1" style={{ color: '#D4AF37' }}>Demo credentials</div>
            <div style={{ color: '#BDBDBD' }}>employee@vpd.com · hr@vpd.com · admin@vpd.com</div>
            <div style={{ color: '#6B6B6B' }}>Password: 123456 for all</div>
          </div>

          {error && (
            <div
              className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#BDBDBD' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-current outline-none transition-all"
                style={{
                  background: '#171717',
                  border: '1px solid #2A2A2A',
                  color: '#FFFFFF',
                }}
                onFocus={e => (e.target.style.borderColor = '#D4AF37')}
                onBlur={e => (e.target.style.borderColor = '#2A2A2A')}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#BDBDBD' }}>Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white outline-none transition-all"
                  style={{ background: '#171717', border: '1px solid #2A2A2A' }}
                  onFocus={e => (e.target.style.borderColor = '#D4AF37')}
                  onBlur={e => (e.target.style.borderColor = '#2A2A2A')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#6B6B6B' }}
                >
                  {showPass
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: '#D4AF37' }}
                />
                <span className="text-xs" style={{ color: '#BDBDBD' }}>Remember me</span>
              </label>
              <button type="button" onClick={onForgot} className="text-xs font-medium transition-colors hover:opacity-80" style={{ color: '#D4AF37' }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-heading font-semibold text-sm transition-all mt-2"
              style={{
                background: loading ? '#A08820' : 'linear-gradient(135deg, #D4AF37, #A08820)',
                color: '#0A0A0A',
                boxShadow: '0 4px 20px rgba(212,175,55,0.25)',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0110 10" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round"/></svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-8 flex items-center gap-3" style={{ borderTop: '1px solid #1E1E1E' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <span className="text-xs" style={{ color: '#6B6B6B' }}>Secured with 256-bit AES encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}
