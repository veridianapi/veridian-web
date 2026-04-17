import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div style={{ backgroundColor: '#050a09', minHeight: '100vh' }}>
      <Nav />
      <main>
        <div className="max-w-3xl mx-auto px-6 py-16 pt-28">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors hover:text-[#f0f4f3]"
            style={{ color: '#5a7268' }}
          >
            ← Back to veridianapi.com
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h1
              className="text-3xl font-semibold mb-2"
              style={{ color: '#f0f4f3', letterSpacing: '-0.4px' }}
            >
              {title}
            </h1>
            <p className="text-sm" style={{ color: '#5a7268' }}>
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div
            className="space-y-8 text-base leading-[1.7]"
            style={{ color: '#a3b3ae' }}
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
