import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/mock-data";
import PageCtas from "@/components/PageCtas";

export const metadata: Metadata = {
  title: "Categories | Calu-Synthetics",
  description: "Browse product categories in the Calu-Synthetics catalogue.",
};

export default function CategoriesPage() {
  const counts = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, count]) => ({ name, count }));

  return (
    <div className="bg-metallic-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-industrial-950 tracking-tight mb-4">
            Categories
          </h1>
          <p className="text-metallic-600 leading-relaxed">
            Browse the catalogue by category. Each category link opens a pre-filtered product view.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="metallic-card rounded-3xl p-8 border border-metallic-200 shadow-sm hover:shadow-xl transition-all group"
            >
              <p className="text-xs font-black uppercase tracking-widest text-industrial-600 mb-3">
                Category
              </p>
              <h2 className="text-2xl font-black text-industrial-950 group-hover:text-industrial-700 transition-colors">
                {category.name}
              </h2>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-metallic-200 text-metallic-700 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-industrial-500" />
                {category.count} item(s)
              </div>
            </Link>
          ))}
        </div>
      </div>

      <PageCtas />
    </div>
  );
}
