import Link from "next/link";

export default function PageCtas() {
  return (
    <section className="py-16 bg-industrial-600 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to source premium industrial chemicals?
            </h2>
            <p className="text-industrial-100 text-lg font-medium opacity-90">
              Browse our full catalog or request a customized quote for your industrial needs today.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 justify-center w-full max-w-xl">
            <Link
              href="/products"
              className="px-10 py-5 bg-white text-industrial-900 font-black rounded-2xl shadow-2xl hover:bg-industrial-50 transition-all uppercase tracking-widest text-sm inline-flex items-center justify-center whitespace-nowrap"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 border-2 border-white text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm inline-flex items-center justify-center whitespace-nowrap"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
