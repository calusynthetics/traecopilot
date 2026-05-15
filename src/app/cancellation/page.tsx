import type { Metadata } from "next";
import LegalHero from "@/components/LegalHero";
import Reveal from "@/components/Reveal";
import PageCtas from "@/components/PageCtas";

export const metadata: Metadata = {
  title: "Returns, Refunds & Cancellation Policies | Calu-Synthetics",
  description: "Returns, refunds, and cancellation terms for CAL-USYNTHETICS orders.",
};

export default function CancellationPage() {
  return (
    <div className="bg-metallic-50 min-h-screen">
      <LegalHero
        kicker="Order Policy"
        title="Returns, Refunds & Cancellation Policies"
        subtitle="This policy explains cancellation windows, return eligibility, and refund handling for CAL-USYNTHETICS orders."
        imageSrc="/images/legal/return.svg"
        imageAlt="Returns, refunds, and cancellation policy illustration"
        badges={[
          <span key="1">Fast order cancellation</span>,
          <span key="2">Strict return controls</span>,
          <span key="3">Refund inspection process</span>,
        ]}
      />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto space-y-10">
          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-xl">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Overview</h2>
            <p className="text-metallic-600 leading-relaxed">
              At CAL-USYNTHETICS, we aim to process and ship orders quickly and accurately for our global
              customers. Because research chemicals such as Caluanie Muelear Oxidize are highly regulated and handled
              with care, our cancellation, returns, and refund processes are designed to balance customer support with
              operational integrity.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Returns Policy</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              Returns are accepted only under strict conditions due to the sensitive and regulated nature of our
              products. Approved returns are subject to inspection, documentation, and compliance review.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-industrial-950 mb-3">Eligibility for Returns</h3>
                <ul className="text-metallic-600 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Damaged or defective product on arrival.</li>
                  <li>Wrong item shipped or incorrect quantity delivered.</li>
                  <li>Order confirmed lost in transit by the shipping carrier.</li>
                </ul>
                <p className="text-metallic-600 leading-relaxed mt-4">
                  We do not accept returns for change of mind, customer order errors, opened or used products,
                  improper storage after delivery, or delays caused by customs or courier services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-industrial-950 mb-3">Reporting Issues</h3>
                <p className="text-metallic-600 leading-relaxed mb-4">
                  Notify us promptly so we can assess the issue and proceed with an authorized return.
                </p>
                <ul className="text-metallic-600 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Report damaged, defective, or incorrect items within 48 hours of delivery.</li>
                  <li>Report lost shipments within 7 days of the expected delivery date.</li>
                </ul>
                <p className="text-metallic-600 leading-relaxed mt-4">
                  Provide your order number, clear photos or videos of the product and packaging, and a detailed
                  description of the issue. Send all claims to <span className="font-bold text-industrial-900">sales@calusynthetics.com</span>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-industrial-950 mb-3">Return Authorization Process</h3>
                <p className="text-metallic-600 leading-relaxed mb-4">
                  All returns require prior authorization. If your claim is accepted, you will receive a Return
                  Authorization (RA) number and instructions for returning the item.
                </p>
                <ul className="text-metallic-600 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Returns without an RA number will be refused.</li>
                  <li>Returned items must remain in original, sealed packaging unless damaged upon arrival.</li>
                  <li>Use a trackable shipping method for all returns.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-industrial-950 mb-3">Non-Returnable Items</h3>
                <ul className="text-metallic-600 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Opened or used chemical products.</li>
                  <li>Bulk or custom orders.</li>
                  <li>Discounted or clearance items.</li>
                  <li>Products marked as final sale.</li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Refunds Policy</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              Refunds are processed after we receive and inspect returned items. Approval depends on product condition,
              compliance with our return authorization process, and whether the issue falls under our return policy.
            </p>
            <div className="space-y-6">
              <div>
                <ul className="text-metallic-600 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Approved refunds are issued to the original payment method when possible.</li>
                  <li>Alternative refund methods may be arranged if necessary.</li>
                </ul>
                <p className="text-metallic-600 leading-relaxed mt-4">
                  Inspection and approval typically take 2–5 business days. Refund processing can take 5–10 business days
                  depending on your payment provider.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-industrial-950 mb-3">Replacement Policy</h3>
                <p className="text-metallic-600 leading-relaxed">
                  If an order arrives damaged or incorrect, you may choose between a replacement shipment or a refund.
                  Replacement is generally faster for urgent research needs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-industrial-950 mb-3">Shipping Costs</h3>
                <p className="text-metallic-600 leading-relaxed mb-4">
                  If the return is due to our error, we will cover approved return shipping costs. In rare approved
                  exceptions, customers may be responsible for return shipping fees.
                </p>
                <p className="text-metallic-600 leading-relaxed">
                  Original outbound shipping fees are non-refundable unless the return is caused by our mistake.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-industrial-950 mb-3">International Returns & Refunds</h3>
                <p className="text-metallic-600 leading-relaxed mb-4">
                  We ship worldwide, but customers are responsible for local import laws, customs duties, taxes, and
                  clearance fees.
                </p>
                <p className="text-metallic-600 leading-relaxed">
                  CAL-USYNTHETICS is not responsible for customs delays, inspections, seizures, confiscations, or
                  additional fees imposed by authorities. Refunds are not issued for shipments held or seized by customs.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Cancellation Policies</h2>
            <p className="text-metallic-600 leading-relaxed mb-4">
              Orders can be canceled only within a limited window after placement. To maintain order accuracy and
              compliance, cancellations are not accepted once an order begins processing, packaging, or shipment.
            </p>
            <ul className="text-metallic-600 space-y-2 list-disc list-inside leading-relaxed">
              <li>Orders may be canceled within 2 hours of placement if they have not entered processing or shipping.</li>
              <li>Once an order has entered processing, packaging, or shipment, cancellation is no longer available.</li>
              <li>Customers should carefully review all order details before completing checkout.</li>
            </ul>
            <div className="mt-6 rounded-3xl bg-metallic-50 p-6 border border-metallic-200">
              <h3 className="text-sm font-black uppercase tracking-widest text-industrial-900 mb-3">How to Request a Cancellation</h3>
              <p className="text-metallic-600 leading-relaxed">
                Contact us immediately with your order reference. The fastest way to request cancellation is via email at <span className="font-bold text-industrial-900">sales@calusynthetics.com</span>.
              </p>
            </div>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Policy Updates</h2>
            <p className="text-metallic-600 leading-relaxed">
              We may update these Returns, Refunds, and Cancellation Policies at any time. Changes take effect immediately upon posting on the website.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Contact Information</h2>
            <div className="text-metallic-600 space-y-3">
              <p>CAL-USYNTHETICS</p>
              <p>Bangkok, Thailand</p>
              <p>Asia Pacific Region</p>
              <p>Contact details available on request.</p>
              <p>Email: <span className="font-bold text-industrial-900">sales@calusynthetics.com</span></p>
              <p>Phone: <span className="font-bold text-industrial-900">+66 95 952 1908</span></p>
            </div>
          </Reveal>
        </div>
      </div>

      <PageCtas />
    </div>
  );
}
