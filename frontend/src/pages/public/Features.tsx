import { PublicPage } from '../../components/public/Navbar'
import AttendanceVisual from '../../components/public/AttendanceVisual'
import LeaveVisual from '../../components/public/LeaveVisual'
import EmployeeVisual from '../../components/public/EmployeeVisual'
interface FeaturesProps {
  onGetStarted: () => void
  setPage: (p: PublicPage) => void
}

export default function Features({ onGetStarted }: FeaturesProps) {
  const featureList = [
    {
      id: 'attendance',
      title: 'Attendance Management',
      desc: 'Real-time clock-in/clock-out tracking with location awareness. Ensure accurate work hours calculation and prevent buddy-punching through secure authentication.',
      icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>
    },
    {
      id: 'leave',
      title: 'Leave Management',
      desc: 'Automated leave requests, hierarchical approval workflows, and transparent balance tracking for all employees. Custom leave types supported.',
      icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>
    },
    {
      id: 'employee',
      title: 'Employee Management',
      desc: 'A centralized directory storing complete employee profiles, contact information, department mapping, and historical records.',
      icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>
    },
    {
      id: 'roles',
      title: 'Role-Based Access',
      desc: 'Granular permissions ensuring employees, HR managers, and Super Administrators only see the data and actions relevant to them.',
      icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      desc: 'Generate comprehensive insights on workforce productivity, absenteeism trends, and branch performance in real-time.',
      icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>
    },
    {
      id: 'notifications',
      title: 'Notifications',
      desc: 'Automated alerts for leave request approvals, attendance anomalies, and critical system announcements.',
      icon: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>
    },
    {
      id: 'admin',
      title: 'Admin Controls',
      desc: 'Full administrative control over company profiles, departments, branch locations, and system configuration.',
      icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>
    },
    {
      id: 'responsive',
      title: 'Responsive Access',
      desc: 'Perfectly optimized for desktop, tablet, and mobile devices, allowing your team to stay connected from anywhere.',
      icon: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium mb-6 animate-fade-up">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Powerful Capabilities
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-up delay-100">
            Everything you need. <br />
            <span className="text-[#D4AF37]">Nothing you don't.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-up delay-200">
            A comprehensive suite of tools designed specifically to handle the complexities of modern workforce management.
          </p>
        </div>
      </section>

      {/* Feature Grid with alternating layouts */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container mx-auto px-6 max-w-6xl space-y-32">
          {featureList.map((feature, idx) => {
            const isEven = idx % 2 === 0
            return (
              <div key={feature.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20 group`}>
                
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#171717] border border-[#2A2A2A] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all duration-500 shadow-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{feature.icon}</svg>
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-white">{feature.title}</h2>
                  <p className="text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
                </div>

                {/* Visual Representation */}
                <div className="flex-1 w-full relative">
                  {feature.id === 'attendance' ? (
                    <AttendanceVisual />
                  ) : feature.id === 'leave' ? (
                    <LeaveVisual />
                  ) : feature.id === 'employee' ? (
                    <EmployeeVisual />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[#D4AF37]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6 shadow-2xl overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
                        {/* Mock Window Controls */}
                        <div className="flex gap-2 mb-6">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                        </div>
                        {/* Abstract Content Lines */}
                        <div className="space-y-4">
                          <div className="w-3/4 h-6 rounded-md bg-[#1E1E1E]" />
                          <div className="w-1/2 h-4 rounded-md bg-[#1E1E1E]" />
                          
                          <div className="pt-4 grid grid-cols-2 gap-4">
                            <div className="h-20 rounded-lg bg-[#171717] border border-[#1E1E1E] p-3 flex flex-col justify-end">
                               <div className="w-2/3 h-2 rounded bg-[#333333]" />
                            </div>
                            <div className="h-20 rounded-lg bg-[#171717] border border-[#1E1E1E] p-3 flex flex-col justify-end">
                               <div className="w-1/2 h-2 rounded bg-[#D4AF37]/40" />
                            </div>
                          </div>

                          <div className="pt-4 space-y-2">
                            {[1,2,3].map(i => (
                              <div key={i} className="flex items-center gap-3 w-full p-2 rounded bg-[#171717]">
                                 <div className="w-6 h-6 rounded-full bg-[#2A2A2A] shrink-0" />
                                 <div className="w-full h-2 rounded bg-[#2A2A2A]" />
                                 <div className="w-12 h-2 rounded bg-[#333333]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

              </div>
            )
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-t from-[#0A0A0A] to-[#111111] border-t border-[#1E1E1E] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">Explore the full potential</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Stop juggling multiple tools. Bring your workforce management into a single, unified experience.
          </p>
          <button
            onClick={onGetStarted}
            className="px-10 py-4 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-bold text-lg transition-all hover:bg-[#E8CB5A] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Log in to Dashboard
          </button>
        </div>
      </section>
    </div>
  )
}
