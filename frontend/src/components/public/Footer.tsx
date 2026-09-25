import { PublicPage } from './Navbar'

export default function Footer({ setPage }: { setPage: (p: PublicPage) => void }) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div 
              className="flex items-center gap-3 mb-4 cursor-pointer group transition-all duration-300"
              onClick={() => { setPage('home'); window.scrollTo(0,0) }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#A08820] transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] motion-reduce:transition-none motion-reduce:hover:transform-none">
                <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                  <path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8zM22 22h6v6H22z" fill="white" />
                  <circle cx="31" cy="31" r="3" fill="white" />
                </svg>
              </div>
              <div className="font-heading font-bold text-lg text-white transition-colors duration-300 group-hover:text-white">
                VPD <span className="text-[#D4AF37]">Technologies</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering organizations with a modern, secure, and efficient platform for attendance, leave, and workforce management.
            </p>
            
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/vpdtechnologies/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VPD Technologies LinkedIn"
                title="LinkedIn"
                className="text-gray-400 transition-all duration-300 hover:text-[#D4AF37] hover:scale-[1.1] hover:-translate-y-[2px] active:scale-95 active:translate-y-0 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] inline-block motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/vpdtechnologiespvtltd/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VPD Technologies Instagram"
                title="Instagram"
                className="text-gray-400 transition-all duration-300 hover:text-[#D4AF37] hover:scale-[1.1] hover:-translate-y-[2px] active:scale-95 active:translate-y-0 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] inline-block motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/p/VPD-Technologies-Private-Limited-61591199148003/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VPD Technologies Facebook"
                title="Facebook"
                className="text-gray-400 transition-all duration-300 hover:text-[#D4AF37] hover:scale-[1.1] hover:-translate-y-[2px] active:scale-95 active:translate-y-0 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] inline-block motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setPage('home'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  Home
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
              <li>
                <button onClick={() => { setPage('about'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  About Us
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
              <li>
                <button onClick={() => { setPage('features'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  Features
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
              <li>
                <button onClick={() => { setPage('solutions'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  Solutions
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product Features</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setPage('features/attendance-tracking'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  Attendance Tracking
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
              <li>
                <button onClick={() => { setPage('features/leave-management'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  Leave Management
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
              <li>
                <button onClick={() => { setPage('features/employee-directory'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  Employee Directory
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
              <li>
                <button onClick={() => { setPage('features/advanced-reporting'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  Advanced Reporting
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setPage('contact'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  Contact Us
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
              <li>
                <button onClick={() => { setPage('faq'); window.scrollTo(0,0) }} className="group relative inline-block text-gray-400 hover:text-[#D4AF37] text-sm transition-all duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-left">
                  FAQ
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full motion-reduce:transition-none"></span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E1E1E] pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} VPD Technologies. All rights reserved.
          </p>
          <div className="flex gap-4">
             {/* Decorative small links if needed, otherwise empty for now */}
          </div>
        </div>
      </div>
    </footer>
  )
}
