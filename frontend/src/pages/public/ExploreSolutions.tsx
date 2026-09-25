import React, { useEffect } from 'react'
import { PublicPage } from '../../components/public/Navbar'

interface ExploreSolutionsProps {
  setPage: (p: PublicPage) => void
}

const solutions = [
  {
    id: 'workforce-management',
    title: 'Workforce Management',
    desc: 'Streamline employee attendance, leave, workforce records, and daily operations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    color: 'from-blue-500/20 to-cyan-500/5'
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    desc: 'Reduce repetitive work through intelligent digital workflows and automation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    color: 'from-purple-500/20 to-fuchsia-500/5'
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    desc: 'Turn operational data into clear insights for better visibility and decision-making.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: 'from-emerald-500/20 to-teal-500/5'
  },
  {
    id: 'enterprise-software',
    title: 'Enterprise Software',
    desc: 'Build scalable software platforms tailored to organizational requirements.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    color: 'from-orange-500/20 to-amber-500/5'
  },
  {
    id: 'iot-smart-systems',
    title: 'IoT & Smart Systems',
    desc: 'Connect devices, collect real-world data, and create smarter operational environments.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14" />
      </svg>
    ),
    color: 'from-rose-500/20 to-pink-500/5'
  },
  {
    id: 'custom-technology',
    title: 'Custom Technology Solutions',
    desc: 'Design and develop technology solutions around specific business requirements.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: 'from-indigo-500/20 to-blue-500/5'
  }
]

export default function ExploreSolutions({ setPage }: ExploreSolutionsProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full bg-[#0A0A0A] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Subtle animated background visual */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#D4AF37]/10 to-transparent blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <div className="animate-fade-up">
            <span className="inline-block py-1 px-3 rounded-full bg-[#111111] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              VPD TECHNOLOGIES
            </span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Solutions</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover technology solutions designed to simplify operations, improve visibility, and help organizations work smarter.
            </p>
          </div>
        </div>
      </section>

      {/* EXPLORATION SECTION */}
      <section className="py-24 bg-[#0D0D0D] border-t border-[#1E1E1E] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">Solutions Built Around Your Needs</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore how our technology solutions can support different areas of your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, i) => (
              <div 
                key={sol.id}
                onClick={() => setPage(`solutions/explore/${sol.id}` as PublicPage)}
                className="group relative rounded-3xl bg-[#111111] border border-[#2A2A2A] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]/50"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/5 group-hover:to-transparent transition-colors duration-500" />
                
                {/* Premium Image/Visual Area */}
                <div className="h-48 relative overflow-hidden bg-[#1A1A1A] p-6 flex items-center justify-center">
                   <div className={`absolute inset-0 bg-gradient-to-br ${sol.color} opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />
                   <div className="relative z-10 w-24 h-24 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/30 transition-all duration-700">
                      {React.cloneElement(sol.icon as React.ReactElement<any>, { className: 'w-12 h-12' })}
                   </div>
                   
                   {/* Light Sweep Effect */}
                   <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                </div>

                <div className="p-8 relative">
                  {/* Subtle Gold Accent Line */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                      {sol.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">{sol.title}</h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 h-16">
                    {sol.desc}
                  </p>
                  
                  <div className="flex items-center text-[#D4AF37] font-semibold text-sm group/btn">
                    Explore Solution
                    <svg 
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#111111] border-t border-[#1E1E1E] text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-[#D4AF37]/5 rounded-t-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Explore <span className="text-[#D4AF37]">What's Possible?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Let's build technology that works around the way your organization operates.
          </p>
          <button
            onClick={() => setPage('contact')}
            className="px-8 py-4 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-bold text-lg transition-all hover:bg-[#E8CB5A] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] inline-flex items-center gap-3"
          >
            Talk to Our Team
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      {/* Shimmer keyframes for tailwind */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}
