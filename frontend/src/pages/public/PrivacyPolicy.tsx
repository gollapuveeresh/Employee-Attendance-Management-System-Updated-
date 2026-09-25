import { useEffect } from 'react'
import { PublicPage } from '../../components/public/Navbar'

export default function PrivacyPolicy({ setPage }: { setPage: (p: PublicPage) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-up">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg animate-fade-up delay-100">
            Learn how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-invert prose-lg max-w-none text-gray-400">
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 md:p-12 animate-fade-up delay-200">
              <p className="mb-8 text-sm text-[#D4AF37]">
                Note: This policy should be reviewed and finalized by the company's authorized legal representative before official publication.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. Information We Collect</h2>
              <p className="mb-6">
                We may collect personal information such as your name, email address, job title, and company details when you register for an account or interact with our services. We also collect usage data to improve platform performance.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. How Information Is Used</h2>
              <p className="mb-6">
                Your information is used to provide, maintain, and improve our workforce management solutions. This includes account authentication, processing leave requests, tracking attendance, and sending critical notifications.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. Data Security</h2>
              <p className="mb-6">
                We implement industry-standard security measures designed to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet-based service can guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Access and Permissions</h2>
              <p className="mb-6">
                Data access is restricted based on role-based permissions (e.g., employee, HR, admin) defined by your organization. You should only access the data authorized for your role.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Data Retention</h2>
              <p className="mb-6">
                We retain your information only for as long as necessary to fulfill the purposes outlined in this policy or to comply with legal obligations.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">6. Third-Party Services</h2>
              <p className="mb-6">
                We do not sell your personal information. We may share information with trusted third-party service providers solely to assist in operating our platform and providing our services to you.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">7. Cookies</h2>
              <p className="mb-6">
                Our platform uses cookies and similar technologies to enhance user experience, remember preferences, and analyze site traffic. For more details, please review our <button onClick={() => setPage('cookie-policy')} className="text-[#D4AF37] hover:underline">Cookie Policy</button>.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">8. User Rights</h2>
              <p className="mb-6">
                Depending on your jurisdiction, you may have rights to access, correct, or delete your personal information. Please contact us to exercise these rights.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">9. Contact Information</h2>
              <p className="mb-6">
                If you have questions or concerns about this Privacy Policy, please contact us via our <button onClick={() => setPage('contact')} className="text-[#D4AF37] hover:underline">Contact page</button>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
