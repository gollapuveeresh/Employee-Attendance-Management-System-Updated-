import { PublicPage } from '../../components/public/Navbar'

interface SolutionsProps {
  onGetStarted: () => void
  setPage: (p: PublicPage) => void
}

export default function Solutions({ onGetStarted }: SolutionsProps) {
  const solutions = [
    {
      id: 'admin',
      role: 'For Administrators',
      headline: 'Centralized Control & System Integrity',
      desc: 'Super Administrators require a bird\'s-eye view of the entire organization along with granular controls to manage branches, departments, and user roles securely.',
      features: ['Branch & Department Management', 'Role-Based Access Control', 'System Configuration', 'Global Workforce Visibility'],
      icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>
    },
    {
      id: 'hr',
      role: 'For HR Teams',
      headline: 'Streamlined Workforce Workflows',
      desc: 'Human Resources teams need to automate manual tracking, process leave requests efficiently, and maintain an organized, accessible employee directory.',
      features: ['Automated Leave Approvals', 'Employee Directory Maintenance', 'Attendance Dispute Resolution', 'Compliance Reporting'],
      icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>
    },
    {
      id: 'management',
      role: 'For Management',
      headline: 'Data-Driven Decision Making',
      desc: 'Managers and Executives need actionable insights, productivity trends, and attendance reports to make informed decisions about workforce allocation.',
      features: ['Advanced Analytics Dashboard', 'Departmental Attendance Trends', 'Customizable Reports', 'Real-Time Insights'],
      icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>
    },
    {
      id: 'employee',
      role: 'For Employees',
      headline: 'Transparency & Self-Service',
      desc: 'Employees want a simple, frictionless way to log their attendance, check their leave balances, and request time off without navigating complex corporate red tape.',
      features: ['One-Click Check-In', 'Personal Attendance History', 'Leave Balance Dashboard', 'Direct Leave Requests'],
      icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-up">
            Tailored Solutions for <span className="text-[#D4AF37]">Every Role</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-up delay-100">
            A unified platform that adapts to the specific needs of administrators, HR professionals, managers, and employees.
          </p>
        </div>
      </section>

      {/* Solutions Cards */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((sol, idx) => (
              <div key={sol.id} className="p-8 md:p-10 rounded-3xl bg-[#111111] border border-[#2A2A2A] hover:border-[#D4AF37]/40 hover:bg-[#151515] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-[#333333] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{sol.icon}</svg>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-white">{sol.role}</h2>
                </div>
                
                <h3 className="text-xl text-white font-semibold mb-4">{sol.headline}</h3>
                <p className="text-gray-400 leading-relaxed mb-8">{sol.desc}</p>
                
                <div className="space-y-3">
                  {sol.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[#1E1E1E] text-center bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">Empower your entire organization</h2>
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
