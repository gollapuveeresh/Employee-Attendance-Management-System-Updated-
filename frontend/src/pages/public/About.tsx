import { PublicPage } from '../../components/public/Navbar'
import mdPhoto from '../../assets/saisirmd1.png'

interface AboutProps {
  onGetStarted: () => void
  setPage: (p: PublicPage) => void
}

export default function About({ onGetStarted, setPage }: AboutProps) {
  return (
    <div className="w-full">
      {/* SECTION 1 — ABOUT HERO + MD PROFILE */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Side: About + Leadership Message */}
            <div className="space-y-12">
              <div className="animate-fade-up">
                <span className="text-[#D4AF37] text-sm font-bold tracking-wider uppercase mb-3 block">OUR STORY</span>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  About <span className="text-[#D4AF37]">VPD Technologies</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  VPD Technologies is focused on building modern, secure and intuitive technology solutions that help organizations manage their people, processes and operations more efficiently.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Our goal is to simplify complex business workflows through practical digital solutions that improve efficiency, transparency and everyday operations.
                </p>
              </div>

              {/* Leadership Philosophy / Message */}
              <div className="animate-fade-up delay-100 mt-12 bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 lg:p-10 relative overflow-hidden shadow-2xl group hover:border-[#D4AF37]/30 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]" />
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-[#D4AF37]">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 opacity-60">Leadership Philosophy</h3>
                
                <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8 relative z-10">
                  "Technology should simplify people's work, solve real-world challenges, and create meaningful value for organizations and the people they serve."
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="text-[#D4AF37] font-bold text-lg">VUPPALA SAI KRISHNA</h4>
                    <p className="text-gray-400 text-sm">CEO & Founder, VPD Technologies Pvt Ltd</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: MD Portrait */}
            <div className="lg:pl-10 animate-fade-up delay-200">
              <div className="relative group rounded-3xl overflow-hidden bg-[#111111] border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-all duration-500 shadow-2xl p-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[3/4] w-full bg-[#1A1A1A]">
                  <img 
                    src={mdPhoto} 
                    alt="Vuppala Sai Krishna - CEO & Founder" 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle vignette/overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Profile Info Card over image (optional touch of elegance) */}
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl p-4">
                      <h4 className="text-white font-bold text-lg">VUPPALA SAI KRISHNA</h4>
                      <p className="text-[#D4AF37] text-sm font-medium">CEO & Founder</p>
                      <p className="text-gray-400 text-xs">VPD Technologies Pvt Ltd</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 2 — MISSION / VISION / APPROACH */}
      <section className="py-20 bg-[#0D0D0D] border-t border-[#1E1E1E]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Mission */}
            <div className="p-8 rounded-3xl bg-[#111111] border border-[#2A2A2A] hover:border-[#D4AF37]/40 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#D4AF37]">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                "To deliver practical, reliable and innovative technology solutions that simplify workforce operations and help organizations achieve greater efficiency."
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-3xl bg-[#111111] border border-[#2A2A2A] hover:border-[#D4AF37]/40 hover:-translate-y-2 transition-all duration-500 shadow-xl group delay-100">
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#D4AF37]">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                "To be a trusted technology partner for organizations by building solutions that empower people, improve processes and create long-term value."
              </p>
            </div>

            {/* Approach */}
            <div className="p-8 rounded-3xl bg-[#111111] border border-[#2A2A2A] hover:border-[#D4AF37]/40 hover:-translate-y-2 transition-all duration-500 shadow-xl group delay-200">
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#D4AF37]">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">Our Approach</h2>
              <p className="text-gray-400 leading-relaxed">
                "We focus on simplicity, security and real-world usability, ensuring our solutions are easy to adopt, scalable and aligned with evolving business needs."
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3 — CORE VALUES */}
      <section className="py-20 bg-[#0A0A0A] border-t border-[#1E1E1E]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 animate-fade-up">
            <span className="text-[#D4AF37] text-sm font-bold tracking-wider uppercase mb-3 block">WHAT DRIVES US</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#D4AF37]">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Innovation', 
                desc: 'Building solutions for real-world challenges.',
                icon: <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              },
              { 
                title: 'Integrity', 
                desc: 'Focused on transparency and trust.',
                icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              },
              { 
                title: 'People First', 
                desc: 'Creating technology that empowers people.',
                icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>
              },
              { 
                title: 'Continuous Improvement', 
                desc: 'Always evolving to deliver better solutions.',
                icon: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>
              }
            ].map((value, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#111111] border border-[#2A2A2A] hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border-2 border-[#2A2A2A] group-hover:border-[#D4AF37] flex items-center justify-center mb-6 transition-colors duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#D4AF37]">
                    {value.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — LEADERSHIP CLOSING */}
      <section className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#111111] border-t border-[#1E1E1E] text-center">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-8 animate-fade-up">
            Building Technology <span className="text-[#D4AF37]">With Purpose</span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-up delay-100">
            "At VPD Technologies, we believe technology is most valuable when it makes work simpler, decisions clearer and organizations more efficient."
          </p>
          <button
            onClick={() => setPage('solutions/explore')}
            className="px-8 py-4 rounded-xl bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-lg transition-all hover:bg-[#D4AF37] hover:text-[#0A0A0A] inline-flex items-center gap-3 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] animate-fade-up delay-200"
          >
            Explore Our Solutions
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>
    </div>
  )
}
