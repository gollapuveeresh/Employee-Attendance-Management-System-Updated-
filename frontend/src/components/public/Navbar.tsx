import { useState, useEffect } from 'react'

export type PublicPage = 'home' | 'about' | 'features' | 'solutions' | 'contact' | 'faq' | 'support' | 'privacy-policy' | 'terms-and-conditions' | 'cookie-policy' | 'solutions/explore' | `solutions/explore/${string}` | 'features/attendance-tracking' | 'features/leave-management' | 'features/employee-directory' | 'features/advanced-reporting'

interface NavbarProps {
  page: PublicPage
  setPage: (p: PublicPage) => void
  onLoginClick: () => void
}

export default function Navbar({ page, setPage, onLoginClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks: { id: PublicPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' },
  ]

  const handleNavClick = (id: PublicPage) => {
    setPage(id)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A]/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg" onClick={() => handleNavClick('home')} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}>
          <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#A08820] shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8zM22 22h6v6H22z" fill="white" fillOpacity="0.9" />
              <circle cx="31" cy="31" r="3" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
          <div className="font-heading font-bold text-lg text-white leading-tight transition-colors duration-300">
            VPD <span className="text-[#D4AF37]">Technologies</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`group relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:active:transform-none ${
                page === link.id
                  ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                  : 'text-gray-300 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 hover:-translate-y-[1px]'
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              {page === link.id ? (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#D4AF37]"></span>
              ) : (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-[#D4AF37] transition-all duration-300 opacity-0 group-hover:w-4 group-hover:opacity-100 motion-reduce:transition-none"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <button
            onClick={onLoginClick}
            className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-[#0A0A0A] font-semibold text-sm transition-all duration-300 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] hover:bg-[#E8CB5A] hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:-translate-y-[2px] motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:active:transform-none"
          >
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-[#D4AF37] p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0D0D0D] border-b border-[#2A2A2A] transition-all duration-300 origin-top overflow-hidden ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`flex flex-col p-4 gap-2 transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'}`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`group relative w-full text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] motion-reduce:transition-none motion-reduce:active:transform-none ${
                page === link.id
                  ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                  : 'text-gray-300 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5'
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              {page === link.id && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 rounded-r-full bg-[#D4AF37]"></span>
              )}
            </button>
          ))}
          <button
            onClick={onLoginClick}
            className="w-full mt-2 px-5 py-4 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-semibold text-sm transition-all duration-300 text-center active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] hover:bg-[#E8CB5A] hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] motion-reduce:transition-none motion-reduce:active:transform-none"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  )
}
