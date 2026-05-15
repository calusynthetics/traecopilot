import type { Metadata } from "next";
import LegalHero from "@/components/LegalHero";
import Reveal from "@/components/Reveal";
import PageCtas from "@/components/PageCtas";

export const metadata: Metadata = {
  title: "Terms & Conditions | Calu-Synthetics",
  description: "Terms and conditions governing use of Calu-Synthetics website and order processes.",
};

export default function TermsPage() {
  return (
    <div className="bg-metallic-50 min-h-screen">
      <LegalHero
        kicker="Terms & Conditions"
        title="Terms & Conditions"
        subtitle="These terms govern your use of the website and the purchase of products offered by CAL-USYNTHETICS."
        imageSrc="/images/legal/terms.svg"
        imageAlt="Terms and conditions illustration"
        badges={[
          <span key="1">Responsible commerce</span>,
          <span key="2">Regulatory compliance</span>,
          <span key="3">Order acceptance terms</span>,
        ]}
      />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-xl">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Introduction</h2>
            <p className="text-metallic-600 leading-relaxed">
              Welcome to CAL-USYNTHETICS. These Terms & Conditions govern your access to our website and the
              purchase of products, including research chemicals such as Caluanie Muelear Oxidize. By using this
              website or placing an order, you agree to be bound by these terms.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Eligibility</h2>
            <ul className="text-metallic-600 space-y-2 leading-relaxed">
              <li>You confirm you are at least 18 years old.</li>
              <li>You are legally capable of entering into binding contracts.</li>
              <li>You will use our products strictly for legal and research purposes only.</li>
            </ul>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Products & Intended Use</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              All products sold by CAL-USYNTHETICS are intended strictly for laboratory research purposes and use
              by qualified professionals. Our products are not intended for human or animal consumption.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              Customers are responsible for proper handling, storage, and usage in compliance with applicable laws and
              safety standards.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Compliance with Laws</h2>
            <p className="text-metallic-600 leading-relaxed">
              Customers agree to comply with all local, national, and international laws regarding purchase, import,
              and use of our products. You must ensure that purchased products are legal in your jurisdiction.
              CAL-USYNTHETICS is not responsible for legal issues arising from non-compliance.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Orders & Acceptance</h2>
            <ul className="text-metallic-600 space-y-2 leading-relaxed">
              <li>All orders are subject to availability and acceptance.</li>
              <li>We reserve the right to refuse or cancel any order at our discretion.</li>
              <li>Orders are confirmed only after full payment is received.</li>
              <li>Once processed or shipped, orders cannot be modified or canceled except as set forth in our
                related policies.</li>
            </ul>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Pricing & Payments</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              All prices are listed in USD and may change without notice. Payment must be made in full before
              processing begins.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              Customers are responsible for any transaction fees, taxes, or currency conversion costs. Accepted
              payment methods are outlined in our Payment Policy.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Shipping & Delivery</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              We ship worldwide through trusted carriers. Delivery times are estimates and may vary due to customs,
              carrier handling, and external factors.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              Customers are responsible for customs duties, taxes, and import compliance. CAL-USYNTHETICS is not
              liable for delays, seizures, or losses caused by customs authorities.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Returns, Refunds & Cancellations</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              Returns, refunds, and cancellations are governed by separate policies. Please review our Refunds, Returns Policy &
              Cancellation Policy and Shipping Policy before placing an order.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Intellectual Property</h2>
            <p className="text-metallic-600 leading-relaxed">
              All website content, including text, images, logos, and graphics, is owned by CAL-USYNTHETICS and
              protected by copyright and intellectual property laws. Unauthorized use, reproduction, or distribution is
              prohibited.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Limitation of Liability</h2>
            <p className="text-metallic-600 leading-relaxed">
              CAL-USYNTHETICS is not liable for misuse of products, handling or storage errors, or any direct,
              indirect, incidental, or consequential damages. Products are used at the customer’s own risk.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Indemnification</h2>
            <p className="text-metallic-600 leading-relaxed">
              You agree to indemnify and hold harmless CAL-USYNTHETICS from any claims, damages, or liabilities
              arising from your use or misuse of our products, violation of these terms, or breach of applicable laws.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Privacy</h2>
            <p className="text-metallic-600 leading-relaxed">
              Your use of our website is also governed by our Privacy Policy, which explains how we collect and use
              personal information.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Third-Party Links</h2>
            <p className="text-metallic-600 leading-relaxed">
              Our site may contain links to third-party websites. We are not responsible for their content or privacy
              practices, nor for damages resulting from their use.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Account Responsibility</h2>
            <p className="text-metallic-600 leading-relaxed">
              If you create an account, you are responsible for maintaining the confidentiality of your credentials and
              all activity that occurs under your account.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Force Majeure</h2>
            <p className="text-metallic-600 leading-relaxed">
              We are not liable for failure or delay due to events beyond our control, including natural disasters,
              war or civil unrest, pandemics, government actions, or shipping and logistics disruptions.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Contact</h2>
            <p className="text-metallic-600 leading-relaxed">
              For questions about these terms, contact us at <span className="font-bold text-industrial-900">sales@calusynthetics.com</span> or <span className="font-bold text-industrial-900">+66 95 952 1908</span>.
            </p>
            <p className="text-xs text-metallic-500 mt-3">
              Note: This page is provided for general informational purposes and does not constitute legal advice.
            </p>
          </Reveal>
        </div>
      </div>

      <PageCtas />
    </div>
  );
}
