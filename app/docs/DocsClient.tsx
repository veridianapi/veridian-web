'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const BASE_URL = 'https://api.veridianapi.com';
const DASHBOARD_LOGIN = 'https://app.veridianapi.com/login';

// ─── Sidebar data ─────────────────────────────────────────────────────────────

const SIDEBAR_GROUPS = [
  {
    group: 'Getting Started',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'authentication', label: 'Authentication' },
      { id: 'quickstart', label: 'Quick start' },
    ],
  },
  {
    group: 'API Reference',
    items: [
      { id: 'post-verifications', label: 'POST /v1/verifications' },
      { id: 'get-verification', label: 'GET /v1/verifications/:id' },
      { id: 'post-sanctions', label: 'POST /v1/sanctions/screen' },
      { id: 'post-billing', label: 'POST /v1/billing/checkout' },
    ],
  },
  {
    group: 'SDKs',
    items: [
      { id: 'sdk-typescript', label: 'TypeScript' },
      { id: 'sdk-python', label: 'Python' },
    ],
  },
  {
    group: 'Guides',
    items: [
      { id: 'webhooks', label: 'Webhooks' },
      { id: 'hosted-flow', label: 'Hosted verification flow' },
      { id: 'managing-webhooks', label: 'Managing webhooks' },
      { id: 'error-handling', label: 'Error handling' },
    ],
  },
];

const ALL_IDS = SIDEBAR_GROUPS.flatMap((g) => g.items.map((i) => i.id));

// ─── Utility components ───────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all"
      style={{
        color: copied ? 'var(--brand)' : 'rgba(232,245,239,0.4)',
        backgroundColor: 'rgba(232,245,239,0.04)',
        border: '1px solid rgba(232,245,239,0.08)',
      }}
    >
      {copied ? (
        <>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 5.5l2.5 2.5L9.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <rect x="3.5" y="3.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
            <path d="M1.5 7.5v-6h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function CodeBlock({ code, language = 'bash', filename }: { code: string; language?: string; filename?: string }) {
  return (
    <div className="rounded-xl overflow-hidden my-5" style={{ background: '#0d1117', border: '1px solid rgba(29,158,117,0.15)' }}>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: '#161b22', borderBottom: '1px solid rgba(29,158,117,0.1)' }}
      >
        <span className="text-xs code-block" style={{ color: 'rgba(232,245,239,0.35)' }}>
          {filename || language}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-sm leading-6 overflow-x-auto code-block" style={{ color: '#c9e8d9', margin: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

type TabSpec = { label: string; language?: string; code: string };

function TabbedCode({ tabs }: { tabs: TabSpec[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-xl overflow-hidden my-5" style={{ background: '#0d1117', border: '1px solid rgba(29,158,117,0.15)' }}>
      <div
        className="flex items-center"
        style={{ background: '#161b22', borderBottom: '1px solid rgba(29,158,117,0.1)' }}
      >
        <div className="flex flex-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className="px-4 py-2.5 text-xs font-medium transition-colors"
              style={{
                color: active === i ? '#e8f5ef' : 'rgba(232,245,239,0.4)',
                borderBottom: active === i ? '2px solid var(--brand)' : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="pr-3">
          <CopyButton text={tabs[active].code} />
        </div>
      </div>
      <pre className="p-4 text-sm leading-6 overflow-x-auto code-block" style={{ color: '#c9e8d9', margin: 0, minHeight: 80 }}>
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}

function MethodBadge({ method }: { method: 'GET' | 'POST' | 'DELETE' }) {
  const styles: Record<string, { bg: string; color: string }> = {
    GET: { bg: 'rgba(29,158,117,0.12)', color: 'var(--brand)' },
    POST: { bg: 'rgba(249,115,22,0.12)', color: '#f97316' },
    DELETE: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
  };
  const s = styles[method];
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded code-block" style={{ backgroundColor: s.bg, color: s.color }}>
      {method}
    </span>
  );
}

function ParamTable({ params }: { params: { name: string; type: string; required: boolean; description: string }[] }) {
  return (
    <div className="rounded-xl overflow-hidden my-5" style={{ border: '1px solid var(--border)' }}>
      <div
        className="grid text-xs font-semibold uppercase tracking-wide px-4 py-2.5"
        style={{
          gridTemplateColumns: '1.2fr 1fr 2.5fr',
          backgroundColor: 'var(--surface)',
          color: 'rgba(232,245,239,0.4)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span>Name</span>
        <span>Type</span>
        <span>Description</span>
      </div>
      {params.map((p, i) => (
        <div
          key={p.name}
          className="grid px-4 py-3 text-sm items-start"
          style={{
            gridTemplateColumns: '1.2fr 1fr 2.5fr',
            backgroundColor: i % 2 === 0 ? 'var(--card)' : 'transparent',
            borderBottom: i < params.length - 1 ? '1px solid var(--border)' : undefined,
          }}
        >
          <code className="code-block font-semibold text-xs" style={{ color: '#e8f5ef' }}>
            {p.name}
            {p.required && (
              <span className="ml-1.5 text-xs font-normal" style={{ color: '#f97316' }}>*</span>
            )}
          </code>
          <code className="code-block text-xs" style={{ color: 'var(--brand)' }}>{p.type}</code>
          <span className="text-xs leading-5" style={{ color: 'var(--text-muted)' }}>{p.description}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ type = 'info', children }: { type?: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: { border: 'rgba(29,158,117,0.3)', bg: 'rgba(29,158,117,0.05)', icon: 'ℹ', color: 'var(--brand)' },
    warning: { border: 'rgba(249,115,22,0.3)', bg: 'rgba(249,115,22,0.05)', icon: '⚠', color: '#f97316' },
    tip: { border: 'rgba(168,255,120,0.3)', bg: 'rgba(168,255,120,0.04)', icon: '✦', color: '#a8ff78' },
  };
  const s = styles[type];
  return (
    <div
      className="flex gap-3 px-4 py-3.5 rounded-xl my-5 text-sm"
      style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
    >
      <span style={{ color: s.color, flexShrink: 0 }}>{s.icon}</span>
      <span style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{children}</span>
    </div>
  );
}

function SectionHeading({ id, title, method, path }: { id: string; title?: string; method?: 'GET' | 'POST' | 'DELETE'; path?: string }) {
  return (
    <div id={id} className="scroll-mt-20 mb-6 pt-2">
      {method && path ? (
        <div className="flex items-center gap-3 mb-2">
          <MethodBadge method={method} />
          <code className="code-block text-base font-semibold" style={{ color: '#e8f5ef' }}>{path}</code>
        </div>
      ) : (
        <h2 className="text-2xl font-bold mb-1" style={{ color: '#e8f5ef' }}>{title}</h2>
      )}
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold mt-8 mb-3" style={{ color: '#e8f5ef' }}>{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-7 mb-4" style={{ color: 'var(--text-muted)' }}>{children}</p>;
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="code-block text-xs px-1.5 py-0.5 rounded"
      style={{ backgroundColor: 'rgba(29,158,117,0.08)', color: 'var(--brand)', border: '1px solid rgba(29,158,117,0.15)' }}
    >
      {children}
    </code>
  );
}

function Divider() {
  return <div className="my-12" style={{ borderTop: '1px solid var(--border)' }} />;
}

// ─── Section content ──────────────────────────────────────────────────────────

function SectionIntroduction() {
  return (
    <div>
      <SectionHeading id="introduction" title="Introduction" />
      <P>
        Veridian is a Compliance-as-a-Service API. KYC identity verification,
        sanctions screening, and AML compliance in one REST API — built for
        fintech developers who want to ship fast without stitching together five vendors.
      </P>
      <P>
        All requests are made over HTTPS. The API returns JSON for all responses,
        including errors.
      </P>
      <H3>Base URL</H3>
      <CodeBlock code={BASE_URL} language="text" />
      <H3>Key features</H3>
      <ul className="space-y-2 mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
        {[
          'KYC identity verification — document check and face matching',
          'Sanctions screening — OFAC database, 18,698 records',
          'Transparent pricing — no enterprise contracts',
          'Webhooks for async result delivery',
          '14-day free trial included',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2, color: 'var(--brand)' }}>
              <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <Divider />
    </div>
  );
}

function SectionAuthentication() {
  return (
    <div>
      <SectionHeading id="authentication" title="Authentication" />
      <P>
        All API requests require a Bearer token in the <InlineCode>Authorization</InlineCode> header.
        Requests without a valid API key will return a <InlineCode>401 Unauthorized</InlineCode> error.
      </P>
      <CodeBlock
        language="bash"
        code={`curl ${BASE_URL}/v1/verifications \\
  -H "Authorization: Bearer your_api_key"`}
      />
      <Callout type="tip">
        Get your API key from the{' '}
        <a href={DASHBOARD_LOGIN} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Veridian dashboard
        </a>
        . Keep it secret — do not expose it in client-side code or public repositories.
      </Callout>
      <H3>Key format</H3>
      <P>
        API keys are prefixed with <InlineCode>vrd_live_</InlineCode> for production
        and <InlineCode>vrd_test_</InlineCode> for sandbox. Sandbox keys make requests
        against simulated data and will never charge your account.
      </P>
      <Divider />
    </div>
  );
}

function SectionQuickstart() {
  return (
    <div>
      <SectionHeading id="quickstart" title="Quick start" />
      <P>Go from zero to live KYC verifications in under 15 minutes.</P>

      <H3>Step 1 — Get your API key</H3>
      <P>
        Sign up at the{' '}
        <a href={DASHBOARD_LOGIN} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Veridian dashboard
        </a>
        . Your API key is available immediately — no approval process, no sales call.
        14-day free trial, no credit card required.
      </P>

      <H3>Step 2 — Send your first verification</H3>
      <P>
        POST a document image and selfie as base64-encoded strings.
        The API returns a verification ID immediately while processing continues asynchronously.
      </P>
      <CodeBlock
        language="bash"
        filename="create-verification.sh"
        code={`curl -X POST ${BASE_URL}/v1/verifications \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "document_type": "passport",
    "document_front": "<base64_image>",
    "selfie": "<base64_image>"
  }'

# Response:
# {
#   "id": "ver_a1b2c3d4",
#   "status": "pending",
#   "created_at": "2026-04-08T12:00:00Z"
# }`}
      />

      <H3>Step 3 — Get the result</H3>
      <P>
        Poll <InlineCode>GET /v1/verifications/:id</InlineCode> or configure a webhook URL in your
        dashboard to receive results as they complete (recommended for production).
        Most verifications complete in 1–3 seconds.
      </P>
      <CodeBlock
        language="bash"
        filename="get-result.sh"
        code={`curl ${BASE_URL}/v1/verifications/ver_a1b2c3d4 \\
  -H "Authorization: Bearer your_api_key"

# Response:
# {
#   "id": "ver_a1b2c3d4",
#   "status": "approved",
#   "risk_score": 12,
#   "sanctions_hit": false,
#   "name": "Jane Smith",
#   "nationality": "US",
#   "completed_at": "2026-04-08T12:00:02Z"
# }`}
      />
      <Divider />
    </div>
  );
}

function SectionPostVerifications() {
  return (
    <div>
      <SectionHeading id="post-verifications" method="POST" path="/v1/verifications" />
      <P>
        Creates a new KYC identity verification. Submit a document image and selfie;
        Veridian handles document classification, face matching, and sanctions
        screening automatically. Returns a verification object with <InlineCode>status: &quot;pending&quot;</InlineCode>.
      </P>

      <H3>Request body</H3>
      <ParamTable
        params={[
          { name: 'document_type', type: 'string', required: true, description: '"passport" | "driving_licence" | "national_id" | "residence_permit"' },
          { name: 'document_front', type: 'string', required: true, description: 'Base64-encoded image of the document front. JPEG or PNG, max 10MB.' },
          { name: 'document_back', type: 'string', required: false, description: 'Base64-encoded image of the document back. Required for driving_licence.' },
          { name: 'selfie', type: 'string', required: true, description: 'Base64-encoded selfie photo for face matching.' },
        ]}
      />
      <P><span style={{ color: '#f97316' }}>*</span> <span style={{ fontSize: '0.75rem' }}>Required field</span></P>

      <H3>Request example</H3>
      <TabbedCode
        tabs={[
          {
            label: 'cURL',
            code: `curl -X POST ${BASE_URL}/v1/verifications \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "document_type": "passport",
    "document_front": "<base64_image>",
    "selfie": "<base64_image>"
  }'`,
          },
          {
            label: 'TypeScript',
            code: `import VeridianClient from '@veridian/sdk'

const veridian = new VeridianClient('your_api_key')

const verification = await veridian.createVerification({
  documentType: 'passport',
  documentFront: imageBase64,
  selfie: selfieBase64,
})

console.log(verification.id)    // "ver_a1b2c3d4"
console.log(verification.status) // "pending"`,
          },
          {
            label: 'Python',
            code: `from veridian import VeridianClient

client = VeridianClient("your_api_key")

verification = client.create_verification(
    document_type="passport",
    document_front=image_base64,
    selfie=selfie_base64,
)

print(verification.id)     # "ver_a1b2c3d4"
print(verification.status) # "pending"`,
          },
        ]}
      />

      <H3>Response</H3>
      <CodeBlock
        language="json"
        code={`{
  "id": "ver_a1b2c3d4",
  "status": "pending",
  "document_type": "passport",
  "created_at": "2026-04-08T12:00:00Z"
}`}
      />

      <H3>Error codes</H3>
      <ParamTable
        params={[
          { name: 'invalid_document', type: '422', required: false, description: 'Document image could not be read. Ensure the image is clear, well-lit, and under 10MB.' },
          { name: 'unsupported_document', type: '422', required: false, description: 'Document type not supported for the detected country.' },
          { name: 'insufficient_funds', type: '402', required: false, description: 'Account has no remaining verifications. Upgrade your plan.' },
        ]}
      />
      <Divider />
    </div>
  );
}

function SectionGetVerification() {
  return (
    <div>
      <SectionHeading id="get-verification" method="GET" path="/v1/verifications/:id" />
      <P>
        Retrieves a verification by ID. Once <InlineCode>status</InlineCode> is no longer{' '}
        <InlineCode>pending</InlineCode>, all identity fields are populated.
      </P>

      <H3>Path parameters</H3>
      <ParamTable
        params={[
          { name: 'id', type: 'string', required: true, description: 'The verification ID returned from POST /v1/verifications. Prefixed with "ver_".' },
        ]}
      />

      <H3>Request example</H3>
      <CodeBlock
        language="bash"
        code={`curl ${BASE_URL}/v1/verifications/ver_a1b2c3d4 \\
  -H "Authorization: Bearer your_api_key"`}
      />

      <H3>Response</H3>
      <CodeBlock
        language="json"
        code={`{
  "id": "ver_a1b2c3d4",
  "status": "approved",
  "document_type": "passport",
  "risk_score": 12,
  "sanctions_hit": false,
  "name": "Jane Smith",
  "date_of_birth": "1990-05-14",
  "nationality": "US",
  "document_number": "A12345678",
  "document_expiry": "2030-01-01",
  "created_at": "2026-04-08T12:00:00Z",
  "completed_at": "2026-04-08T12:00:02Z"
}`}
      />

      <H3>Status values</H3>
      <ParamTable
        params={[
          { name: 'pending', type: 'string', required: false, description: 'Verification is being processed. Poll again or wait for a webhook.' },
          { name: 'approved', type: 'string', required: false, description: 'Identity verified. No sanctions hits. Safe to onboard.' },
          { name: 'rejected', type: 'string', required: false, description: 'Identity could not be verified. Document unreadable, face match failed, or document expired.' },
          { name: 'review', type: 'string', required: false, description: 'Requires manual review. Veridian will notify you via webhook when complete.' },
          { name: 'expired', type: 'string', required: false, description: 'Verification was not completed within 30 minutes and has expired.' },
        ]}
      />
      <Divider />
    </div>
  );
}

function SectionPostSanctions() {
  return (
    <div>
      <SectionHeading id="post-sanctions" method="POST" path="/v1/sanctions/screen" />
      <P>
        Screens a person against the OFAC SDN database (18,698 records).
        Returns a match list with fuzzy match scores. All KYC verifications
        automatically include a sanctions check — this endpoint is for
        standalone screening without document verification.
      </P>

      <H3>Request body</H3>
      <ParamTable
        params={[
          { name: 'name', type: 'string', required: true, description: 'Full legal name of the person to screen.' },
          { name: 'date_of_birth', type: 'string', required: false, description: 'ISO 8601 date (YYYY-MM-DD). Improves match accuracy.' },
          { name: 'nationality', type: 'string', required: false, description: 'ISO 3166-1 alpha-2 country code (e.g. "US", "GB"). Improves match accuracy.' },
        ]}
      />

      <H3>Request example</H3>
      <CodeBlock
        language="bash"
        code={`curl -X POST ${BASE_URL}/v1/sanctions/screen \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jane Smith",
    "date_of_birth": "1990-05-14",
    "nationality": "US"
  }'`}
      />

      <H3>Response</H3>
      <CodeBlock
        language="json"
        code={`{
  "id": "scr_x1y2z3w4",
  "status": "clear",
  "matches": [],
  "screened_at": "2026-04-08T12:00:00Z"
}

// If a potential match is found:
{
  "id": "scr_x1y2z3w4",
  "status": "potential_match",
  "matches": [
    {
      "list": "OFAC SDN",
      "name": "Jane A. Smith",
      "fuzzy_score": 0.91,
      "entity_type": "individual",
      "additional_info": "Sanctioned entity — see OFAC reference #12345"
    }
  ],
  "screened_at": "2026-04-08T12:00:00Z"
}`}
      />

      <H3>How fuzzy matching works</H3>
      <P>
        Veridian uses trigram similarity combined with phonetic matching (Soundex/Metaphone)
        to catch name variations, transliterations, and common misspellings.
        A <InlineCode>fuzzy_score</InlineCode> of 1.0 is an exact match; scores above 0.85
        are flagged as potential matches and require review.
      </P>
      <Callout type="warning">
        A <InlineCode>status: &quot;clear&quot;</InlineCode> result does not constitute legal
        compliance advice. You remain responsible for your AML/BSA obligations.
        Consult your compliance counsel for guidance.
      </Callout>
      <Divider />
    </div>
  );
}

function SectionPostBilling() {
  return (
    <div>
      <SectionHeading id="post-billing" method="POST" path="/v1/billing/checkout" />
      <P>
        Creates a Paddle checkout session for plan upgrades or initial subscription.
        Returns a short-lived checkout URL to redirect your user to. Typically used
        in your onboarding flow after the user selects a plan.
      </P>

      <H3>Request body</H3>
      <ParamTable
        params={[
          { name: 'plan', type: 'string', required: true, description: '"starter" | "growth" | "scale"' },
          { name: 'email', type: 'string', required: true, description: 'Customer email address. Pre-fills the checkout form.' },
          { name: 'success_url', type: 'string', required: true, description: 'URL to redirect the user after a successful payment.' },
          { name: 'cancel_url', type: 'string', required: true, description: 'URL to redirect the user if they cancel checkout.' },
        ]}
      />

      <H3>Request example</H3>
      <CodeBlock
        language="bash"
        code={`curl -X POST ${BASE_URL}/v1/billing/checkout \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "plan": "growth",
    "email": "user@example.com",
    "success_url": "https://example.com/dashboard",
    "cancel_url": "https://example.com/pricing"
  }'`}
      />

      <H3>Response</H3>
      <CodeBlock
        language="json"
        code={`{
  "checkout_url": "https://checkout.paddle.com/checkout/...",
  "expires_at": "2026-04-08T13:00:00Z"
}`}
      />
      <P>
        The checkout URL expires after 1 hour. Redirect the user immediately after
        receiving it. Do not cache or reuse checkout URLs.
      </P>
      <Divider />
    </div>
  );
}

function SectionSDKTypeScript() {
  return (
    <div>
      <SectionHeading id="sdk-typescript" title="TypeScript SDK" />
      <P>
        The official TypeScript/Node.js SDK wraps the REST API with full type safety.
        Compatible with Node.js 18+ and Bun.
      </P>

      <H3>Installation</H3>
      <CodeBlock language="bash" code="npm install @veridian/sdk" />

      <H3>Initialization</H3>
      <CodeBlock
        language="typescript"
        filename="veridian.ts"
        code={`import VeridianClient from '@veridian/sdk'

const veridian = new VeridianClient(process.env.VERIDIAN_API_KEY!)

// Sandbox mode
const sandbox = new VeridianClient(process.env.VERIDIAN_TEST_KEY!)`}
      />

      <H3>Create a verification</H3>
      <CodeBlock
        language="typescript"
        code={`const verification = await veridian.createVerification({
  documentType: 'passport',
  documentFront: documentBase64,
  selfie: selfieBase64,
})

// Poll for result
const result = await veridian.getVerification(verification.id)

if (result.status === 'approved') {
  console.log('Verified:', result.name, result.nationality)
  console.log('Risk score:', result.riskScore) // 0–100
  console.log('Sanctions hit:', result.sanctionsHit) // boolean
}`}
      />

      <H3>Sanctions screening</H3>
      <CodeBlock
        language="typescript"
        code={`const screen = await veridian.screenSanctions({
  name: 'Jane Smith',
  dateOfBirth: '1990-05-14',
  nationality: 'US',
})

if (screen.status === 'clear') {
  console.log('No sanctions matches found')
} else {
  console.log('Potential matches:', screen.matches)
}`}
      />

      <H3>Webhook event types</H3>
      <CodeBlock
        language="typescript"
        code={`import { VeridianWebhookEvent } from '@veridian/sdk'

// Type-safe webhook handling
function handleWebhook(event: VeridianWebhookEvent) {
  switch (event.type) {
    case 'verification.completed':
      console.log(event.data.status) // 'approved' | 'rejected' | 'review'
      break
    case 'verification.flagged':
      console.log(event.data.reason)
      break
  }
}`}
      />
      <Divider />
    </div>
  );
}

function SectionSDKPython() {
  return (
    <div>
      <SectionHeading id="sdk-python" title="Python SDK" />
      <P>
        The official Python SDK. Compatible with Python 3.9+.
        Supports both sync and async usage via <InlineCode>asyncio</InlineCode>.
      </P>

      <H3>Installation</H3>
      <CodeBlock language="bash" code="pip install veridian-kyc" />

      <H3>Initialization</H3>
      <CodeBlock
        language="python"
        filename="veridian.py"
        code={`from veridian import VeridianClient
import os

client = VeridianClient(os.environ["VERIDIAN_API_KEY"])

# Async client
from veridian.async_client import AsyncVeridianClient
async_client = AsyncVeridianClient(os.environ["VERIDIAN_API_KEY"])`}
      />

      <H3>Create a verification</H3>
      <CodeBlock
        language="python"
        code={`verification = client.create_verification(
    document_type="passport",
    document_front=document_base64,
    selfie=selfie_base64,
)

# Poll for result
result = client.get_verification(verification.id)

if result.status == "approved":
    print(f"Verified: {result.name}, {result.nationality}")
    print(f"Risk score: {result.risk_score}")  # 0-100
    print(f"Sanctions hit: {result.sanctions_hit}")  # bool`}
      />

      <H3>Async usage</H3>
      <CodeBlock
        language="python"
        code={`import asyncio
from veridian.async_client import AsyncVeridianClient

async def verify_user(document_b64: str, selfie_b64: str) -> dict:
    async with AsyncVeridianClient(api_key) as client:
        verification = await client.create_verification(
            document_type="passport",
            document_front=document_b64,
            selfie=selfie_b64,
        )
        return await client.get_verification(verification.id)

result = asyncio.run(verify_user(doc, selfie))`}
      />
      <Divider />
    </div>
  );
}

function SectionWebhooks() {
  return (
    <div>
      <SectionHeading id="webhooks" title="Webhooks" />
      <P>
        Veridian sends webhook events to your server when verification status changes.
        Configure your webhook URL in the dashboard under Settings → Webhooks.
      </P>

      <H3>Webhook events</H3>
      <ParamTable
        params={[
          { name: 'verification.completed', type: 'event', required: false, description: 'Verification finished. status is "approved", "rejected", or "review".' },
          { name: 'verification.flagged', type: 'event', required: false, description: 'Potential sanctions hit found. Requires manual review.' },
          { name: 'verification.expired', type: 'event', required: false, description: 'Verification was not completed within 30 minutes.' },
        ]}
      />

      <H3>Payload format</H3>
      <CodeBlock
        language="json"
        code={`{
  "id": "evt_p9q8r7s6",
  "type": "verification.completed",
  "created_at": "2026-04-08T12:00:02Z",
  "data": {
    "verification_id": "ver_a1b2c3d4",
    "status": "approved",
    "risk_score": 12,
    "sanctions_hit": false
  }
}`}
      />

      <H3>Signature verification</H3>
      <P>
        Every webhook request includes an <InlineCode>x-veridian-signature</InlineCode> header.
        This is an HMAC-SHA256 signature of the raw request body using your webhook secret.
        Always verify this signature before processing events.
      </P>
      <TabbedCode
        tabs={[
          {
            label: 'Node.js',
            code: `const crypto = require('crypto')

function verifyWebhook(rawBody, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex')

  // Use timingSafeEqual to prevent timing attacks
  const expectedBuf = Buffer.from(expected, 'hex')
  const sigBuf = Buffer.from(signature, 'hex')

  if (expectedBuf.length !== sigBuf.length) return false
  return crypto.timingSafeEqual(expectedBuf, sigBuf)
}

// Express example
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['x-veridian-signature']
  if (!verifyWebhook(req.body, sig, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature')
  }
  const event = JSON.parse(req.body)
  // handle event...
  res.status(200).send('OK')
})`,
          },
          {
            label: 'Python',
            code: `import hmac
import hashlib

def verify_webhook(raw_body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        raw_body,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)

# FastAPI example
from fastapi import FastAPI, Request, HTTPException

app = FastAPI()

@app.post("/webhook")
async def handle_webhook(request: Request):
    raw_body = await request.body()
    sig = request.headers.get("x-veridian-signature")

    if not verify_webhook(raw_body, sig, WEBHOOK_SECRET):
        raise HTTPException(status_code=401, detail="Invalid signature")

    event = await request.json()
    # handle event...
    return {"ok": True}`,
          },
        ]}
      />

      <H3>Retry behavior</H3>
      <P>
        If your endpoint returns a non-2xx status code or times out (30 second timeout),
        Veridian will retry delivery up to 5 times with exponential backoff:
        immediately, 1 min, 5 min, 30 min, 2 hours. After 5 failed attempts the event
        is marked as failed and you can replay it from the dashboard.
      </P>
      <Callout type="info">
        Respond with <InlineCode>200 OK</InlineCode> as quickly as possible — ideally before
        doing any processing. Queue events for async handling to avoid timeouts.
      </Callout>
      <Divider />
    </div>
  );
}

function SectionHostedFlow() {
  return (
    <div>
      <SectionHeading id="hosted-flow" title="Hosted verification flow" />
      <P>
        Instead of building your own document capture UI, use Veridian&apos;s hosted flow.
        Create a session and send the URL to your user — they complete the full KYC
        flow on a Veridian-hosted page. No frontend code required.
      </P>

      <H3>Step 1 — Create a session</H3>
      <P>
        POST to <InlineCode>/v1/sessions</InlineCode> with a <InlineCode>redirect_url</InlineCode>.
        After the user completes verification, they are redirected to that URL.
      </P>
      <CodeBlock
        language="bash"
        filename="create-session.sh"
        code={`curl -X POST https://api.veridianapi.com/v1/sessions \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "redirect_url": "https://yourapp.com/verification-complete"
  }'`}
      />
      <CodeBlock
        language="json"
        filename="response.json"
        code={`{
  "session_id": "ses_a1b2c3d4",
  "url": "https://verify.veridianapi.com/s/abc123",
  "expires_at": "2026-04-18T00:00:00Z"
}`}
      />

      <H3>Step 2 — Send the URL to your user</H3>
      <P>
        Deliver the <InlineCode>url</InlineCode> to your user via SMS, email, or in-app.
        The session link expires after 24 hours — generate a fresh one if it lapses.
      </P>
      <Callout type="tip">
        Sessions are single-use. Once the user completes or abandons the flow,
        the URL becomes invalid. Generate a new session if the user needs to retry.
      </Callout>

      <H3>Step 3 — User completes verification</H3>
      <P>
        The user opens the link on any device, uploads their document and selfie,
        and completes face matching. Veridian handles camera access, image
        quality checks, and all UI — nothing to build or maintain.
      </P>

      <H3>Step 4 — Receive the webhook</H3>
      <P>
        When verification finishes, Veridian sends a <InlineCode>verification.completed</InlineCode>{' '}
        webhook to your configured endpoint with the full result.
      </P>
      <CodeBlock
        language="json"
        code={`{
  "event": "verification.completed",
  "verification_id": "ver_a1b2c3d4",
  "status": "approved",
  "risk_score": 12
}`}
      />
      <Callout type="info">
        See the <a href="#webhooks" style={{ color: 'var(--brand)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Webhooks</a> section
        for signature verification and retry behavior.
      </Callout>
      <Divider />
    </div>
  );
}

function SectionManagingWebhooks() {
  return (
    <div>
      <SectionHeading id="managing-webhooks" title="Managing webhooks" />
      <P>
        Create webhook endpoints from the dashboard or via the API to receive real-time
        notifications about verification events.
      </P>

      <H3>Create an endpoint</H3>
      <CodeBlock
        language="bash"
        filename="POST /v1/webhooks"
        code={`curl -X POST https://api.veridianapi.com/v1/webhooks \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://yourapp.com/webhooks/veridian",
    "events": ["verification.completed", "verification.failed"]
  }'`}
      />
      <CodeBlock
        language="json"
        filename="response.json"
        code={`{
  "id": "wh_a1b2c3d4",
  "url": "https://yourapp.com/webhooks/veridian",
  "secret": "whsec_abc123...",
  "events": ["verification.completed", "verification.failed"]
}`}
      />
      <Callout type="warning">
        Save the secret — it is shown only once. Use it to verify all incoming webhook
        signatures before trusting the payload.
      </Callout>

      <H3>Verifying signatures</H3>
      <P>
        Every request includes an <InlineCode>x-veridian-signature</InlineCode> header.
        Reject any request where the signature does not match.
      </P>
      <CodeBlock
        language="typescript"
        filename="verify-signature.ts"
        code={`import crypto from 'crypto'

const signature = req.headers['x-veridian-signature']
const expected = 'sha256=' + crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET!)
  .update(JSON.stringify(req.body))
  .digest('hex')

if (signature !== expected) return res.status(401).end()`}
      />

      <H3>Event payload</H3>
      <CodeBlock
        language="json"
        code={`{
  "event": "verification.completed",
  "verification_id": "ver_a1b2c3d4",
  "status": "approved",
  "risk_score": 12,
  "face_match_score": 0.94,
  "sanctions_hit": false,
  "created_at": "2026-04-17T12:00:00Z"
}`}
      />

      <H3>List endpoints</H3>
      <CodeBlock
        language="bash"
        code={`curl https://api.veridianapi.com/v1/webhooks \\
  -H "Authorization: Bearer your_api_key"`}
      />

      <H3>Delete an endpoint</H3>
      <CodeBlock
        language="bash"
        code={`curl -X DELETE https://api.veridianapi.com/v1/webhooks/wh_a1b2c3d4 \\
  -H "Authorization: Bearer your_api_key"`}
      />
      <Divider />
    </div>
  );
}

function SectionErrorHandling() {
  return (
    <div>
      <SectionHeading id="error-handling" title="Error handling" />
      <P>
        Veridian uses conventional HTTP status codes. All errors return a JSON body
        with a machine-readable <InlineCode>code</InlineCode> and a human-readable{' '}
        <InlineCode>message</InlineCode>.
      </P>

      <H3>Error response format</H3>
      <CodeBlock
        language="json"
        code={`{
  "error": {
    "code": "invalid_document",
    "message": "The document image could not be processed. Ensure the image is clear, well-lit, and under 10MB.",
    "request_id": "req_abc123xyz"
  }
}`}
      />
      <P>
        Always log the <InlineCode>request_id</InlineCode> — include it when contacting support
        to help us trace the exact request.
      </P>

      <H3>HTTP status codes</H3>
      <ParamTable
        params={[
          { name: '200 OK', type: 'success', required: false, description: 'Request succeeded.' },
          { name: '201 Created', type: 'success', required: false, description: 'Resource created successfully.' },
          { name: '400 Bad Request', type: 'error', required: false, description: 'Malformed request body or missing required fields.' },
          { name: '401 Unauthorized', type: 'error', required: false, description: 'API key missing or invalid.' },
          { name: '402 Payment Required', type: 'error', required: false, description: 'Account has no remaining verifications. Upgrade your plan.' },
          { name: '404 Not Found', type: 'error', required: false, description: 'The requested resource does not exist.' },
          { name: '422 Unprocessable', type: 'error', required: false, description: 'Request body is valid JSON but contains invalid values.' },
          { name: '429 Too Many Requests', type: 'error', required: false, description: 'Rate limit exceeded. Default: 100 requests/minute.' },
          { name: '500 Internal Error', type: 'error', required: false, description: 'Server error. Our team is automatically notified. Retry with exponential backoff.' },
        ]}
      />

      <H3>Error codes</H3>
      <ParamTable
        params={[
          { name: 'invalid_api_key', type: '401', required: false, description: 'API key is missing, malformed, or has been revoked.' },
          { name: 'insufficient_funds', type: '402', required: false, description: 'Account has exhausted its monthly verification quota.' },
          { name: 'invalid_document', type: '422', required: false, description: 'Document image could not be read or classified.' },
          { name: 'face_match_failed', type: '422', required: false, description: 'Selfie face matching failed — document face does not match selfie.' },
          { name: 'document_expired', type: '422', required: false, description: 'The submitted document has passed its expiry date.' },
          { name: 'unsupported_document', type: '422', required: false, description: 'Document type is not supported for the detected country.' },
          { name: 'rate_limit_exceeded', type: '429', required: false, description: 'Too many requests. Back off and retry after the Retry-After header value.' },
          { name: 'internal_error', type: '500', required: false, description: 'Unexpected server error. Retry with exponential backoff.' },
        ]}
      />

      <H3>TypeScript error handling</H3>
      <CodeBlock
        language="typescript"
        code={`import { VeridianError } from '@veridian/sdk'

try {
  const result = await veridian.createVerification({ ... })
} catch (err) {
  if (err instanceof VeridianError) {
    console.error(err.code)       // 'invalid_document'
    console.error(err.message)    // Human-readable description
    console.error(err.requestId)  // For support tickets
    console.error(err.status)     // HTTP status code

    if (err.code === 'insufficient_funds') {
      // redirect user to upgrade page
    }
  }
}`}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DocsClient() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll spy via IntersectionObserver
  const handleSectionVisible = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) handleSectionVisible(id);
        },
        { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [handleSectionVisible]);

  const handleNavClick = () => setMobileOpen(false);

  const SidebarContent = () => (
    <nav className="py-6 px-4">
      {SIDEBAR_GROUPS.map((group) => (
        <div key={group.group} className="mb-6">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-2 px-2"
            style={{ color: 'rgba(232,245,239,0.35)' }}
          >
            {group.group}
          </div>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const isActive = activeSection === item.id;
              const isApiItem = group.group === 'API Reference';
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={handleNavClick}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all"
                    style={{
                      color: isActive ? '#e8f5ef' : 'var(--text-muted)',
                      backgroundColor: isActive ? 'rgba(29,158,117,0.1)' : 'transparent',
                      borderLeft: isActive ? '2px solid var(--brand)' : '2px solid transparent',
                      fontFamily: isApiItem ? 'monospace' : undefined,
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* Top nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6"
        style={{
          backgroundColor: 'rgba(5,10,9,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
        suppressHydrationWarning
      >
        <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          <div className="flex items-center gap-6">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden flex flex-col gap-1.5 w-5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle sidebar"
            >
              <span className="block h-0.5 rounded-full" style={{ backgroundColor: '#e8f5ef' }} />
              <span className="block h-0.5 rounded-full" style={{ backgroundColor: '#e8f5ef' }} />
              <span className="block h-0.5 rounded-full" style={{ backgroundColor: '#e8f5ef' }} />
            </button>
            <Link href="/" className="font-bold text-base tracking-tight" style={{ color: '#e8f5ef' }}>
              <span style={{ color: 'var(--brand)' }}>V</span>eridian
            </Link>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                backgroundColor: 'rgba(29,158,117,0.1)',
                color: 'var(--brand)',
                border: '1px solid rgba(29,158,117,0.2)',
              }}
            >
              Docs
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs transition-colors hover:text-[#e8f5ef]"
              style={{ color: 'var(--text-muted)' }}
            >
              ← Back to site
            </Link>
            <Link
              href={DASHBOARD_LOGIN}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all"
              style={{ backgroundColor: 'var(--brand)', color: '#050a09' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get API key
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="absolute top-14 left-0 bottom-0 w-64 overflow-y-auto"
            style={{ backgroundColor: 'var(--card)', borderRight: '1px solid var(--border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="flex pt-14 max-w-screen-xl mx-auto">
        {/* Desktop sidebar */}
        <aside
          className="hidden lg:block w-60 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto"
          style={{ borderRight: '1px solid var(--border)' }}
        >
          <SidebarContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-10 max-w-3xl">
          <SectionIntroduction />
          <SectionAuthentication />
          <SectionQuickstart />
          <SectionPostVerifications />
          <SectionGetVerification />
          <SectionPostSanctions />
          <SectionPostBilling />
          <SectionSDKTypeScript />
          <SectionSDKPython />
          <SectionWebhooks />
          <SectionHostedFlow />
          <SectionManagingWebhooks />
          <SectionErrorHandling />

          {/* Footer */}
          <div
            className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            style={{ borderTop: '1px solid var(--border)', color: 'var(--text-subtle)' }}
          >
            <span>© 2026 Veridian. All rights reserved.</span>
            <Link
              href={DASHBOARD_LOGIN}
              className="transition-colors hover:text-[#e8f5ef]"
              style={{ color: 'var(--brand)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get started free →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
