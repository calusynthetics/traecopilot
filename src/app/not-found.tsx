import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-metallic-50 min-h-screen flex items-center justify-center py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-metallic-200 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl font-black text-industrial-400">
          404
        </div>
        <h1 className="text-4xl font-black text-industrial-950 mb-4 tracking-tight">Industrial Page Not Found</h1>
        <p className="text-lg text-metallic-600 mb-12 max-w-md mx-auto">
          The technical resource you are looking for does not exist or has been relocated within our systems.
        </p>
        <Link href="/" className="px-8 py-4 bg-industrial-600 text-white font-black rounded-xl hover:bg-industrial-700 transition-all shadow-lg shadow-industrial-900/20">
          RETURN TO DASHBOARD
        </Link>
      </div>
    </div>
  );
}
