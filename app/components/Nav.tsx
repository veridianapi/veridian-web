import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl tracking-tight" style={{ color: "var(--brand)" }}>
          Veridian
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link>
          <Link href="/#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
          <Link href="/#docs" className="hover:text-gray-900 transition-colors">Docs</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:inline"
          >
            Sign in
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
