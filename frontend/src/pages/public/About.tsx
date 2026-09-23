import { PublicPage } from '../../components/public/Navbar'

interface AboutProps {
  onGetStarted: () => void
  setPage: (p: PublicPage) => void
}

export default function About({ onGetStarted, setPage }: AboutProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-up">
            About <span className="text-[#D4AF37]">VPD Technologies</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-up delay-100">
            We build modern, secure, and intuitive workforce management solutions that help organizations operate more efficiently and transparently.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#0D0D0D] border-y border-[#1E1E1E]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="p-10 rounded-3xl bg-[#111111] border border-[#2A2A2A] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#D4AF37]" />
              <h2 className="font-heading text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                To simplify and automate complex HR and operational workflows through enterprise-grade technology, enabling businesses to focus on growth and employee success rather than administrative overhead.
              </p>
            </div>

            {/* Vision */}
            <div className="p-10 rounded-3xl bg-[#111111] border border-[#2A2A2A] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#A08820]" />
              <h2 className="font-heading text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                To be the trusted technological backbone for modern enterprises, setting the standard for secure, accessible, and comprehensive workforce management systems globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Approach */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-12">Our Technology Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Security First', desc: 'Robust role-based access control and secure data architecture.' },
              { title: 'Scalability', desc: 'Built to support growing organizations without performance degradation.' },
              { title: 'User Experience', desc: 'Clean, modern, and accessible interfaces that require zero training.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-8 rounded-2xl bg-[#111111] border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 border border-[#D4AF37]/20">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Developed This Platform */}
      <section className="py-24 bg-[#0D0D0D] border-t border-[#1E1E1E]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-[#171717] rounded-3xl p-10 md:p-16 border border-[#2A2A2A] relative overflow-hidden">
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-[80px]" />
             <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
               Why we built the platform
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed relative z-10 mb-8">
               We observed that many organizations struggle with fragmented systems—using spreadsheets for attendance, emails for leave requests, and disconnected tools for employee records. This fragmentation leads to errors, delays, and a lack of visibility.
               <br /><br />
               The <strong>VPD Employee Attendance Management System</strong> was built to unify these critical operations into a single, cohesive, and visually premium platform that both administrators and employees enjoy using.
             </p>
             <button
                onClick={() => setPage('solutions')}
                className="relative z-10 text-[#D4AF37] font-semibold hover:text-[#E8CB5A] inline-flex items-center gap-2 transition-colors"
             >
                Explore our solutions
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#111111] border-t border-[#1E1E1E] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">Experience the VPD standard</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Join the organizations that trust VPD Technologies for their workforce operations.
          </p>
          <button
            onClick={onGetStarted}
            className="px-10 py-4 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-bold text-lg transition-all hover:bg-[#E8CB5A] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  )
}
