export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center" style={{ background: '#0A0A0A' }}>
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Logo mark */}
      <div className="relative flex flex-col items-center animate-fade-in">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 glow-gold"
          style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #A08820 100%)' }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8zM22 22h6v6H22z" fill="white" fillOpacity="0.9" />
            <circle cx="31" cy="31" r="3" fill="white" fillOpacity="0.6" />
          </svg>
        </div>

        <h1 className="font-heading text-3xl font-bold text-white tracking-tight mb-1">
          VPD <span style={{ color: '#D4AF37' }}>Technologies</span>
        </h1>
        <p className="text-sm font-medium tracking-widest uppercase" style={{ color: '#BDBDBD' }}>
          Attendance Monitoring System
        </p>

        {/* Spinner */}
        <div className="mt-12 flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full border-2"
            style={{
              borderColor: '#2A2A2A',
              borderTopColor: '#D4AF37',
              animation: 'spin-slow 1s linear infinite',
            }}
          />
        </div>

        {/* Version */}
        <p className="mt-6 text-xs" style={{ color: '#6B6B6B' }}>
          v2.4.1 — Enterprise Edition
        </p>
      </div>

      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin { animation: spin-slow 1s linear infinite; }
      `}</style>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
      />
    </div>
  )
}
