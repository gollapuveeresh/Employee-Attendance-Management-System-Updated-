import { useEffect } from 'react'
import { PublicPage } from '../../components/public/Navbar'

export default function CookiePolicy({ setPage }: { setPage: (p: PublicPage) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-up">
            Cookie Policy
          </h1>
          <p className="text-gray-400 text-lg animate-fade-up delay-100">
            Information about how we use cookies and similar technologies.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-invert prose-lg max-w-none text-gray-400">
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 md:p-12 animate-fade-up delay-200">
              <h2 className="text-2xl font-bold text-white mb-4 mt-0">1. What Cookies Are</h2>
              <p className="mb-6">
                Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. How Cookies May Be Used</h2>
              <p className="mb-6">
                We use cookies to understand how you interact with our platform, remember your preferences, and ensure the proper functioning of our services.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. Essential Cookies</h2>
              <p className="mb-6">
                These cookies are necessary for the platform to function securely and cannot be switched off in our systems. They are usually set in response to actions made by you, such as logging in or setting privacy preferences.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Analytics / Performance Cookies</h2>
              <p className="mb-6">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Cookie Preferences</h2>
              <p className="mb-6">
                Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect the functionality of our platform and degrade your user experience.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">6. Third-Party Services</h2>
              <p className="mb-6">
                We may use trusted third-party services that place their own cookies on your device to help us analyze platform usage and improve functionality.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">7. Changes to This Policy</h2>
              <p className="mb-6">
                We may update this Cookie Policy periodically to reflect changes in technology, regulation, or our business practices. Please review it regularly.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">8. Contact Information</h2>
              <p className="mb-6">
                If you have any questions about our use of cookies, please contact us via our <button onClick={() => setPage('contact')} className="text-[#D4AF37] hover:underline">Contact page</button>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
