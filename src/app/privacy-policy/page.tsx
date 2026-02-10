import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-gray-600">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information from you when you interact with our site in the following ways:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Subscribe to our newsletter</li>
          <li className="mb-2">Submit comments, reviews, or contact forms</li>
          <li className="mb-2">Make purchases through affiliate links</li>
        </ul>
        <p>
          This may include your name, email address, IP address, and browsing behavior through cookies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">To provide, improve, and personalize our content and user experience</li>
          <li className="mb-2">To respond to inquiries and provide customer support</li>
          <li className="mb-2">To send newsletters and promotional emails (only if you've opted in)</li>
          <li className="mb-2">To display relevant advertising via affiliate programs like Amazon Associates</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Cookies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to monitor site activity, analyze traffic via Google Analytics, and track affiliate link performance. 
        </p>
        <p>
          You can choose to disable cookies through your browser settings. Please note that some site functionality may be limited if cookies are disabled.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
        <p className="mb-4">
          We work with third-party services to better understand and improve our site:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2"><strong>Amazon Associates:</strong> Tracks affiliate link clicks and purchases for commission attribution</li>
          <li className="mb-2"><strong>Google Analytics:</strong> Tracks site visits, behavior, and geographic data to help improve content</li>
        </ul>
        <p>
          These services maintain their own privacy policies. We recommend reviewing them for detailed information about how your data is handled outside our site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
        <p>
          We retain your information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. You can request removal of your personal data by contacting us directly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Access the personal information we hold about you</li>
          <li className="mb-2">Request correction or deletion of your data</li>
          <li className="mb-2">Withdraw consent to marketing communications</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us via the details on our <Link href="/about" className="text-blue-600 hover:underline">About Us Page</Link>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">7. Policy Updates</h2>
        <p>
          This privacy policy may be updated periodically. The “Last Updated” date at the top reflects the most recent changes. We recommend reviewing this page from time to time to stay informed about how we handle your information.
        </p>
      </section>
    </div>
  )
}