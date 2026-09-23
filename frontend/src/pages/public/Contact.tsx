import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.message) newErrors.message = 'Message is required'

    if (formData.phone) {
      const national = formData.phone.substring(3)
      if (national.length !== 10) {
        newErrors.phone = 'Phone number must be exactly 10 digits'
      } else if (!/^[6-9]\d{9}$/.test(national)) {
        newErrors.phone = 'Invalid Indian mobile number'
      }
    }

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }, 1500)
  }

  const formatPhoneForDisplay = (phone: string) => {
    if (!phone) return ''
    const national = phone.substring(3)
    if (national.length <= 5) return `+91 ${national}`
    return `+91 ${national.slice(0,5)} ${national.slice(5)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === '+91 ' || val === '+91' || val === '+9' || val === '+') {
      setFormData(prev => ({ ...prev, phone: '' }))
      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
      return
    }

    const cleaned = val.replace(/[^\d+]/g, '')
    let national = cleaned
    if (cleaned.startsWith('+91')) {
      national = cleaned.substring(3)
    } else if (cleaned.startsWith('+')) {
      national = cleaned.replace(/\+/g, '')
    }
    national = national.substring(0, 10)
    
    const toStore = national.length > 0 ? `+91${national}` : ''
    
    setFormData(prev => ({ ...prev, phone: toStore }))
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-up">
            Get in <span className="text-[#D4AF37]">Touch</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100">
            Have questions about our platform? Need a custom enterprise plan? Reach out to our team.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Our dedicated support and sales teams are ready to assist you. Connect with us using the information below.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { 
                    icon: <><rect x="3" y="5" width="18" height="14" rx="2" ry="2"/><polyline points="3 7 12 13 21 7"/></>, 
                    title: 'Email', 
                    detail: 'hrvpd@vpdtechnologiespvtltd.com',
                    href: 'mailto:hrvpd@vpdtechnologiespvtltd.com'
                  },
                  { 
                    icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>, 
                    title: 'Phone', 
                    detail: '+91 99499 46022',
                    href: 'tel:+919949946022'
                  },
                  { 
                    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>, 
                    title: 'Office', 
                    detail: 'VPD Technologies Pvt Ltd\n3rd Floor, Above State Bank of India (SBI),\nBalaji Nagar, Nandyal Checkpost,\nKurnool, Andhra Pradesh 518006,\nIndia.'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#2A2A2A] flex items-center justify-center text-[#D4AF37] shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{item.icon}</svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-gray-400 text-sm whitespace-pre-line hover:text-[#D4AF37] transition-colors">
                          {item.detail}
                        </a>
                      ) : (
                        <p className="text-gray-400 text-sm whitespace-pre-line">{item.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Our Location Map */}
              <div className="animate-fade-up group">
                <h4 className="font-heading text-xl font-bold text-white mb-6">Our Location</h4>
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden group-hover:border-[#D4AF37]/50 transition-all duration-300 shadow-lg relative">
                  <div className="h-[250px] lg:h-[300px] w-full bg-[#1A1A1A] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    <div className="w-16 h-16 rounded-full bg-[#111111] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-4 relative z-10 group-hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    
                    <h3 className="text-white font-medium text-lg mb-2 relative z-10">VPD Technologies</h3>
                    <p className="text-gray-400 text-sm mb-6 relative z-10 max-w-[250px]">
                      Kurnool, Andhra Pradesh 518006, India
                    </p>
                    
                    <a 
                      href="https://maps.app.goo.gl/cWHVsxeBRjufGEtR6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative z-10 px-6 py-2.5 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-xl hover:bg-[#E8CB5A] transition-colors flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    >
                      View on Google Maps
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-[50px] rounded-full pointer-events-none" />
                
                <h3 className="font-heading text-2xl font-bold text-white mb-8 relative z-10">Send us a message</h3>
                
                {status === 'success' ? (
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 p-6 rounded-xl flex flex-col items-center text-center relative z-10 animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-[#22C55E]/20 flex items-center justify-center text-[#22C55E] mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h4 className="text-white font-bold mb-2">Message Sent Successfully!</h4>
                    <p className="text-gray-400 text-sm">We will get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-[#1A1A1A] border ${errors.name ? 'border-[#ef4444]' : 'border-[#333333] focus:border-[#D4AF37]'} rounded-xl px-4 py-3 text-white outline-none transition-colors`}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-[#ef4444] text-xs">{errors.name}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-[#1A1A1A] border ${errors.email ? 'border-[#ef4444]' : 'border-[#333333] focus:border-[#D4AF37]'} rounded-xl px-4 py-3 text-white outline-none transition-colors`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-[#ef4444] text-xs">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone ? formatPhoneForDisplay(formData.phone) : ''}
                          onChange={handlePhoneChange}
                          className={`w-full bg-[#1A1A1A] border ${errors.phone ? 'border-[#ef4444]' : 'border-[#333333] focus:border-[#D4AF37]'} rounded-xl px-4 py-3 text-white outline-none transition-colors`}
                          placeholder="+91 98765 43210"
                          aria-label="Phone Number"
                        />
                        {errors.phone && <p className="text-[#ef4444] text-xs">{errors.phone}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full bg-[#1A1A1A] border ${errors.message ? 'border-[#ef4444]' : 'border-[#333333] focus:border-[#D4AF37]'} rounded-xl px-4 py-3 text-white outline-none transition-colors resize-none`}
                        placeholder="Type your message here..."
                      />
                      {errors.message && <p className="text-[#ef4444] text-xs">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-bold transition-all hover:bg-[#E8CB5A] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
