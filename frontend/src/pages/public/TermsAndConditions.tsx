import { useEffect } from 'react'
import { PublicPage } from '../../components/public/Navbar'

export default function TermsAndConditions({ setPage }: { setPage: (p: PublicPage) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-up">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-lg animate-fade-up delay-100">
            Please read these terms carefully before using our platform.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-invert prose-lg max-w-none text-gray-400">
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 md:p-12 animate-fade-up delay-200">
              <p className="mb-8 text-sm text-[#D4AF37]">
                Note: These terms should be reviewed and finalized by the company's authorized legal representative before official publication.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. Introduction</h2>
              <p className="mb-6">
                Welcome to VPD Technologies. These Terms & Conditions govern your access to and use of our workforce management platform. By accessing our platform, you agree to be bound by these terms.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. Use of the Platform</h2>
              <p className="mb-6">
                Our platform provides tools for attendance tracking, leave management, and employee directories. You agree to use these services only for lawful purposes and in accordance with these terms.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. User Accounts</h2>
              <p className="mb-6">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Acceptable Use</h2>
              <p className="mb-6">
                Users shall not misuse the platform, attempt to gain unauthorized access, interfere with the platform's security features, or use the service to transmit malicious code.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Organization Responsibilities</h2>
              <p className="mb-6">
                Organizations using our platform are responsible for ensuring that their employees' data is handled in compliance with applicable local laws and regulations.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">6. Intellectual Property</h2>
              <p className="mb-6">
                All intellectual property rights in the platform, including design, software, and content, are owned by VPD Technologies. Users are granted a limited, non-exclusive license to use the platform as intended.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">7. Service Availability</h2>
              <p className="mb-6">
                We strive to ensure high availability of our platform. However, we do not guarantee uninterrupted access and reserve the right to perform scheduled maintenance as needed.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">8. Limitation of Liability</h2>
              <p className="mb-6">
                To the maximum extent permitted by law, VPD Technologies shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the platform.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">9. Changes to the Terms</h2>
              <p className="mb-6">
                We may modify these Terms & Conditions from time to time. We will provide notice of significant changes, and continued use of the platform constitutes acceptance of the modified terms.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">10. Contact Information</h2>
              <p className="mb-6">
                If you have questions regarding these terms, please contact us via our <button onClick={() => setPage('contact')} className="text-[#D4AF37] hover:underline">Contact page</button>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
