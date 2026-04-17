import Link from "next/link";

const DOCS_URL = "/docs";
const STATUS_URL = "https://api.veridianapi.com/health";

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="font-bold text-xl mb-3" style={{ color: '#e8f5ef' }}>
              <span style={{ color: 'var(--brand)' }}>V</span>eridian
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Compliance-as-a-Service for fintechs. KYC, sanctions screening,
              and AML via a single REST API.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 text-sm">
            <div>
              <div className="font-semibold mb-4" style={{ color: 'rgba(232, 245, 239, 0.6)' }}>
                Product
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Features', href: '#features', external: false },
                  { label: 'Pricing', href: '#pricing', external: false },
                  { label: 'Docs', href: DOCS_URL, external: false },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#e8f5ef]"
                      style={{ color: 'var(--text-muted)' }}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-4" style={{ color: 'rgba(232, 245, 239, 0.6)' }}>
                Legal
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Terms', href: '/terms' },
                  { label: 'Privacy', href: '/privacy' },
                  { label: 'Refund', href: '/refund' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#e8f5ef]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-subtle)' }}
        >
          <span>© 2026 Veridian. All rights reserved.</span>
          <Link
            href={STATUS_URL}
            className="inline-flex items-center gap-2 transition-colors hover:text-[#e8f5ef]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Operational
          </Link>
        </div>
      </div>
    </footer>
  );
}
