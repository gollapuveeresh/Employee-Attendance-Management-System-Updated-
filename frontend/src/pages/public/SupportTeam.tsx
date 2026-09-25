import { PublicPage } from '../../components/public/Navbar'
import { useEffect } from 'react'

export default function SupportTeam({ setPage }: { setPage: (p: PublicPage) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-up">
            Here When Your Team <span className="text-[#D4AF37]">Needs Us</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-up delay-100">
            Our support team is here to help you understand the platform, resolve issues, and keep your workforce operations running smoothly.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#0D0D0D]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300 group hover:-translate-y-1 animate-fade-up">
              <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">Technical Support</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Help with platform access, system issues, and technical questions.
              </p>
            </div>
            
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300 group hover:-translate-y-1 animate-fade-up delay-100">
              <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">Account Support</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Assistance with account access, configuration, and organization settings.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300 group hover:-translate-y-1 animate-fade-up delay-200">
              <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">Workforce Support</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Guidance related to attendance, leave management, employee records, and workforce operations.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300 group hover:-translate-y-1 animate-fade-up delay-300">
              <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">General Assistance</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                For general questions about VPD Technologies and its solutions.
              </p>
            </div>
          </div>

          <div className="text-center animate-fade-up delay-400">
            <button 
              onClick={() => setPage('contact')}
              className="px-10 py-4 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-bold text-lg transition-all hover:bg-[#E8CB5A] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
