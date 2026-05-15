import type { Metadata } from "next";
import LegalHero from "@/components/LegalHero";
import Reveal from "@/components/Reveal";
import PageCtas from "@/components/PageCtas";

export const metadata: Metadata = {
  title: "Shipping Policy | Calu-Synthetics",
  description: "Shipping timelines, documentation, and carrier responsibilities for Calu-Synthetics orders.",
};

export default function ShippingPage() {
  return (
    <div className="bg-metallic-50 min-h-screen">
      <LegalHero
        kicker="Logistics"
        title="Shipping Policy"
        subtitle="This page summarizes processing timelines, delivery expectations, and carrier responsibilities. Final terms may be confirmed in a written quote."
        imageSrc="/images/legal/shipping.svg"
        imageAlt="Shipping policy illustration"
        badges={[
          <span key="1">Tracked shipments</span>,
          <span key="2">Export documentation support</span>,
          <span key="3">Secure delivery</span>,
        ]}
      />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-xl">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Shipping Policy</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              At CAL-USYNTHETICS, we are committed to safe, discreet, and reliable delivery for research chemical shipments. This policy explains how orders are processed, shipped, and managed until delivery.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-metallic-50 p-6 border border-metallic-200">
                <p className="text-sm font-medium text-industrial-950 mb-2">Company</p>
                <p className="text-sm text-metallic-600">CAL-USYNTHETICS</p>
                <p className="text-sm text-metallic-600">Bangkok, Thailand</p>
                <p className="text-sm text-metallic-600">Asia Pacific Region</p>
                <p className="text-sm text-metallic-600">Contact details available on request.</p>
              </div>
              <div className="rounded-3xl bg-metallic-50 p-6 border border-metallic-200">
                <p className="text-sm font-medium text-industrial-950 mb-2">Contact</p>
                <p className="text-sm text-metallic-600">Phone: +66 95 952 1908</p>
                <p className="text-sm text-metallic-600">Email: sales@calusynthetics.com</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Order Processing</h2>
            <ul className="text-metallic-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>All orders are processed only after full payment and order information are confirmed.</li>
              <li>Typical processing takes 1–3 business days.</li>
              <li>Orders placed on weekends or public holidays will be processed on the next business day.</li>
              <li>Once processed, orders are prepared for shipment and dispatched promptly.</li>
            </ul>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Shipping Methods</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              We partner with trusted international couriers to provide secure and timely delivery. Carrier selection is based on destination, order size, and customs requirements.
            </p>
            <ul className="text-metallic-600 space-y-2 list-disc list-inside">
              <li>DHL Express</li>
              <li>FedEx</li>
              <li>UPS</li>
              <li>EMS and other regional carriers</li>
            </ul>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Estimated Delivery Times</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              Delivery timelines are estimates and can vary due to customs processing, local carrier handling, and regulatory checks.
            </p>
            <ul className="text-metallic-600 space-y-2 list-disc list-inside">
              <li>United States: 2–5 business days</li>
              <li>Canada & Europe: 3–7 business days</li>
              <li>Asia & Australia: 4–8 business days</li>
              <li>Rest of the World: 5–10 business days</li>
            </ul>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Shipping Costs & Customs</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              Shipping fees are calculated at checkout based on destination, weight, and the selected courier service. Customers are responsible for any customs duties, taxes, or import fees charged by local authorities.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              CAL-USYNTHETICS is not responsible for customs clearance delays, seizures, or additional charges imposed after shipment departure.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Packaging & Discretion</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              We use secure, discreet packaging to protect privacy and prevent damage during transit. All shipments are prepared to meet carrier and safety requirements.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              Packages are labelled in accordance with shipping regulations while maintaining discretion for customer privacy.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Lost, Delayed, or Damaged Shipments</h2>
            <p className="text-metallic-600 leading-relaxed mb-3">
              If a shipment is delayed, lost, or damaged, contact us immediately with your order details and any available photos or tracking information.
            </p>
            <ul className="text-metallic-600 space-y-2 list-disc list-inside">
              <li>Report delays within 7 days of the expected delivery date.</li>
              <li>Report damages within 48 hours of delivery.</li>
              <li>Provide photos of the outer packaging, inner contents, and labels when possible.</li>
            </ul>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Incorrect Shipping Information</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              Customers are responsible for providing accurate shipping details. Incorrect or incomplete addresses may cause delays, failed delivery, or additional charges.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              CAL-USYNTHETICS is not liable for losses due to customer-provided shipping errors, and reshipment fees may apply.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Restricted Locations & Liability</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              We reserve the right to refuse shipment to countries or regions where legal restrictions apply. Customers should verify local import rules before placing an order.
            </p>
            <p className="text-metallic-600 leading-relaxed">
              CAL-USYNTHETICS is not liable for delays caused by customs, carrier issues, or local regulations. Our responsibility ends once the shipment is accepted by the selected carrier.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Policy Updates</h2>
            <p className="text-metallic-600 leading-relaxed">
              We may update this Shipping Policy at any time. Customers should review this page regularly for the latest terms.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Need Assistance?</h2>
            <p className="text-metallic-600 leading-relaxed">
              For shipping-related questions, contact our logistics team at <span className="font-bold text-industrial-900">+66 95 952 1908</span> or <span className="font-bold text-industrial-900">sales@calusynthetics.com</span>.
            </p>
          </Reveal>
        </div>
      </div>

      <PageCtas />
    </div>
  );
}
