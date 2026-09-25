import { PublicPage } from '../../components/public/Navbar'
import LeaveVisual from '../../components/public/LeaveVisual'

interface Props {
  setPage: (p: PublicPage) => void
}

export default function FeatureLeave({ setPage }: Props) {
  return (
    <div className="w-full bg-[#0A0A0A] text-white min-h-screen">
      <section className="pt-32 pb-16 lg:pt-48 lg:pb-24 px-6 container mx-auto max-w-7xl">
        <button 
          onClick={() => { setPage('features'); window.scrollTo(0,0) }}
          className="group flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] mb-8 transition-colors text-sm font-medium"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Features
        </button>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-8 animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Leave <span className="text-[#D4AF37]">Management</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              Simplify leave requests and approval workflows. Give HR visibility into leave balances, leave types, and complete employee leave history.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                'Leave requests',
                'Approval workflows',
                'Leave balances',
                'Leave types',
                'Approval status',
                'Employee leave history',
                'HR visibility'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full animate-fade-up delay-100">
            <LeaveVisual />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-t from-[#111111] to-[#0A0A0A] border-t border-[#1E1E1E] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">Simplify time-off requests today</h2>
          <button
            onClick={() => { setPage('contact'); window.scrollTo(0,0) }}
            className="px-10 py-4 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-bold text-lg transition-all hover:bg-[#E8CB5A] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Contact Sales
          </button>
        </div>
      </section>
    </div>
  )
}
