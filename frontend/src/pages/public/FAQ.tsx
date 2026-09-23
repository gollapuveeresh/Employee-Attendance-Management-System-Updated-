import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: 'What is the Employee Attendance Management System?',
      a: 'It is a comprehensive, centralized platform developed by VPD Technologies designed to streamline workforce tracking, automate leave management, and provide secure, role-based visibility across an organization.'
    },
    {
      q: 'Who can use the system?',
      a: 'The system supports multiple roles including Super Administrators, HR Managers, and Standard Employees. Each role has specialized access and features tailored to their operational needs.'
    },
    {
      q: 'How does attendance tracking work?',
      a: 'Employees can log their attendance through a simple interface. The system captures the timestamp and accurately calculates total hours worked, automatically flagging anomalies like late check-ins.'
    },
    {
      q: 'How does leave management work?',
      a: 'Employees submit leave requests through the platform, selecting custom leave types. HR Managers or Administrators are notified immediately and can approve or reject the request directly from their dashboard. Balances are updated automatically.'
    },
    {
      q: 'Can administrators manage employees?',
      a: 'Yes, Administrators and HR personnel have access to a full Employee Directory where they can add new staff, assign departments, define roles, and manage contact records.'
    },
    {
      q: 'Are reports available?',
      a: 'Absolutely. The platform includes a robust reporting engine that provides insights into attendance trends, leave utilization, and departmental productivity, which can be reviewed by HR and Management.'
    },
    {
      q: 'How does authentication work?',
      a: 'We utilize secure token-based authentication. Users are provided unique credentials, and session state is securely managed. Support for password recovery via OTP is also built-in.'
    },
    {
      q: 'Is the system responsive?',
      a: 'Yes, the entire platform is fully responsive and optimized for desktop computers, tablets, and mobile devices, ensuring accessibility from anywhere.'
    },
    {
      q: 'How can I contact support?',
      a: 'You can reach our support team through the Contact Us page via the dedicated contact form, email, or our support phone line.'
    }
  ]

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A]">
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-up">
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed animate-fade-up delay-100">
            Find answers to common questions about our platform, features, and capabilities.
          </p>
        </div>
      </section>

      <section className="pb-32 bg-[#0D0D0D]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div 
                  key={idx} 
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-[#D4AF37]/50 bg-[#151515]' : 'border-[#2A2A2A] bg-[#111111] hover:border-[#333333]'
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    onClick={() => toggleAccordion(idx)}
                  >
                    <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-white'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#D4AF37]/20 text-[#D4AF37] rotate-180' : 'bg-[#1A1A1A] text-gray-400'}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </button>
                  <div 
                    className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                    }`}
                  >
                    <p className="text-gray-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
