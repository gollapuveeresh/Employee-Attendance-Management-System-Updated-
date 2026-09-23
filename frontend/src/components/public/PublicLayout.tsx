import { ReactNode } from 'react'
import Navbar, { PublicPage } from './Navbar'
import Footer from './Footer'

interface PublicLayoutProps {
  page: PublicPage
  setPage: (p: PublicPage) => void
  onLoginClick: () => void
  children: ReactNode
}

export default function PublicLayout({ page, setPage, onLoginClick, children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white selection:bg-[#D4AF37] selection:text-[#0A0A0A]">
      <Navbar page={page} setPage={setPage} onLoginClick={onLoginClick} />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {children}
      </main>

      <Footer setPage={setPage} />
    </div>
  )
}
