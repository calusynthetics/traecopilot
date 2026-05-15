import type { Metadata } from "next";
import LegalHero from "@/components/LegalHero";
import Reveal from "@/components/Reveal";
import PageCtas from "@/components/PageCtas";

export const metadata: Metadata = {
  title: "ISO Certification | Calu-Synthetics",
  description: "Quality management and ISO-aligned manufacturing practices at Calu-Synthetics.",
};

export default function IsoPage() {
  return (
    <div className="bg-metallic-50 min-h-screen">
      <LegalHero
        kicker="Quality Management"
        title="ISO Certification"
        subtitle="We maintain an ISO-aligned quality program designed to support consistent manufacturing, documentation, and continuous improvement across our operations."
        imageSrc="/images/legal/iso.svg"
        imageAlt="ISO certification illustration"
        badges={[
          <span key="1">Document control</span>,
          <span key="2">Traceability</span>,
          <span key="3">Continuous improvement</span>,
        ]}
      />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-xl">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Quality Commitment</h2>
            <p className="text-metallic-600 leading-relaxed">
              Our quality management approach focuses on repeatability, process control, and customer requirements.
              We use structured procedures for training, production, inspection, and corrective actions.
            </p>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="metallic-card bg-white rounded-3xl p-8 border border-metallic-200 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-industrial-900 mb-3">Core Controls</h3>
              <ul className="text-sm text-metallic-600 space-y-2 leading-relaxed">
                <li>Batch documentation and release checks.</li>
                <li>Supplier qualification and incoming review.</li>
                <li>Change control for processes and specs.</li>
              </ul>
            </div>
            <div className="metallic-card bg-white rounded-3xl p-8 border border-metallic-200 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-industrial-900 mb-3">Continuous Improvement</h3>
              <ul className="text-sm text-metallic-600 space-y-2 leading-relaxed">
                <li>Internal audits and management reviews.</li>
                <li>CAPA workflows for nonconformities.</li>
                <li>Customer feedback and corrective actions.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Certificates & Documentation</h2>
            <p className="text-metallic-600 leading-relaxed">
              Certificates, technical sheets, and supporting documentation are provided upon request where applicable.
              For verification, please contact our quality team.
            </p>
          </Reveal>

          <Reveal className="metallic-card bg-white rounded-3xl p-10 border border-metallic-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-industrial-950 mb-4">Contact</h2>
            <p className="text-metallic-600 leading-relaxed">
              Quality documentation requests: <span className="font-bold text-industrial-900">sales@calusynthetics.com</span>.
            </p>
            <p className="text-xs text-metallic-500 mt-3">
              Note: ISO references on this page describe our quality program and do not constitute a legal representation of certification status.
            </p>
          </Reveal>
        </div>
      </div>

      <PageCtas />
    </div>
  );
}
