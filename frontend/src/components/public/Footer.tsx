import { PublicPage } from './Navbar'

export default function Footer({ setPage }: { setPage: (p: PublicPage) => void }) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#A08820]">
                <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                  <path d="M8 8h10v10H8zM22 8h10v10H22zM8 22h10v10H8zM22 22h6v6H22z" fill="white" />
                  <circle cx="31" cy="31" r="3" fill="white" />
                </svg>
              </div>
              <div className="font-heading font-bold text-lg text-white">
                VPD <span className="text-[#D4AF37]">Technologies</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering organizations with a modern, secure, and efficient platform for attendance, leave, and workforce management.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setPage('home'); window.scrollTo(0,0) }} className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => { setPage('about'); window.scrollTo(0,0) }} className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => { setPage('features'); window.scrollTo(0,0) }} className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Features</button>
              </li>
              <li>
                <button onClick={() => { setPage('solutions'); window.scrollTo(0,0) }} className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Solutions</button>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product Features</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Attendance Tracking</li>
              <li className="text-gray-400 text-sm">Leave Management</li>
              <li className="text-gray-400 text-sm">Employee Directory</li>
              <li className="text-gray-400 text-sm">Advanced Reporting</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setPage('contact'); window.scrollTo(0,0) }} className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Contact Us</button>
              </li>
              <li>
                <button onClick={() => { setPage('faq'); window.scrollTo(0,0) }} className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">FAQ</button>
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
