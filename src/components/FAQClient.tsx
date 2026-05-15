"use client";

import { useMemo, useState } from "react";

const faqSections = [
  {
    title: "Ordering",
    items: [
      {
        question: "How can I place an order with Calu-Synthetics?",
        answer:
          "Orders can be placed through the website by selecting products and adding them to the cart. For bulk or custom requests, contact our sales team directly.",
        tags: ["order", "bulk", "sales"],
      },
      {
        question: "Do you accept corporate purchase orders?",
        answer:
          "We sell to both companies and individuals, provided compliance requirements are met. All orders are reviewed to ensure regulatory alignment.",
        tags: ["purchase order", "payment", "business"],
      },
      {
        question: "Can I modify an order after submission?",
        answer:
          "Order modifications are limited and subject to processing status. Contact support immediately to request a change before shipment preparation begins.",
        tags: ["order", "change", "processing"],
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        question: "What shipping options are available?",
        answer:
          "We offer standard and expedited shipping worldwide. Delivery times vary by destination, and all shipments include trackable courier services.",
        tags: ["shipping", "delivery", "courier"],
      },
      {
        question: "Do you ship hazardous materials internationally?",
        answer:
          "Yes, shipments comply with international transport regulations and require correct documentation. Customers must provide any required import approvals.",
        tags: ["hazardous", "compliance", "export"],
      },
      {
        question: "How do you handle customs clearance?",
        answer:
          "Customers are responsible for local customs duties and documentation. We provide export paperwork, but local import requirements must be confirmed before order placement.",
        tags: ["customs", "import", "documentation"],
      },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "Returns are accepted within 30 days for unopened products that meet our authorization criteria. Approved returns require a return authorization number.",
        tags: ["returns", "refund", "authorization"],
      },
      {
        question: "How are refunds processed?",
        answer:
          "Refunds are issued to the original payment method once returned items are inspected and approved. Processing typically concludes within 5 to 10 business days.",
        tags: ["refund", "payment", "inspection"],
      },
      {
        question: "Can I return a product due to shipping damage?",
        answer:
          "Yes, damaged shipments may be returned after claim approval. Report damage immediately with photos and order verification.",
        tags: ["damage", "claims", "returns"],
      },
    ],
  },
  {
    title: "Product Information",
    items: [
      {
        question: "Where can I find CAS numbers and product specifications?",
        answer:
          "CAS numbers and specifications are listed on each product page. For additional technical data, contact our product specialists.",
        tags: ["CAS", "specifications", "data"],
      },
      {
        question: "Are your materials suitable for research use?",
        answer:
          "All Calu-Synthetics products are manufactured for laboratory research and industrial applications. They are not intended for human or animal consumption.",
        tags: ["research", "use", "applications"],
      },
      {
        question: "Do you provide sample quantities?",
        answer:
          "Sample quantities are available for selected items based on availability and regulatory requirements. Contact sales to confirm if your requested item qualifies.",
        tags: ["sample", "availability", "regulation"],
      },
    ],
  },
  {
    title: "Safety & Compliance",
    items: [
      {
        question: "Are your products compliant with international safety standards?",
        answer:
          "Yes. Calu-Synthetics operates under ISO-aligned quality systems and complies with applicable local and international regulations. Safety Data Sheets are available on request.",
        tags: ["ISO", "compliance", "SDS"],
      },
      {
        question: "How can I access product safety documentation?",
        answer:
          "Safety Data Sheets (SDS) are available from each product page or by contacting our compliance team. They provide hazard classifications and handling instructions.",
        tags: ["SDS", "documentation", "safety"],
      },
      {
        question: "What certifications support your manufacturing process?",
        answer:
          "Our facility follows industry best practices and is aligned with ISO quality principles. This ensures consistent product quality and regulatory readiness.",
        tags: ["certification", "ISO", "quality"],
      },
    ],
  },
  {
    title: "Technical Support",
    items: [
      {
        question: "Who do I contact for technical assistance?",
        answer:
          "Our technical support team is available by email and phone during business hours. For urgent inquiries, use the priority support form on our website.",
        tags: ["support", "technical", "contact"],
      },
      {
        question: "Can you help with material selection?",
        answer:
          "Yes. Our specialists can recommend products based on application, purity requirements, and compliance needs. Provide your process details for the best guidance.",
        tags: ["selection", "recommendation", "application"],
      },
      {
        question: "How are technical inquiries documented?",
        answer:
          "All technical inquiries are logged and routed to the appropriate team member. This ensures consistent follow-up and accountability.",
        tags: ["inquiry", "support", "tracking"],
      },
    ],
  },
];

const keywordTags = [
  "order",
  "shipping",
  "returns",
  "CAS",
  "SDS",
  "ISO",
  "support",
];

function normalize(text: string) {
  return text.toLowerCase();
}

export default function FAQClient() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredSections = useMemo(() => {
    const query = normalize(search);

    return faqSections
      .map((section) => {
        const filteredItems = section.items.filter((item) => {
          const matchesTag = activeTag
            ? item.tags.some((tag) => normalize(tag) === normalize(activeTag))
            : true;
          const matchesQuery = query
            ? normalize(item.question).includes(query) || normalize(item.answer).includes(query)
            : true;
          return matchesTag && matchesQuery;
        });

        return { ...section, items: filteredItems };
      })
      .filter((section) => section.items.length > 0);
  }, [search, activeTag]);

  return (
    <main className="bg-metallic-50 min-h-screen py-16 px-4 text-industrial-950">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 rounded-[2rem] border border-metallic-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-500 mb-4">Frequently Asked Questions</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Calu-Synthetics FAQ</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-metallic-600">
            Structured Q&A for industrial chemical sourcing, shipping, compliance, and technical support. Use the search bar or keyword filter to locate relevant answers quickly.
          </p>

          <div className="mt-8 space-y-6">
            <label htmlFor="faq-search" className="sr-only">
              Search frequently asked questions
            </label>
            <input
              id="faq-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search FAQs by keywords, CAS numbers, or product categories"
              className="w-full rounded-3xl border border-metallic-200 bg-metallic-50 px-5 py-4 text-base text-industrial-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            />

            <div className="flex flex-wrap gap-3">
              {keywordTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    activeTag === tag
                      ? "border-cyan-500 bg-cyan-500 text-white"
                      : "border-metallic-200 bg-white text-industrial-900 hover:border-cyan-400"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-10">
          {filteredSections.map((section) => (
            <article key={section.title} className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight text-industrial-950">{section.title}</h2>
              <div className="space-y-5">
                {section.items.map((item) => (
                  <div key={item.question} className="rounded-[2rem] border border-metallic-200 bg-white p-6 shadow-sm">
                    <div className="space-y-3">
                      <p className="text-base font-black leading-tight">Q: {item.question}</p>
                      <p className="text-sm leading-7 text-metallic-600">A: {item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}

          {filteredSections.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-metallic-200 bg-white p-10 text-center text-sm text-metallic-600">
              No matching entries were found. Adjust your search or select a different keyword filter.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
