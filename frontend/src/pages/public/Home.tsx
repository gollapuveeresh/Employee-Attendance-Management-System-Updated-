import { PublicPage } from '../../components/public/Navbar'
import videoAsset from '../../assets/video.mp4'

interface HomeProps {
  onGetStarted: () => void
  setPage: (p: PublicPage) => void
}

export default function Home({ onGetStarted, setPage }: HomeProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-[90px] pb-20 lg:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
        
        {/* Full-width Video Visual */}
        <div className="w-full relative z-10 mb-16 lg:mb-24">
          <video
            src={videoAsset}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-auto aspect-video object-cover"
            style={{ maxWidth: 'none' }}
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-up">
              Employee Attendance Management, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#A08820]">Simplified.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100">
              Empower your organization with a modern, secure and efficient platform for attendance, leave, employee and workforce management.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-200">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-semibold text-base transition-all hover:bg-[#E8CB5A] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1"
              >
                Get Started
              </button>
              <button
                onClick={() => setPage('features')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#171717]/80 backdrop-blur-sm text-white font-medium text-base border border-[#2A2A2A] transition-all hover:border-[#D4AF37]/50 hover:bg-[#1E1E1E]"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-24 bg-[#0D0D0D] border-y border-[#1E1E1E]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            About VPD Technologies
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Technology built to simplify modern workforce operations.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            VPD Technologies develops specialized solutions focused on improving organizational efficiency, digital workflows, and secure data management. Our Attendance System is designed for enterprises that demand reliability and professional workforce management.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Platform Capabilities</h2>
            <p className="text-gray-400">Everything you need to manage your workforce effectively.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Attendance Management', desc: 'Track employee attendance efficiently with real-time logs and history.', icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></> },
              { title: 'Leave Management', desc: 'Simplify leave requests, hierarchical approvals, and balance tracking.', icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></> },
              { title: 'Employee Management', desc: 'Centralize employee information and structured workforce records.', icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></> },
              { title: 'Role-Based Access', desc: 'Provide appropriate secure access based on tailored user roles.', icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></> },
              { title: 'Reports & Analytics', desc: 'Provide meaningful workforce insights and comprehensive attendance reports.', icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> },
              { title: 'Real-Time Monitoring', desc: 'Give administrators complete visibility into current workforce activity.', icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></> }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-[#111111] border border-[#2A2A2A] transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-[#171717] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#333333] flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{feature.icon}</svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#0D0D0D] border-y border-[#1E1E1E]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400">Streamlined operational workflows.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-8 left-12 right-12 h-0.5 bg-gradient-to-r from-[#2A2A2A] via-[#D4AF37]/30 to-[#2A2A2A]" />
            
            {[
              { step: '01', title: 'Login', desc: 'Secure authentication for every user.' },
              { step: '02', title: 'Track Attendance', desc: 'Daily check-ins and automated records.' },
              { step: '03', title: 'Manage Leave', desc: 'Submit and approve time-off seamlessly.' },
              { step: '04', title: 'Analyze Reports', desc: 'Export insights and monitor productivity.' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center flex flex-col items-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#2A2A2A] flex items-center justify-center text-[#D4AF37] font-heading font-bold text-xl mb-6 shadow-lg transition-colors group-hover:border-[#D4AF37] group-hover:bg-[#1A1A1A]">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Built For Every Role</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { role: 'Administrator', desc: 'Manage employees, system settings, branches, and monitor complete operational activities.', icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></> },
              { role: 'HR / Management', desc: 'Monitor workforce activity, approve leave requests, and analyze departmental reports.', icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></> },
              { role: 'Employee', desc: 'View attendance, manage personal leave requests, and access individual workforce records.', icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></> }
            ].map((role, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#171717] border border-[#2A2A2A] transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.05)] text-center group">
                <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#333333] mx-auto flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{role.icon}</svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{role.role}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#111111] border-t border-[#1E1E1E] overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
              Built for the Way Your Team Works
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              From everyday workforce operations to organizational insights, VPD Technologies brings the essential tools together in one connected digital experience.
            </p>
          </div>

          <div className="relative mb-20">
            {/* Thin gold connecting line animating left to right */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] overflow-hidden -translate-y-1/2 hidden md:block">
              <div className="absolute top-0 left-0 w-full h-full bg-[#2A2A2A]" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" style={{ animation: 'shimmerLine 3s infinite linear' }} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                { 
                  id: '01', 
                  title: 'WORKFORCE', 
                  desc: 'Manage attendance, leave, employee records, and everyday workforce operations from one connected platform.' 
                },
                { 
                  id: '02', 
                  title: 'VISIBILITY', 
                  desc: 'Bring operational information together so teams can understand what is happening across their organization.' 
                },
                { 
                  id: '03', 
                  title: 'CONTROL', 
                  desc: 'Give the right people the right access while keeping organizational workflows structured and secure.' 
                }
              ].map((block, i) => (
                <div 
                  key={i} 
                  className="bg-[#111111] border border-[#2A2A2A] p-8 rounded-2xl hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-500 relative group animate-fade-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Small gold accent */}
                  <div className="w-8 h-1 bg-[#D4AF37]/30 rounded-full mb-6 group-hover:bg-[#D4AF37] transition-colors duration-500" />
                  
                  <div className="text-[#D4AF37] font-bold text-sm tracking-wider mb-4">
                    {block.id} &mdash; {block.title}
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {block.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center animate-fade-up delay-300">
            <button
              onClick={() => setPage('solutions/explore')}
              className="group inline-flex items-center text-[#D4AF37] font-semibold text-lg hover:text-white transition-colors"
            >
              Explore VPD Technologies
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <style>{`
          @keyframes shimmerLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </section>
    </div>
  )
}
