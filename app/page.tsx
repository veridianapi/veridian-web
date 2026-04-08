import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const DASHBOARD_LOGIN = "https://veridian-api-dashboard.vercel.app/login";
const DOCS_URL = "https://api-production-b0c5.up.railway.app/docs";

const features = [
  {
    icon: "🪪",
    title: "KYC Identity Verification",
    description:
      "Verify identities in seconds with document scanning, liveness detection, and database cross-checks across 195+ countries.",
  },
  {
    icon: "🚫",
    title: "Sanctions Screening",
    description:
      "Screen against OFAC, UN, EU, and 50+ global watchlists in real time. Included on every plan, no add-on fees.",
  },
  {
    icon: "🏦",
    title: "AML Compliance",
    description:
      "Automated adverse media monitoring, PEP screening, and transaction pattern analysis to meet BSA/AML obligations.",
  },
  {
    icon: "🏢",
    title: "KYB Business Verification",
    description:
      "Verify business entities, UBOs, and corporate structures. Available on Growth and Scale plans.",
  },
  {
    icon: "📊",
    title: "Transaction Monitoring",
    description:
      "Rule-based and ML-powered transaction monitoring with alert management and SAR filing support. Scale plan.",
  },
  {
    icon: "⚡",
    title: "Developer-First API",
    description:
      "REST API with clear docs, SDKs for Node, Python, and Go. Webhooks, idempotency keys, and a sandbox environment included.",
  },
];

const plans: { name: string; price: string; description: string; features: string[]; cta: string; ctaHref: string; highlighted: boolean }[] = [
  {
    name: "Starter",
    price: "$199",
    description: "For early-stage fintechs getting compliant.",
    features: [
      "200 verifications/month",
      "KYC identity verification",
      "Sanctions screening (OFAC, UN, EU)",
      "REST API + sandbox",
      "Email support",
    ],
    cta: "Start free trial",
    ctaHref: DASHBOARD_LOGIN,
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$499",
    description: "For scaling products with deeper compliance needs.",
    features: [
      "500 verifications/month",
      "Everything in Starter",
      "KYB business verification",
      "Adverse media monitoring",
      "Webhook event streaming",
      "Priority email support",
    ],
    cta: "Start free trial",
    ctaHref: DASHBOARD_LOGIN,
    highlighted: true,
  },
  {
    name: "Scale",
    price: "$999",
    description: "For high-volume teams with strict SLA requirements.",
    features: [
      "2,500 verifications/month",
      "Everything in Growth",
      "Transaction monitoring",
      "99.9% uptime SLA",
      "Dedicated Slack channel",
      "Custom rule configuration",
    ],
    cta: "Contact sales",
    ctaHref: DASHBOARD_LOGIN,
    highlighted: false,
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, var(--brand) 0%, transparent 60%)",
            }}
          />
          <div className="max-w-6xl mx-auto px-6 pt-24 pb-28 relative">
            <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border mb-8"
              style={{ borderColor: "var(--brand)", color: "var(--brand)", backgroundColor: "var(--brand-light)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--brand)" }} />
              SOC 2 Type II in progress · GDPR-ready architecture
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-3xl mb-6 leading-tight">
              Compliance infrastructure
              <br />
              <span style={{ color: "var(--brand)" }}>built for fintechs</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
              KYC identity verification, sanctions screening, and AML compliance
              via a single REST API. Transparent pricing — no $150K enterprise
              contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={DASHBOARD_LOGIN}
                className="inline-flex items-center justify-center gap-2 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: "var(--brand)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start building free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href={DOCS_URL}
                className="inline-flex items-center justify-center gap-2 text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View API docs
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-5">
              Free 14-day trial · No credit card required · 5-minute integration
            </p>
          </div>
        </section>

        {/* Social proof bar */}
        <section className="border-y border-gray-100 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-6">
              Trusted by compliance teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
              {["Meridian Pay", "Volt Finance", "Axia Bank", "Crestline FX", "Nomad Card"].map((co) => (
                <span key={co} className="text-sm font-semibold text-gray-600 tracking-tight">
                  {co}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              One API. Full compliance coverage.
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Everything your compliance team needs, without stitching together
              five vendors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Code snippet */}
        <section className="bg-gray-950 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--brand)" }}>
                  Developer-first
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Integrate in minutes, not months
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  A single REST API call starts a KYC verification. Webhook
                  events keep you updated. Our sandbox mirrors production
                  behavior exactly.
                </p>
                <ul className="space-y-3 text-sm text-gray-400">
                  {[
                    "SDKs for Node.js, Python, Go, and Ruby",
                    "Idempotency keys on all write operations",
                    "Comprehensive webhook event catalog",
                    "Test mode with scenario simulation",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--brand)" }} viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6.5 11.5l-3-3 1-1 2 2 4-4 1 1z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="rounded-xl overflow-hidden border border-gray-800">
                  <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-800">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <span className="ml-3 text-xs text-gray-500">kyc-verify.ts</span>
                  </div>
                  <pre className="bg-gray-950 p-6 text-sm overflow-x-auto">
                    <code className="text-gray-300">{`import Veridian from "@veridian/sdk";

const client = new Veridian({
  apiKey: process.env.VERIDIAN_API_KEY,
});

const verification = await client.kyc.create({
  reference: "user_abc123",
  firstName: "Jane",
  lastName: "Smith",
  dateOfBirth: "1990-05-14",
  country: "US",
  documentType: "passport",
});

// verification.id → "ver_xxxxxxxx"
// verification.status → "pending"
// Webhook fires on completion`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              No setup fees. No per-seat pricing. No $150K enterprise contracts.
              Cancel anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border transition-all ${
                  plan.highlighted
                    ? "border-2 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                style={
                  plan.highlighted
                    ? { borderColor: "var(--brand)", backgroundColor: "var(--brand-light)" }
                    : {}
                }
              >
                {plan.highlighted && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white px-3 py-1 rounded-full"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    Most popular
                  </div>
                )}
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 mb-1">{plan.name}</div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-400 text-sm">/month</span>
                  </div>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--brand)" }} viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L7 9.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={`block text-center text-sm font-medium px-4 py-2.5 rounded-lg transition-colors ${
                    plan.highlighted
                      ? "text-white"
                      : "border border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                  style={plan.highlighted ? { backgroundColor: "var(--brand)" } : {}}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            Need more than 2,500 verifications/month?{" "}
            <Link href={DASHBOARD_LOGIN} className="underline underline-offset-2" style={{ color: "var(--brand)" }} target="_blank" rel="noopener noreferrer">
              Talk to us about custom volume pricing.
            </Link>
          </p>
        </section>

        {/* CTA */}
        <section
          className="py-24"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get compliant in an afternoon
            </h2>
            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
              Start your 14-day free trial. No credit card required. Cancel
              anytime. Your first 50 verifications are always free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={DASHBOARD_LOGIN}
                className="inline-flex items-center justify-center gap-2 bg-white font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                style={{ color: "var(--brand)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start free trial
              </Link>
              <Link
                href={DOCS_URL}
                className="inline-flex items-center justify-center gap-2 text-white font-medium px-6 py-3 rounded-lg border border-white/30 hover:border-white/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View API docs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
