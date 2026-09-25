import { useEffect } from 'react'
import { PublicPage } from '../../components/public/Navbar'

interface SolutionDetailProps {
  id: string
  setPage: (p: PublicPage) => void
}

const solutionsData: Record<string, any> = {
  'workforce-management': {
    title: 'Workforce Management',
    desc: 'Technology that helps organizations manage attendance, leave, employee information, and workforce operations through a centralized digital experience.',
    whatWeSolve: 'Fragmented HR processes, manual attendance tracking, and lack of visibility into employee availability.',
    howItHelps: 'Centralizes workforce data, automates leave workflows, and provides real-time insights into attendance and operations.',
    capabilities: [
      'Attendance Tracking',
      'Leave Management',
      'Employee Records',
      'Role-Based Access',
      'Reports & Analytics',
      'Notifications'
    ],
    gradient: 'from-blue-600/20 to-cyan-600/5'
  },
  'business-automation': {
    title: 'Business Automation',
    desc: 'Reduce repetitive work through intelligent digital workflows and automation, freeing up your team for high-value tasks.',
    whatWeSolve: 'Time-consuming manual data entry, disconnected systems, and inefficient approval routing.',
    howItHelps: 'Streamlines repetitive tasks, ensures consistent process execution, and reduces human error in daily operations.',
    capabilities: [
      'Workflow Automation',
      'Document Processing',
      'Approval Routing',
      'System Integration',
      'Task Scheduling',
      'Process Analytics'
    ],
    gradient: 'from-purple-600/20 to-fuchsia-600/5'
  },
  'data-analytics': {
    title: 'Data & Analytics',
    desc: 'Turn operational data into clear insights for better visibility, reporting, and strategic decision-making.',
    whatWeSolve: 'Siloed data, complex reporting, and lack of actionable insights from existing operational metrics.',
    howItHelps: 'Unifies data sources, provides interactive visualizations, and enables fast, data-driven decision making.',
    capabilities: [
      'Interactive Dashboards',
      'Custom Reporting',
      'Data Visualization',
      'Predictive Analytics',
      'Data Integration',
      'Export & Sharing'
    ],
    gradient: 'from-emerald-600/20 to-teal-600/5'
  },
  'enterprise-software': {
    title: 'Enterprise Software',
    desc: 'Build scalable, secure, and robust software platforms tailored specifically to your organizational requirements.',
    whatWeSolve: 'Outdated legacy systems, inflexible off-the-shelf software, and scaling limitations.',
    howItHelps: 'Provides a custom-fit solution that scales with your growth, matches your exact workflows, and integrates seamlessly.',
    capabilities: [
      'Custom Architecture',
      'Cloud Deployment',
      'API Development',
      'Legacy Modernization',
      'High Scalability',
      'Enterprise Security'
    ],
    gradient: 'from-orange-600/20 to-amber-600/5'
  },
  'iot-smart-systems': {
    title: 'IoT & Smart Systems',
    desc: 'Connect physical devices, collect real-world data, and create smarter, more responsive operational environments.',
    whatWeSolve: 'Lack of real-time physical asset tracking, manual environmental monitoring, and delayed incident response.',
    howItHelps: 'Bridges the physical and digital divide, automating data collection from the field and enabling remote monitoring.',
    capabilities: [
      'Sensor Integration',
      'Real-time Monitoring',
      'Asset Tracking',
      'Automated Alerts',
      'Device Management',
      'Edge Computing'
    ],
    gradient: 'from-rose-600/20 to-pink-600/5'
  },
  'custom-technology': {
    title: 'Custom Technology Solutions',
    desc: 'Design and develop specialized technology solutions built meticulously around your unique business challenges.',
    whatWeSolve: 'Unique industry-specific problems that standard software cannot address efficiently.',
    howItHelps: 'Delivers a tailor-made technological advantage, perfectly aligned with your proprietary processes.',
    capabilities: [
      'Requirements Analysis',
      'Rapid Prototyping',
      'UX/UI Design',
      'Full-Stack Development',
      'Quality Assurance',
      'Ongoing Support'
    ],
    gradient: 'from-indigo-600/20 to-blue-600/5'
  }
}

export default function SolutionDetail({ id, setPage }: SolutionDetailProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const data = solutionsData[id]

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Solution Not Found</h2>
          <button onClick={() => setPage('solutions/explore' as PublicPage)} className="text-[#D4AF37] hover:underline">
            ← Back to Solutions
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#0A0A0A] min-h-screen pb-24">
      {/* HEADER SECTION */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden border-b border-[#1E1E1E]">
        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${data.gradient} opacity-20 pointer-events-none`} />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <button 
            onClick={() => setPage('solutions/explore' as PublicPage)}
            className="flex items-center text-gray-400 hover:text-[#D4AF37] transition-colors mb-12 group text-sm font-medium uppercase tracking-wider"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 transform group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Solutions
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="text-[#D4AF37] text-sm font-bold tracking-wider uppercase mb-4 block">SOLUTION CAPABILITY</span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {data.title}
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                {data.desc}
              </p>
              <button
                onClick={() => setPage('contact')}
                className="px-6 py-3 rounded-xl bg-white/5 border border-[#2A2A2A] text-white font-medium hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0A0A0A] transition-all"
              >
                Discuss this solution
              </button>
            </div>
            
            {/* Visual Area */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-[#2A2A2A] bg-[#111111] animate-fade-up delay-100 flex items-center justify-center">
              <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-30`} />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
              <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-md">
                <div className="absolute w-full h-full rounded-full border border-[#D4AF37]/30 animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-3/4 h-3/4 rounded-full border border-[#D4AF37]/20 animate-[spin_15s_linear_infinite_reverse]" />
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#D4AF37]">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div className="bg-[#111111] border border-[#2A2A2A] p-10 rounded-3xl hover:border-[#D4AF37]/30 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mr-3 text-sm">01</span>
                What We Solve
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {data.whatWeSolve}
              </p>
            </div>
            <div className="bg-[#111111] border border-[#2A2A2A] p-10 rounded-3xl hover:border-[#D4AF37]/30 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mr-3 text-sm">02</span>
                How It Helps
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {data.howItHelps}
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-white mb-10 text-center">Key Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.capabilities.map((cap: string, i: number) => (
                <div key={i} className="flex items-start p-6 rounded-2xl bg-[#111111]/50 border border-[#2A2A2A] hover:bg-[#111111] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#D4AF37]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-lg">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-5xl">
        <div className="bg-gradient-to-r from-[#111111] to-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] pointer-events-none" />
          <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Ready to transform with {data.title}?</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
            Let's discuss how we can implement this solution for your specific organizational requirements.
          </p>
          <button
            onClick={() => setPage('contact')}
            className="px-8 py-4 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-bold text-lg transition-all hover:bg-[#E8CB5A] hover:-translate-y-1 relative z-10 inline-flex items-center gap-3"
          >
            Talk to Our Team
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>
    </div>
  )
}
