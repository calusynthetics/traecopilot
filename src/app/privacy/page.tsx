import type { Metadata } from "next";
import LegalHero from "@/components/LegalHero";
import Reveal from "@/components/Reveal";
import PageCtas from "@/components/PageCtas";

export const metadata: Metadata = {
  title: "Privacy Policy | Calu-Synthetics",
  description: "How Calu-Synthetics collects, uses, and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-metallic-50 min-h-screen">
      <LegalHero
        kicker="Privacy & Data Protection"
        title="Privacy Policy"
        subtitle="This policy explains how CAL-USYNTHETICS collects, uses, and safeguards information when you visit our website or request a quote."
        imageSrc="/images/legal/privacy.svg"
        imageAlt="Privacy policy illustration"
        badges={[
          <span key="1">User-focused transparency</span>,
          <span key="2">Compliance with GDPR & CCPA</span>,
          <span key="3">Secure data handling</span>,
        ]}
      />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-xl">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Introduction</h2>
            <p className="text-metallic-600 leading-relaxed">
              At CAL-USYNTHETICS, we value your privacy and are committed to protecting the personal information
              you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you use our website or place an order for research chemicals such as Caluanie Muelear
              Oxidize.
            </p>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="metallic-card bg-white rounded-3xl p-8 border border-metallic-200 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-industrial-900 mb-3">Personal Information</h3>
              <ul className="text-sm text-metallic-600 space-y-2 leading-relaxed">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing and shipping address</li>
                <li>Payment details processed securely by third parties</li>
              </ul>
            </div>
            <div className="metallic-card bg-white rounded-3xl p-8 border border-metallic-200 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-industrial-900 mb-3">Non-Personal Information</h3>
              <ul className="text-sm text-metallic-600 space-y-2 leading-relaxed">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and browsing behavior</li>
                <li>Referral URLs</li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">How We Use Your Information</h2>
            <ul className="text-metallic-600 space-y-2 leading-relaxed">
              <li>To process and fulfill orders.</li>
              <li>To communicate about your orders, inquiries, and account activity.</li>
              <li>To improve our website, products, and services.</li>
              <li>To prevent fraud and enhance security.</li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Cookies & Tracking Technologies</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              Our website uses cookies and similar technologies to enhance user experience, remember preferences,
              understand website usage, and improve site performance.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              You may disable cookies through your browser settings, but this may affect website functionality and
              your ability to use certain features.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Sharing of Information</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              We do not sell or rent your personal information. We may share data with third parties only as needed
              to operate our business and serve customers.
            </p>
            <ul className="text-metallic-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Payment processors for secure transactions.</li>
              <li>Shipping and logistics partners to deliver orders.</li>
              <li>Legal authorities if required by law or to protect our rights.</li>
            </ul>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Data Security</h2>
            <p className="text-metallic-600 leading-relaxed">
              We implement industry-standard security measures to protect your data, including SSL encryption,
              secure payment gateways, and restricted access controls. While we strive for strong protection, no method
              of internet transmission is completely secure.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Data Retention</h2>
            <p className="text-metallic-600 leading-relaxed mb-3">
              We retain personal information only as long as necessary to fulfill the purposes described in this
              policy, comply with legal obligations, resolve disputes, and enforce agreements.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Your Rights & Choices</h2>
            <p className="text-metallic-600 leading-relaxed mb-3">
              Depending on your location, you may have rights to access, correct, or delete your data and to opt out of
              marketing communications.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              To exercise these rights, please contact us using the details below.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">International Data Transfers</h2>
            <p className="text-metallic-600 leading-relaxed">
              As we operate globally, your information may be transferred and processed outside your country. By using
              our services, you consent to such transfers under this Privacy Policy.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Third-Party Links</h2>
            <p className="text-metallic-600 leading-relaxed">
              Our website may include links to third-party sites. We are not responsible for their content or privacy
              practices, and we recommend reviewing their policies before using those sites.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Children’s Privacy</h2>
            <p className="text-metallic-600 leading-relaxed">
              This website is not intended for individuals under the age of 18. We do not knowingly collect personal
              information from minors.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Compliance with Laws</h2>
            <p className="text-metallic-600 leading-relaxed">
              We comply with applicable data protection laws, including GDPR for EU customers and CCPA where applicable.
              We respect the rights of individuals under these regulations.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-metallic-600 leading-relaxed mb-3">
              We may update this Privacy Policy at any time. Changes become effective when posted on this page.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              We encourage you to review this page periodically for the latest information.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Contact Information</h2>
            <p className="text-metallic-600 leading-relaxed">
              For questions or concerns about this Privacy Policy, contact:
            </p>
            <div className="mt-4 space-y-2 text-sm text-metallic-600">
              <p>CAL-USYNTHETICS</p>
              <p>Bangkok, Thailand</p>
              <p>Asia Pacific Region</p>
              <p>Contact details and company registration information are available on request.</p>
              <p>Email: <span className="font-bold text-industrial-900">sales@calusynthetics.com</span></p>
              <p>Phone: <span className="font-bold text-industrial-900">+66 95 952 1908</span></p>
            </div>
            <p className="text-xs text-metallic-500 mt-4">
              By using our website, you agree to the terms outlined in this Privacy Policy.
            </p>
          </Reveal>
        </div>
      </div>

      <PageCtas />
    </div>
  );
}
