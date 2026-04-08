import Link from "next/link";

const DASHBOARD_URL = "https://veridian-api-dashboard.vercel.app";
const DOCS_URL = "https://api-production-b0c5.up.railway.app/docs";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl tracking-tight" style={{ color: "var(--brand)" }}>
          Veridian
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href={DOCS_URL} className="hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">Docs</Link>
          <Link href="/#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
          <Link href={DASHBOARD_URL} className="hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={`${DASHBOARD_URL}/login`}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:inline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign in
          </Link>
          <Link
            href={`${DASHBOARD_URL}/login`}
            className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: "var(--brand)" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
