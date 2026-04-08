import Link from "next/link";

const DASHBOARD_URL = "https://veridian-api-dashboard.vercel.app";
const DOCS_URL = "https://api-production-b0c5.up.railway.app/docs";
const STATUS_URL = "https://api-production-b0c5.up.railway.app";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="font-semibold text-lg mb-2" style={{ color: "var(--brand)" }}>
              Veridian
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Compliance-as-a-Service for fintechs. KYC, sanctions screening, and AML via a single REST API.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <div className="font-medium text-gray-900 mb-3">Product</div>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
                <li><Link href={DOCS_URL} className="hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">Docs</Link></li>
                <li><Link href={DASHBOARD_URL} className="hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-3">Legal</div>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-gray-900 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Veridian. All rights reserved.</span>
          <Link
            href={STATUS_URL}
            className="inline-flex items-center gap-1.5 hover:text-gray-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            All systems operational
          </Link>
        </div>
      </div>
    </footer>
  );
}
