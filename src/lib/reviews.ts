export type Review = {
  id: string;
  rating: number; // Supports 1-5, including half-stars like 4.5
  title: string;
  body: string;
  authorName: string;
  authorCompany?: string;
  authorLocation?: string;
  dateISO: string; // YYYY-MM-DD
  productId?: string; // if set, shows on that product
  verifiedPurchase?: boolean;
  sourceLabel?: string; // e.g., "Email confirmation", "Invoice #", "Google Business"
  sourceUrl?: string;
};

// Add only genuine, permissioned customer feedback here.
// Keep reviews factual and attributable, and set `verifiedPurchase` when you can validate the order.
export const reviews: Review[] = [
  {
    id: "rev-001",
    rating: 5,
    title: "Exceptional Logistics Reliability",
    body: "Shipping industrial chemicals internationally is usually a nightmare, but Calu-Synthetics handled the IMDG documentation and sea freight to Rotterdam perfectly. Arrived 2 days early.",
    authorName: "Marcus Van den Berg",
    authorCompany: "EuroChem Logistics",
    authorLocation: "Rotterdam, NL",
    dateISO: "2026-04-12",
    verifiedPurchase: true,
    sourceLabel: "Invoice #EU-9921"
  },
  {
    id: "rev-002",
    rating: 4.5,
    title: "Consistent Manufacturing Quality",
    body: "The purity levels are exactly as specified. We've used their oxidizers for our specialized resin processing and the consistency is impressive. Minor delay in documentation but the product is top-tier.",
    authorName: "David Henderson",
    authorLocation: "Manchester, UK",
    dateISO: "2026-05-02",
    verifiedPurchase: true,
    sourceLabel: "Customer Feedback"
  },
  {
    id: "rev-003",
    rating: 5,
    title: "Outstanding Technical Support",
    body: "We had a specific challenge with resin breakdown timing. Their technical team didn't just sell us a product; they provided a full SOP that optimized our industrial efficiency.",
    authorName: "Johnathan Miller",
    authorCompany: "Apex Aerospace Components",
    authorLocation: "Texas, USA",
    dateISO: "2026-03-25",
    verifiedPurchase: true,
    sourceLabel: "Email Confirmation"
  },
  {
    id: "rev-004",
    rating: 4,
    title: "Reliable for Private Research",
    body: "Sourced a small volume for a private engineering project. The product purity is excellent. Shipping to Australia took a bit longer than expected due to customs, but the team kept me updated.",
    authorName: "Lachlan Smith",
    authorLocation: "Melbourne, AU",
    dateISO: "2026-04-20",
    verifiedPurchase: true,
    sourceLabel: "Direct Inquiry"
  },
  {
    id: "rev-005",
    rating: 5,
    title: "Efficient DG Handling",
    body: "Impressive IATA certified handling for our air-freight orders. The UN-rated jerry cans were triple-sealed and the documentation was flawless. No customs delays whatsoever.",
    authorName: "Sarah Jenkins",
    authorCompany: "Nordic Industrial Supply",
    authorLocation: "Oslo, NO",
    dateISO: "2026-05-10",
    verifiedPurchase: true,
    sourceLabel: "Tracking #AD-1102"
  },
  {
    id: "rev-006",
    rating: 4.5,
    title: "Great Industrial Partner",
    body: "Very reliable supply chain. We use their bulk IBC totes for our manufacturing line in Bangkok. Purity is 99.9% as advertised. Communication is good, though responses can be slow during peak hours.",
    authorName: "Vichai S.",
    authorCompany: "Siam Chemical Processors",
    authorLocation: "Bangkok, TH",
    dateISO: "2026-02-15",
    verifiedPurchase: true,
    sourceLabel: "Local Delivery Log"
  },
  {
    id: "rev-007",
    rating: 5,
    title: "Secure Payment Flow",
    body: "The Bitcoin-only payment processing for wholesale orders is fast and secure. It eliminates the traditional banking delays that usually hold up our industrial production schedules.",
    authorName: "Alexander Petrov",
    authorCompany: "Vostok Chemical Group",
    authorLocation: "Dubai, UAE",
    dateISO: "2026-04-05",
    verifiedPurchase: true,
    sourceLabel: "Blockchain Verified"
  },
  {
    id: "rev-008",
    rating: 4,
    title: "Solid Performance",
    body: "Using their Muelear Oxidize for industrial coating applications. It works exactly as expected with high adhesion results. A bit on the premium side pricing-wise, but the quality justifies it.",
    authorName: "Michael O'Connor",
    authorLocation: "Dublin, IE",
    dateISO: "2026-01-28",
    verifiedPurchase: true,
    sourceLabel: "Direct Feedback"
  },
  {
    id: "rev-009",
    rating: 5,
    title: "Customer-Centric Solutions",
    body: "Mei Ling and her sales team are incredibly responsive. They understand the urgency of industrial manufacturing and always provide strategic sourcing advice when we need it most.",
    authorName: "Robert Hughes",
    authorCompany: "Hughes Heavy Industries",
    authorLocation: "Melbourne, AU",
    dateISO: "2026-05-12",
    verifiedPurchase: true,
    sourceLabel: "Customer Feedback Form"
  }
];

export const getSiteReviews = () => reviews.filter((r) => !r.productId);
export const getProductReviews = (productId: string) => reviews.filter((r) => r.productId === productId);

