import { useState, useEffect } from 'react'

export type PublicPage = 'home' | 'about' | 'features' | 'solutions' | 'contact' | 'faq' | 'solutions/explore' | `solutions/explore/${string}`

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
        scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2A2A2A] py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
          <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#A08820] shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8zM22 22h6v6H22z" fill="white" fillOpacity="0.9" />
              <circle cx="31" cy="31" r="3" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
          <div className="font-heading font-bold text-lg text-white leading-tight">
            VPD <span className="text-[#D4AF37]">Technologies</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                page === link.id
                  ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <button
            onClick={onLoginClick}
            className="px-6 py-2 rounded-lg bg-[#D4AF37] text-[#0A0A0A] font-semibold text-sm transition-all hover:bg-[#E8CB5A] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
          >
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        className={`md:hidden absolute top-full left-0 w-full bg-[#0D0D0D] border-b border-[#2A2A2A] transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                page === link.id
                  ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onLoginClick}
            className="w-full mt-2 px-4 py-3 rounded-lg bg-[#D4AF37] text-[#0A0A0A] font-semibold text-sm transition-all text-center"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  )
}
