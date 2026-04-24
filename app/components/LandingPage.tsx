'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveDemo from './LiveDemo';
import DashboardPreview from './DashboardPreview';

const DASHBOARD_LOGIN = "https://app.veridianapi.com/login";
const BILLING_URL = "https://app.veridianapi.com/login?next=/dashboard/billing";
const DOCS_URL = "/docs";

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// ─── Shared sub-components ────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase mb-6 px-3 py-1.5 rounded-full"
      style={{
        color: 'var(--brand)',
        backgroundColor: 'rgba(29, 158, 117, 0.08)',
        border: '1px solid rgba(29, 158, 117, 0.15)',
        letterSpacing: '0.08em',
      }}
    >
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Code Window ──────────────────────────────────────────────────────────────

type TabId = 'curl' | 'typescript' | 'python';

const TABS: { id: TabId; label: string }[] = [
  { id: 'curl', label: 'cURL' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python', label: 'Python' },
];

// Plain strings for the copy button
const CODE_TEXT: Record<TabId, string> = {
  curl: `curl -X POST https://api.veridianapi.com/v1/verifications \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "document_type": "passport",
    "document_front": "<base64_image>",
    "selfie": "<base64_image>"
  }'`,
  typescript: `import VeridianClient from '@veridian/sdk'

const veridian = new VeridianClient('your_api_key')

const result = await veridian.createVerification({
  documentType: 'passport',
  documentFront: imageBase64,
  selfie: selfieBase64
})

console.log(result)
// {
//   verificationId: "a1b2c3d4...",
//   status: "pending"
// }`,
  python: `from veridian import VeridianClient

client = VeridianClient("your_api_key")

result = client.create_verification(
    document_type="passport",
    document_front=image_base64,
    selfie=selfie_base64
)

print(result)
# {
#   "verification_id": "a1b2c3d4...",
#   "status": "pending"
# }`,
};

// Syntax-highlighted JSX for each tab
function CurlCode() {
  const k = '#ff7b72';   // keyword / flag
  const s = '#a5d6ff';   // string / URL
  const d = '#ffa657';   // data key
  const c = 'rgba(201,232,217,0.35)'; // comment / muted
  const p = '#c9e8d9';   // plain
  return (
    <code>
      <span style={{ color: k }}>curl</span>
      <span style={{ color: p }}> -X POST </span>
      <span style={{ color: s }}>https://api.veridianapi.com/v1/verifications</span>
      <span style={{ color: c }}> \</span>{'\n'}
      {'  '}
      <span style={{ color: k }}>-H</span>
      <span style={{ color: p }}> </span>
      <span style={{ color: '#a8ff78' }}>&quot;Authorization: Bearer </span>
      <span style={{ color: d }}>your_api_key</span>
      <span style={{ color: '#a8ff78' }}>&quot;</span>
      <span style={{ color: c }}> \</span>{'\n'}
      {'  '}
      <span style={{ color: k }}>-H</span>
      <span style={{ color: p }}> </span>
      <span style={{ color: '#a8ff78' }}>&quot;Content-Type: application/json&quot;</span>
      <span style={{ color: c }}> \</span>{'\n'}
      {'  '}
      <span style={{ color: k }}>-d</span>
      <span style={{ color: p }}> </span>
      <span style={{ color: '#a8ff78' }}>&apos;{'{'}</span>{'\n'}
      {'    '}
      <span style={{ color: d }}>&quot;document_type&quot;</span>
      <span style={{ color: p }}>: </span>
      <span style={{ color: '#a8ff78' }}>&quot;passport&quot;</span>
      <span style={{ color: p }}>,</span>{'\n'}
      {'    '}
      <span style={{ color: d }}>&quot;document_front&quot;</span>
      <span style={{ color: p }}>: </span>
      <span style={{ color: '#a8ff78' }}>&quot;&lt;base64_image&gt;&quot;</span>
      <span style={{ color: p }}>,</span>{'\n'}
      {'    '}
      <span style={{ color: d }}>&quot;selfie&quot;</span>
      <span style={{ color: p }}>: </span>
      <span style={{ color: '#a8ff78' }}>&quot;&lt;base64_image&gt;&quot;</span>{'\n'}
      {'  '}
      <span style={{ color: '#a8ff78' }}>{"}'"}</span>
    </code>
  );
}

function TypeScriptCode() {
  const kw = '#ff7b72';
  const fn = '#d2a8ff';
  const str = '#a8ff78';
  const id = '#c9e8d9';
  const cm = 'rgba(201,232,217,0.35)';
  const cls = '#ffa657';
  return (
    <code>
      <span style={{ color: kw }}>import </span>
      <span style={{ color: cls }}>VeridianClient</span>
      <span style={{ color: kw }}> from </span>
      <span style={{ color: str }}>&apos;@veridian/sdk&apos;</span>{'\n\n'}
      <span style={{ color: kw }}>const </span>
      <span style={{ color: id }}>veridian</span>
      <span style={{ color: '#c9e8d9' }}> = </span>
      <span style={{ color: kw }}>new </span>
      <span style={{ color: cls }}>VeridianClient</span>
      <span style={{ color: '#c9e8d9' }}>(</span>
      <span style={{ color: str }}>&apos;your_api_key&apos;</span>
      <span style={{ color: '#c9e8d9' }}>)</span>{'\n\n'}
      <span style={{ color: kw }}>const </span>
      <span style={{ color: id }}>result</span>
      <span style={{ color: '#c9e8d9' }}> = </span>
      <span style={{ color: kw }}>await </span>
      <span style={{ color: id }}>veridian</span>
      <span style={{ color: '#c9e8d9' }}>.</span>
      <span style={{ color: fn }}>createVerification</span>
      <span style={{ color: '#c9e8d9' }}>({"{"}</span>{'\n'}
      {'  '}
      <span style={{ color: id }}>documentType</span>
      <span style={{ color: '#c9e8d9' }}>: </span>
      <span style={{ color: str }}>&apos;passport&apos;</span>
      <span style={{ color: '#c9e8d9' }}>,</span>{'\n'}
      {'  '}
      <span style={{ color: id }}>documentFront</span>
      <span style={{ color: '#c9e8d9' }}>: </span>
      <span style={{ color: '#a5d6ff' }}>imageBase64</span>
      <span style={{ color: '#c9e8d9' }}>,</span>{'\n'}
      {'  '}
      <span style={{ color: id }}>selfie</span>
      <span style={{ color: '#c9e8d9' }}>: </span>
      <span style={{ color: '#a5d6ff' }}>selfieBase64</span>{'\n'}
      <span style={{ color: '#c9e8d9' }}>{')'}</span>{'\n\n'}
      <span style={{ color: fn }}>console</span>
      <span style={{ color: '#c9e8d9' }}>.</span>
      <span style={{ color: fn }}>log</span>
      <span style={{ color: '#c9e8d9' }}>(</span>
      <span style={{ color: '#a5d6ff' }}>result</span>
      <span style={{ color: '#c9e8d9' }}>)</span>{'\n'}
      <span style={{ color: cm }}>{`// {`}</span>{'\n'}
      <span style={{ color: cm }}>{`//   verificationId: "a1b2c3d4...",`}</span>{'\n'}
      <span style={{ color: cm }}>{`//   status: "pending"`}</span>{'\n'}
      <span style={{ color: cm }}>{`// }`}</span>
    </code>
  );
}

function PythonCode() {
  const kw = '#ff7b72';
  const fn = '#d2a8ff';
  const str = '#a8ff78';
  const id = '#c9e8d9';
  const cm = 'rgba(201,232,217,0.35)';
  const cls = '#ffa657';
  return (
    <code>
      <span style={{ color: kw }}>from </span>
      <span style={{ color: id }}>veridian</span>
      <span style={{ color: kw }}> import </span>
      <span style={{ color: cls }}>VeridianClient</span>{'\n\n'}
      <span style={{ color: id }}>client</span>
      <span style={{ color: '#c9e8d9' }}> = </span>
      <span style={{ color: cls }}>VeridianClient</span>
      <span style={{ color: '#c9e8d9' }}>(</span>
      <span style={{ color: str }}>&quot;your_api_key&quot;</span>
      <span style={{ color: '#c9e8d9' }}>)</span>{'\n\n'}
      <span style={{ color: id }}>result</span>
      <span style={{ color: '#c9e8d9' }}> = </span>
      <span style={{ color: id }}>client</span>
      <span style={{ color: '#c9e8d9' }}>.</span>
      <span style={{ color: fn }}>create_verification</span>
      <span style={{ color: '#c9e8d9' }}>(</span>{'\n'}
      {'    '}
      <span style={{ color: id }}>document_type</span>
      <span style={{ color: '#c9e8d9' }}>=</span>
      <span style={{ color: str }}>&quot;passport&quot;</span>
      <span style={{ color: '#c9e8d9' }}>,</span>{'\n'}
      {'    '}
      <span style={{ color: id }}>document_front</span>
      <span style={{ color: '#c9e8d9' }}>=</span>
      <span style={{ color: '#a5d6ff' }}>image_base64</span>
      <span style={{ color: '#c9e8d9' }}>,</span>{'\n'}
      {'    '}
      <span style={{ color: id }}>selfie</span>
      <span style={{ color: '#c9e8d9' }}>=</span>
      <span style={{ color: '#a5d6ff' }}>selfie_base64</span>{'\n'}
      <span style={{ color: '#c9e8d9' }}>)</span>{'\n\n'}
      <span style={{ color: fn }}>print</span>
      <span style={{ color: '#c9e8d9' }}>(</span>
      <span style={{ color: '#a5d6ff' }}>result</span>
      <span style={{ color: '#c9e8d9' }}>)</span>{'\n'}
      <span style={{ color: cm }}>{`# {`}</span>{'\n'}
      <span style={{ color: cm }}>{`#   "verification_id": "a1b2c3d4...",`}</span>{'\n'}
      <span style={{ color: cm }}>{`#   "status": "pending"`}</span>{'\n'}
      <span style={{ color: cm }}>{`# }`}</span>
    </code>
  );
}

const TAB_CONTENT: Record<TabId, React.ReactNode> = {
  curl: <CurlCode />,
  typescript: <TypeScriptCode />,
  python: <PythonCode />,
};

function CodeWindow({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('curl');
  const [copied, setCopied] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE_TEXT[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  // Static shell rendered on server (and on first client paint before hydration).
  // Matches the mounted version's DOM shape to avoid attribute mismatches.
  if (!mounted) {
    return (
      <div
        className={`rounded-2xl overflow-hidden w-full ${className}`}
        style={{
          background: '#0d1117',
          border: '1px solid rgba(29, 158, 117, 0.2)',
          boxShadow: '0 0 60px rgba(29, 158, 117, 0.08), 0 40px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div className="flex items-center gap-2 px-4 pt-3 pb-0" style={{ backgroundColor: '#161b22' }}>
          <div className="flex items-center gap-1.5 mr-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
          </div>
          <div className="flex items-end gap-0.5 flex-1">
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className="relative px-4 py-2 text-xs font-medium rounded-t-lg"
                style={{
                  color: tab.id === 'curl' ? '#f0f4f3' : 'rgba(232,245,239,0.35)',
                  backgroundColor: tab.id === 'curl' ? '#0d1117' : 'transparent',
                }}
              >
                {tab.label}
                {tab.id === 'curl' && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ backgroundColor: 'var(--brand)' }}
                  />
                )}
              </div>
            ))}
          </div>
          <div
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md mb-1"
            style={{
              color: 'rgba(232,245,239,0.35)',
              backgroundColor: 'rgba(232,245,239,0.05)',
              border: '1px solid rgba(232,245,239,0.08)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
              <path d="M2 8V2h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Copy
          </div>
        </div>
        <div style={{ height: '1px', backgroundColor: 'rgba(29,158,117,0.1)' }} />
        <div className="relative overflow-hidden" style={{ minHeight: '240px' }}>
          <pre className="p-3 sm:p-5 text-xs sm:text-sm leading-[1.8] overflow-x-auto code-block" style={{ color: '#c9e8d9', margin: 0 }}>
            <CurlCode />
          </pre>
        </div>
        <div
          className="flex items-center gap-2.5 px-3 sm:px-5 py-2.5 text-xs code-block"
          style={{
            backgroundColor: 'rgba(29, 158, 117, 0.05)',
            borderTop: '1px solid rgba(29, 158, 117, 0.1)',
            color: 'var(--brand)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
          POST /v1/verifications · 200 OK · 1.8s
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        background: '#0d1117',
        border: '1px solid rgba(29, 158, 117, 0.2)',
        boxShadow: '0 0 60px rgba(29, 158, 117, 0.08), 0 40px 80px rgba(0,0,0,0.6)',
      }}
    >
      {/* Title bar — macOS chrome */}
      <div
        className="flex items-center gap-2 px-4 pt-3 pb-0"
        style={{ backgroundColor: '#161b22' }}
      >
        <div className="flex items-center gap-1.5 mr-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
        </div>

        {/* Tabs */}
        <div className="flex items-end gap-0.5 flex-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-4 py-2 text-xs font-medium rounded-t-lg transition-colors"
              style={{
                color: activeTab === tab.id ? '#f0f4f3' : 'rgba(232,245,239,0.35)',
                backgroundColor: activeTab === tab.id ? '#0d1117' : 'transparent',
              }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: 'var(--brand)' }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md mb-1 transition-all"
          style={{
            color: copied ? 'var(--brand)' : 'rgba(232,245,239,0.35)',
            backgroundColor: 'rgba(232,245,239,0.05)',
            border: '1px solid rgba(232,245,239,0.08)',
          }}
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
                <path d="M2 8V2h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Divider under title bar */}
      <div style={{ height: '1px', backgroundColor: 'rgba(29,158,117,0.1)' }} />

      {/* Code area */}
      <div className="relative overflow-hidden" style={{ minHeight: '240px' }}>
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="p-3 sm:p-5 text-xs sm:text-sm leading-[1.8] overflow-x-auto code-block"
            style={{ color: '#c9e8d9', margin: 0 }}
          >
            {TAB_CONTENT[activeTab]}
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center gap-2.5 px-5 py-2.5 text-xs code-block"
        style={{
          backgroundColor: 'rgba(29, 158, 117, 0.05)',
          borderTop: '1px solid rgba(29, 158, 117, 0.1)',
          color: 'var(--brand)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--brand)' }} />
        POST /v1/verifications · 200 OK · 1.8s
      </div>
    </div>
  );
}

// ─── Hero Console Visual ──────────────────────────────────────────────────────

const STREAM_ROWS = [
  { t: '14:32:08', ev: 'identity.verified',    country: 'DE · Berlin',    risk: '0.08', status: 'ok',   label: 'PASS'   },
  { t: '14:32:06', ev: 'transaction.screened', country: 'US · New York',  risk: '0.12', status: 'ok',   label: 'PASS'   },
  { t: '14:32:04', ev: 'sanction.hit.ofac',    country: 'CY · Limassol',  risk: '0.94', status: 'err',  label: 'BLOCK'  },
  { t: '14:32:01', ev: 'kyb.ubo.verified',     country: 'GB · London',    risk: '0.21', status: 'ok',   label: 'PASS'   },
  { t: '14:31:58', ev: 'pep.match.review',     country: 'AE · Dubai',     risk: '0.61', status: 'warn', label: 'REVIEW' },
  { t: '14:31:55', ev: 'transaction.screened', country: 'SG · Central',   risk: '0.09', status: 'ok',   label: 'PASS'   },
  { t: '14:31:52', ev: 'identity.verified',    country: 'FR · Paris',     risk: '0.14', status: 'ok',   label: 'PASS'   },
  { t: '14:31:49', ev: 'kyc.document.ocr',     country: 'BR · São Paulo', risk: '0.18', status: 'ok',   label: 'PASS'   },
];

const QUEUE_HEIGHTS = [6,8,5,9,12,7,10,14,8,6,9,11,7,5,8,10,13,9,6,8,11,7,9,12];

function statusPillStyle(status: string): React.CSSProperties {
  if (status === 'err')  return { background: 'rgba(220,38,38,0.15)',  color: '#f87171', border: '1px solid rgba(220,38,38,0.3)',  padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em' };
  if (status === 'warn') return { background: 'rgba(217,119,6,0.15)',  color: '#fbbf24', border: '1px solid rgba(217,119,6,0.3)',  padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em' };
  return                        { background: 'rgba(29,158,117,0.15)', color: '#1d9e75', border: '1px solid rgba(29,158,117,0.3)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em' };
}

function HeroConsole() {
  const mono: React.CSSProperties = { fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' };
  return (
    <div style={{
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(29,158,117,0.08), 0 40px 80px -20px rgba(0,0,0,0.7)',
      background: '#080e0c',
    }}>
      {/* Header */}
      <div style={{
        height: '38px',
        background: '#0b1211',
        borderBottom: '1px solid rgba(240,244,243,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#1d9e75' }} />
          </div>
          <span style={{ ...mono, fontSize: '11px', color: '#5a7268' }}>veridian / live · acme-payments</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', ...mono, fontSize: '11px', color: '#5a7268' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1d9e75', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          streaming · eu-central-1
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', height: '340px' }}>
        {/* Main stream */}
        <div style={{ flex: 1, overflowY: 'hidden', padding: '0' }}>
          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '72px 1fr 120px 72px 64px',
            gap: '0',
            padding: '8px 16px',
            borderBottom: '1px solid rgba(240,244,243,0.05)',
          }}>
            {['TIME', 'EVENT', 'LOCATION', 'RISK', ''].map((h, i) => (
              <span key={i} style={{ ...mono, fontSize: '9px', color: '#3d544e', letterSpacing: '0.1em', fontWeight: 600 }}>{h}</span>
            ))}
          </div>
          {STREAM_ROWS.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr 120px 72px 64px',
                gap: '0',
                padding: '7px 16px',
                borderBottom: '1px solid rgba(240,244,243,0.03)',
                alignItems: 'center',
                background: i % 2 === 0 ? 'transparent' : 'rgba(240,244,243,0.01)',
              }}
            >
              <span style={{ ...mono, fontSize: '11px', color: '#3d544e' }}>{r.t}</span>
              <span style={{ ...mono, fontSize: '11px', color: r.status === 'err' ? '#f87171' : r.status === 'warn' ? '#fbbf24' : '#7ecf97' }}>{r.ev}</span>
              <span style={{ ...mono, fontSize: '11px', color: '#5a7268' }}>{r.country}</span>
              <span style={{ ...mono, fontSize: '11px', color: r.status === 'err' ? '#f87171' : r.status === 'warn' ? '#fbbf24' : '#a3b3ae' }}>risk {r.risk}</span>
              <span style={statusPillStyle(r.status)}>{r.label}</span>
            </div>
          ))}
        </div>

        {/* Right sidebar metrics */}
        <div style={{
          width: '160px',
          flexShrink: 0,
          borderLeft: '1px solid rgba(240,244,243,0.06)',
          padding: '14px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}>
          {/* Events/sec */}
          <div>
            <div style={{ ...mono, fontSize: '9px', color: '#3d544e', letterSpacing: '0.08em', marginBottom: '4px' }}>Events / sec</div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#f0f4f3', letterSpacing: '-0.03em' }}>
              2,143<span style={{ fontSize: '10px', color: '#5a7268', fontWeight: 400, marginLeft: '2px' }}>rps</span>
            </div>
            {/* Sparkline */}
            <svg viewBox="0 0 120 32" preserveAspectRatio="none" style={{ width: '100%', height: '28px', marginTop: '6px' }}>
              <defs>
                <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#1d9e75" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#1d9e75" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,24 L10,20 L20,22 L30,16 L40,18 L50,12 L60,15 L70,10 L80,13 L90,7 L100,10 L110,4 L120,6" stroke="#1d9e75" strokeWidth="1" fill="none" />
              <path d="M0,24 L10,20 L20,22 L30,16 L40,18 L50,12 L60,15 L70,10 L80,13 L90,7 L100,10 L110,4 L120,6 L120,32 L0,32 Z" fill="url(#sg)" />
            </svg>
          </div>
          {/* P50/P99 */}
          <div>
            <div style={{ ...mono, fontSize: '9px', color: '#3d544e', letterSpacing: '0.08em', marginBottom: '4px' }}>P50 · p99 latency</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4f3', letterSpacing: '-0.03em' }}>
              47<span style={{ fontSize: '10px', color: '#5a7268', fontWeight: 400 }}> / 112 ms</span>
            </div>
          </div>
          {/* Block rate */}
          <div>
            <div style={{ ...mono, fontSize: '9px', color: '#3d544e', letterSpacing: '0.08em', marginBottom: '4px' }}>Block rate · 24h</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#f0f4f3', letterSpacing: '-0.03em' }}>
              0.41<span style={{ fontSize: '10px', color: '#5a7268', fontWeight: 400 }}>%</span>
            </div>
          </div>
          {/* Queue depth bars */}
          <div>
            <div style={{ ...mono, fontSize: '9px', color: '#3d544e', letterSpacing: '0.08em', marginBottom: '6px' }}>Queue depth</div>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '28px' }}>
              {QUEUE_HEIGHTS.map((h, i) => (
                <div key={i} style={{ flex: 1, height: h * 2, background: '#1d9e75', opacity: 0.3 + h / 20, borderRadius: '1px' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid rgba(240,244,243,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        ...mono,
        fontSize: '10px',
        color: '#3d544e',
        background: '#0b1211',
      }}>
        <span>wss://api.veridianapi.com/v1/stream</span>
        <span>0 dropped · 184,204,108 delivered · lag 3ms</span>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden"
      style={{
        minHeight: '100vh',
        background: [
          'radial-gradient(ellipse 80% 60% at 60% 0%, rgba(29,158,117,0.12) 0%, transparent 100%)',
          'radial-gradient(ellipse 50% 40% at 20% 30%, rgba(29,158,117,0.06) 0%, transparent 100%)',
          '#050a09',
        ].join(', '),
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '48px 48px',
        }}
      />

      {/* Centered content */}
      <div className="relative w-full mx-auto px-6 flex flex-col items-center text-center" style={{ maxWidth: '900px', paddingTop: '128px', paddingBottom: '96px' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          suppressHydrationWarning
          className="flex flex-col items-center w-full"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <div
              className="inline-flex items-center gap-2 rounded-full font-medium"
              style={{
                border: '1px solid rgba(29,158,117,0.3)',
                backgroundColor: 'rgba(29,158,117,0.08)',
                color: '#1d9e75',
                fontSize: '12px',
                padding: '6px 16px',
                borderRadius: '9999px',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#1d9e75' }} />
              Developer-first KYC API
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(48px, 7vw, 80px)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              color: '#f0f4f3',
              lineHeight: 1.0,
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            KYC without the $50K contract.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: '18px',
              fontWeight: 300,
              color: '#a3b3ae',
              maxWidth: '560px',
              marginTop: '20px',
              lineHeight: '1.6',
            }}
          >
            Identity verification, sanctions screening, and AML in one REST call.
            Transparent pricing. No sales calls.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center"
            style={{ gap: '12px', marginTop: '36px' }}
          >
            <Link
              href={DASHBOARD_LOGIN}
              className="inline-flex items-center justify-center font-medium transition-all hover:opacity-90"
              style={{ height: '44px', padding: '0 24px', backgroundColor: '#1d9e75', color: '#050a09', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}
            >
              Get API key free →
            </Link>
            <Link
              href={DOCS_URL}
              className="inline-flex items-center justify-center transition-all hover:text-[#f0f4f3] hover:border-white/20"
              style={{ height: '44px', padding: '0 24px', border: '1px solid rgba(255,255,255,0.12)', color: '#a3b3ae', borderRadius: '8px', fontSize: '14px' }}
            >
              View docs
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p variants={fadeUp} style={{ fontSize: '12px', color: '#5a7268', marginTop: '16px' }}>
            18,698 OFAC records · &lt;2s response · 14-day free trial
          </motion.p>

          {/* Hero console stream visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            suppressHydrationWarning
            className="w-full"
            style={{ marginTop: '64px' }}
          >
            <HeroConsole />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050a09)' }}
      />
    </section>
  );
}

// ─── Simple Integration Section ───────────────────────────────────────────────

function SimpleIntegrationSection() {
  const mono: React.CSSProperties = { fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' };
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ marginBottom: '48px' }}
      >
        <motion.div
          variants={fadeUp}
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(140px, 15vw, 180px) 1fr',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          <div style={{ ...mono, fontSize: '11px', color: '#5a7268', letterSpacing: '0.06em', textTransform: 'uppercase', paddingTop: '6px' }}>
            S / 03 — API
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, letterSpacing: '-0.035em', color: '#f0f4f3', lineHeight: 1.1, marginBottom: '14px' }}>
              Five endpoints.{' '}
              <em style={{ fontStyle: 'italic', color: '#a3b3ae' }}>Every compliance decision your fintech will ever make.</em>
            </h2>
            <p style={{ fontSize: '15px', color: '#a3b3ae', lineHeight: 1.6, maxWidth: '520px' }}>
              Typed SDKs in six languages. Webhooks with exactly-once delivery. Sandbox environments that mirror production risk scoring.
            </p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="mx-auto"
        style={{ maxWidth: '700px' }}
      >
        <CodeWindow />
      </motion.div>
    </section>
  );
}

// ─── Trust Strip ─────────────────────────────────────────────────────────────

const CAPABILITY_ITEMS = [
  { label: 'KYC · 195+ countries' },
  { label: 'OFAC & UN sanctions' },
  { label: 'AML transaction monitoring' },
  { label: 'Immutable audit logs' },
  { label: 'GDPR-ready workflows' },
  { label: 'SHA-256 hashed API keys' },
];

function TrustStrip() {
  const mono: React.CSSProperties = { fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' };
  return (
    <div
      style={{
        borderTop: '1px solid rgba(240,244,243,0.06)',
        borderBottom: '1px solid rgba(240,244,243,0.06)',
        padding: '28px 24px',
      }}
    >
      <div
        className="max-w-6xl mx-auto"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '12px', color: '#5a7268', lineHeight: 1.5, flexShrink: 0 }}>
          Built for regulated fintech workflows.
        </div>
        <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap', alignItems: 'center' }}>
          {CAPABILITY_ITEMS.map((item, i) => (
            <div
              key={item.label}
              style={{
                ...mono,
                fontSize: '11px',
                color: 'rgba(240,244,243,0.30)',
                letterSpacing: '0.02em',
                padding: '4px 16px',
                borderLeft: i > 0 ? '1px solid rgba(240,244,243,0.06)' : 'none',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Bento Grid ───────────────────────────────────────────────────────────────

function BentoCard({
  children,
  className = '',
  highlighted = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -3,
        boxShadow: highlighted
          ? '0 0 0 1px rgba(29, 158, 117, 0.5), 0 0 40px rgba(29, 158, 117, 0.18)'
          : '0 0 0 1px rgba(29, 158, 117, 0.25), 0 0 30px rgba(29, 158, 117, 0.1)',
      }}
      className={`rounded-2xl p-6 relative overflow-hidden ${className}`}
      style={{
        backgroundColor: '#111916',
        border: highlighted
          ? '1px solid rgba(29, 158, 117, 0.3)'
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: highlighted
          ? '0 0 0 1px rgba(29, 158, 117, 0.2), 0 0 30px rgba(29, 158, 117, 0.08)'
          : undefined,
      }}
    >
      {highlighted && (
        <div
          className="absolute inset-0 opacity-100 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(29, 158, 117, 0.08) 0%, transparent 70%)',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
      style={{
        backgroundColor: 'rgba(29, 158, 117, 0.1)',
        border: '1px solid rgba(29, 158, 117, 0.15)',
      }}
    >
      <span style={{ color: 'var(--brand)' }}>{children}</span>
    </div>
  );
}

function BentoFeaturesSection() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ marginBottom: '64px' }}
      >
        <motion.div
          variants={fadeUp}
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(140px, 15vw, 180px) 1fr',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace',
              fontSize: '11px',
              color: '#5a7268',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              paddingTop: '6px',
            }}
          >
            S / 05 — Capabilities
          </div>
          <div>
            <h2
              style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 400,
                letterSpacing: '-0.035em',
                color: '#f0f4f3',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              Every regulatory primitive,{' '}
              <em style={{ fontStyle: 'italic', color: '#a3b3ae' }}>composable and individually priced.</em>
            </h2>
            <p style={{ fontSize: '15px', color: '#a3b3ae', lineHeight: 1.6, maxWidth: '560px' }}>
              Use the full stack or a single endpoint. Swap in Veridian&apos;s rules engine without touching your existing KYC vendor. We&apos;re infrastructure, not a walled garden.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto"
      >
        {/* Row 1: Identity (2 cols) + Uptime (1 col) */}
        <BentoCard className="md:col-span-2" highlighted delay={0}>
          <CardIcon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="6.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 7.5h4M10 9h3M10 10.5h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          </CardIcon>
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#f0f4f3' }}>
            Identity verification in 2 seconds
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#a3b3ae' }}>
            Document scanning, liveness detection, and database cross-checks across 195+ countries.
            Passport, driver&apos;s license, national ID — all supported.
          </p>
          <div className="flex gap-3 flex-wrap">
            {['195+ countries', 'Liveness detection', 'Database cross-check'].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(29, 158, 117, 0.08)',
                  border: '1px solid rgba(29, 158, 117, 0.15)',
                  color: 'var(--brand)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </BentoCard>

        <BentoCard delay={0.05}>
          <CardIcon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L3 5v5c0 3.5 2.5 6.5 6 7.5C12.5 16.5 15 13.5 15 10V5L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </CardIcon>
          <div className="text-3xl font-semibold mb-1" style={{ color: '#f0f4f3' }}>99.9%</div>
          <div className="text-sm font-medium mb-2" style={{ color: 'var(--brand)' }}>Uptime SLA</div>
          <p className="text-sm leading-relaxed" style={{ color: '#a3b3ae' }}>
            Guaranteed availability on Scale plan. Redundant infra across multiple regions.
          </p>
        </BentoCard>

        {/* Row 2: OFAC (1 col) + Developer API (2 cols) */}
        <BentoCard delay={0.1}>
          <CardIcon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </CardIcon>
          <div className="text-3xl font-semibold mb-1" style={{ color: '#f0f4f3' }}>18,698</div>
          <div className="text-sm font-medium mb-2" style={{ color: 'var(--brand)' }}>OFAC sanctions records</div>
          <p className="text-sm leading-relaxed" style={{ color: '#a3b3ae' }}>
            OFAC, UN, EU, and 50+ global watchlists. Updated daily. Included on every plan.
          </p>
        </BentoCard>

        <BentoCard className="md:col-span-2" delay={0.15}>
          <CardIcon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5.5 6.5L2 9l3.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5 6.5L16 9l-3.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.5 4l-3 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </CardIcon>
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#f0f4f3' }}>Developer-first API</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#a3b3ae' }}>
            REST API with clear docs. SDKs for Node, Python, and Go.
            Idempotency keys, webhooks, and a full sandbox environment.
          </p>
          <div
            className="rounded-xl px-4 py-3 code-block text-xs leading-6"
            style={{
              backgroundColor: '#080f0c',
              border: '1px solid rgba(29, 158, 117, 0.12)',
              color: '#c9e8d9',
            }}
          >
            <span style={{ color: '#7ee8a2' }}>import</span>
            {' Veridian '}
            <span style={{ color: '#7ee8a2' }}>from</span>
            {' '}
            <span style={{ color: '#ffd68a' }}>&quot;@veridian/sdk&quot;</span>
            {'\n'}
            <span style={{ color: 'rgba(232,245,239,0.3)' }}>{'//'} npm install @veridian/sdk</span>
          </div>
        </BentoCard>

        {/* Row 3: Pricing + Global + Hosted flow */}
        <BentoCard delay={0.2}>
          <CardIcon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2v1M9 15v1M2 9H1M17 9h-1M4.2 4.2l-.7-.7M14.5 14.5l-.7-.7M4.2 13.8l-.7.7M14.5 3.5l-.7.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </CardIcon>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#f0f4f3' }}>Transparent pricing</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#a3b3ae' }}>
            No setup fees. No per-seat pricing. No $150K enterprise contracts. See exactly what you pay.
          </p>
        </BentoCard>

        <BentoCard className="md:col-span-2" delay={0.25}>
          <CardIcon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 9h14M9 2c-2 2-3 4-3 7s1 5 3 7M9 2c2 2 3 4 3 7s-1 5-3 7" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </CardIcon>
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#f0f4f3' }}>Global document coverage</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#a3b3ae' }}>
            195+ countries. Passports, driver&apos;s licenses, national IDs, and residence permits.
            Automatic document classification — no configuration needed.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="h-1.5 rounded-full flex-1"
              style={{ backgroundColor: 'rgba(29, 158, 117, 0.12)' }}
            >
              <div
                className="h-1.5 rounded-full"
                style={{ width: '92%', backgroundColor: 'var(--brand)' }}
              />
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--brand)' }}>195+</span>
          </div>
        </BentoCard>

        <BentoCard delay={0.3}>
          <div className="flex items-start justify-between mb-4">
            <CardIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7.5 10.5a4 4 0 0 0 5.657 0l2-2a4 4 0 0 0-5.657-5.657l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10.5 7.5a4 4 0 0 0-5.657 0l-2 2a4 4 0 0 0 5.657 5.657l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </CardIcon>
            <span
              className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'rgba(29, 158, 117, 0.12)',
                border: '1px solid rgba(29, 158, 117, 0.25)',
                color: '#1d9e75',
                letterSpacing: '0.06em',
              }}
            >
              New
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#f0f4f3' }}>Hosted verification flow</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#a3b3ae' }}>
            Send users a link. They upload their document and selfie on our hosted page. No UI to build.
          </p>
        </BentoCard>
      </motion.div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Get your API key',
      description: 'Sign up in 30 seconds. Your API key is available instantly in the dashboard. No approval process, no sales call.',
    },
    {
      number: '02',
      title: 'Send a document',
      description: 'One POST request with a base64-encoded document and selfie. Our API handles document classification automatically.',
    },
    {
      number: '03',
      title: 'Get a verified result',
      description: 'Receive a structured JSON response in under 2 seconds. Risk score, sanctions check, and identity confidence — all in one call.',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 scroll-mt-16"
      style={{
        background: 'linear-gradient(to bottom, #050a09, #0a0f0e 50%, #050a09)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{ marginBottom: '64px' }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(140px, 15vw, 180px) 1fr',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            <div
              style={{
                fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace',
                fontSize: '11px',
                color: '#5a7268',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                paddingTop: '6px',
              }}
            >
              S / 02 — Setup
            </div>
            <div>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  letterSpacing: '-0.035em',
                  color: '#f0f4f3',
                  lineHeight: 1.1,
                  marginBottom: '16px',
                }}
              >
                Production API keys in ninety seconds.{' '}
                <em style={{ fontStyle: 'italic', color: '#a3b3ae' }}>First live decision before your coffee goes cold.</em>
              </h2>
              <p style={{ fontSize: '15px', color: '#a3b3ae', lineHeight: 1.6, maxWidth: '520px' }}>
                From zero to live KYC verifications in an afternoon.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connector line (desktop) */}
          <div
            className="absolute top-10 h-px hidden md:block"
            style={{
              left: '16.67%',
              right: '16.67%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), rgba(255,255,255,0.08), transparent)',
            }}
          />

          {steps.map((step) => (
            <motion.div key={step.number} variants={fadeUp} className="relative">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 font-mono font-light text-5xl"
                style={{
                  backgroundColor: '#111916',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--brand)',
                }}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#f0f4f3' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#a3b3ae' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────────

const SALES_EMAIL = 'mailto:support@veridianapi.com';

const plans: {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted: boolean;
}[] = [
  {
    name: 'Starter',
    price: '$199',
    description: 'Up to 500 verifications/month',
    features: [
      '500 verifications/month',
      'KYC identity verification',
      'Sanctions screening (OFAC, UN, EU)',
      'REST API + sandbox',
      'Email support',
    ],
    cta: 'Start free trial',
    ctaHref: BILLING_URL,
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$499',
    description: 'Up to 2,000 verifications/month',
    features: [
      '2,000 verifications/month',
      'Everything in Starter',
      'KYB business verification',
      'Adverse media monitoring',
      'Webhook event streaming',
      'Priority support',
    ],
    cta: 'Start free trial',
    ctaHref: BILLING_URL,
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '$999',
    description: 'Up to 10,000 verifications/month',
    features: [
      '10,000 verifications/month',
      'Everything in Growth',
      'Transaction monitoring',
      '99.9% uptime SLA',
      'Dedicated Slack channel',
      'Custom rule configuration',
    ],
    cta: 'Contact sales',
    ctaHref: SALES_EMAIL,
    highlighted: false,
  },
];

function PricingSection() {
  const mono: React.CSSProperties = { fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' };
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ marginBottom: '64px' }}
      >
        <motion.div
          variants={fadeUp}
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(140px, 15vw, 180px) 1fr',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          <div style={{ ...mono, fontSize: '11px', color: '#5a7268', letterSpacing: '0.06em', textTransform: 'uppercase', paddingTop: '6px' }}>
            S / 07 — Pricing
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, letterSpacing: '-0.035em', color: '#f0f4f3', lineHeight: 1.1, marginBottom: '16px' }}>
              Simple, transparent pricing.{' '}
              <em style={{ fontStyle: 'italic', color: '#a3b3ae' }}>No per-seat fees. No implementation minimums.</em>
            </h2>
            <p style={{ fontSize: '15px', color: '#a3b3ae', lineHeight: 1.6, maxWidth: '520px' }}>
              No setup fees. No contracts. Cancel anytime.{' '}
              <em style={{ color: '#5a7268' }}>Persona starts at $50K/yr. We start at $199/mo.</em>
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid md:grid-cols-3 gap-5"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl p-8 flex flex-col"
            style={{
              backgroundColor: plan.highlighted ? 'rgba(29, 158, 117, 0.05)' : '#111916',
              border: plan.highlighted
                ? '1px solid rgba(29, 158, 117, 0.4)'
                : '1px solid rgba(255,255,255,0.08)',
              boxShadow: plan.highlighted
                ? '0 0 0 1px rgba(29, 158, 117, 0.15), 0 0 50px rgba(29, 158, 117, 0.1), 0 30px 45px -30px rgba(0,0,0,0.4), 0 18px 36px -18px rgba(0,0,0,0.2)'
                : '0 30px 45px -30px rgba(0,0,0,0.4), 0 18px 36px -18px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {plan.highlighted && (
              <>
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--brand)', color: '#050a09' }}
                >
                  Most popular
                </div>
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(29, 158, 117, 0.08) 0%, transparent 70%)',
                  }}
                />
              </>
            )}

            <div className="relative z-10 flex flex-col flex-1">
              <div className="mb-6">
                <div className="text-sm font-semibold mb-2" style={{ color: 'var(--brand)' }}>
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-semibold tracking-tight" style={{ color: '#f0f4f3' }}>
                    {plan.price}
                  </span>
                  <span className="text-sm mb-2" style={{ color: '#a3b3ae' }}>/mo</span>
                </div>
                <p className="text-sm" style={{ color: '#a3b3ae' }}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm" style={{ color: '#a3b3ae' }}>
                    <CheckIcon />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className="flex items-center justify-center text-[13px] font-medium px-5 h-11 sm:h-9 rounded-lg transition-all"
                style={
                  plan.highlighted
                    ? { backgroundColor: 'var(--brand)', color: '#050a09' }
                    : {
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#a3b3ae',
                      }
                }
              >
                {plan.cta}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center text-sm mt-8"
        style={{ color: '#5a7268' }}
      >
        Need more than 10,000 verifications/month?{' '}
        <Link
          href={SALES_EMAIL}
          className="underline underline-offset-4 transition-colors"
          style={{ color: 'var(--brand)' }}
        >
          Talk to us about custom volume pricing.
        </Link>
      </motion.p>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'How long does a verification take?',
    answer:
      'Under 2 seconds for most documents. OCR extraction, face matching, and sanctions screening all happen in parallel.',
  },
  {
    question: 'Which documents do you support?',
    answer:
      'Passports, driving licences, and national IDs from 195+ countries. Document type is auto-detected — no configuration needed.',
  },
  {
    question: 'How does sanctions screening work?',
    answer:
      'We screen against 18,698 OFAC SDN records using fuzzy matching to catch name variations and transliterations.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes — 14 days free, no credit card required. You get full API access from day one. Cancel anytime.',
  },
  {
    question: 'How do I get my API key?',
    answer:
      'Sign up at the dashboard, go to API Keys, and create a key in 30 seconds. No approval process, no sales call.',
  },
  {
    question: 'What happens if I exceed my verification limit?',
    answer:
      'The API returns a 429 error with a clear message. Upgrade your plan from the dashboard in one click.',
  },
  {
    question: 'How does Veridian compare to Persona?',
    answer:
      'Persona charges $50K+ per year with custom contracts. Veridian starts at $199/mo, self-serve, 14-day free trial. Same core technology — OCR, face matching, sanctions screening.',
  },
  {
    question: 'Where is data stored?',
    answer:
      'Document images are processed in eu-west-1 (Ireland) and deleted after verification. We never store raw document images.',
  },
];

function FAQItem({
  question,
  answer,
  last,
}: {
  question: string;
  answer: string;
  last: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="text-sm font-medium" style={{ color: '#f0f4f3' }}>
          {question}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
          }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="#5a7268"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="px-6 pb-5 text-sm leading-relaxed"
              style={{ color: '#a3b3ae' }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Security Section ─────────────────────────────────────────────────────────

const SECURITY_CARDS = [
  {
    title: 'SHA-256 API key hashing',
    description: 'API keys are hashed before storage. Even in a breach, your credentials cannot be recovered or replayed.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="9" width="12" height="9" rx="2" stroke="#1d9e75" strokeWidth="1.5" />
        <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="#1d9e75" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'OFAC sanctions screening',
    description: '18,000+ sanctions records checked on every verification against OFAC, EU, and UN watchlists in real time.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L3 5.5v5c0 4 3.1 7.3 7 8 3.9-.7 7-4 7-8v-5L10 2Z" stroke="#1d9e75" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'GDPR ready',
    description: 'Data minimisation, right-to-erasure endpoints, and EU data residency options built in from day one.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#1d9e75" strokeWidth="1.5" />
        <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#1d9e75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'SOC 2 in progress',
    description: 'Audit underway with an accredited assessor. Controls cover availability, confidentiality, and processing integrity.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l1.8 3.6 4 .6-2.9 2.8.7 4L10 11l-3.6 1.9.7-4L4.2 6.2l4-.6L10 2Z" stroke="#1d9e75" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const SECURITY_ARCH = [
  { n: '01', t: 'Tenant-isolated key management', d: 'Per-tenant KMS with hardware-backed key derivation. Keys never leave the enclave. BYOK supported for regulated environments.', m: 'AWS KMS · HSM FIPS 140-3' },
  { n: '02', t: 'Zero-retention processing paths', d: 'PII is hashed at the edge. Document images are destroyed after decisioning unless explicitly retained under a documented lawful basis.', m: 'GDPR Art. 5 · 17 · 32' },
  { n: '03', t: 'Immutable, regulator-grade audit', d: 'Every API call is hash-chained and anchored hourly. Tamper evidence is provable to an external auditor — no cooperation from us required.', m: 'SOC 2 · CC7 · CC8' },
  { n: '04', t: 'Regionalised data residency', d: 'Pin tenants to EU, US, UK, SG, or AU. Cross-border transfer is opt-in per endpoint, not per account.', m: 'SCC · IDTA · Privacy Shield' },
  { n: '05', t: 'Red-team tested, continuously', d: 'Quarterly external pen tests. Bug bounty with a seven-figure pool. Our detection logic is audited against real-world fraud rings.', m: 'Trail of Bits · HackerOne' },
];

const CERTS = [
  { badge: 'SOC 2',            name: 'Type II audit in progress',    status: 'In progress', color: '#d97706' },
  { badge: 'GDPR',             name: 'Data minimisation · DPA ready', status: 'Ready',       color: '#1d9e75' },
  { badge: 'SHA-256',          name: 'Hashed API key storage',       status: 'Active',      color: '#1d9e75' },
  { badge: 'OFAC',             name: 'Sanctions screening · 18K+',   status: 'Active',      color: '#1d9e75' },
  { badge: 'Audit logs',       name: 'Immutable decision trail',     status: 'Active',      color: '#1d9e75' },
  { badge: 'Secure processing', name: 'Document images destroyed post-decision', status: 'Active', color: '#1d9e75' },
];

function SecuritySection() {
  const mono: React.CSSProperties = { fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' };
  return (
    <section id="security" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
      {/* Section head */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ marginBottom: '64px' }}
      >
        <motion.div
          variants={fadeUp}
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(140px, 15vw, 180px) 1fr',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          <div style={{ ...mono, fontSize: '11px', color: '#5a7268', letterSpacing: '0.06em', textTransform: 'uppercase', paddingTop: '6px' }}>
            S / 06 — Security
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, letterSpacing: '-0.035em', color: '#f0f4f3', lineHeight: 1.1, marginBottom: '16px' }}>
              Designed for the team{' '}
              <em style={{ fontStyle: 'italic', color: '#a3b3ae' }}>whose name is on the filing.</em>
            </h2>
            <p style={{ fontSize: '15px', color: '#a3b3ae', lineHeight: 1.6, maxWidth: '500px' }}>
              We build like your regulator is sitting in the next room. Because eventually, they will be.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Two-col layout: certifications + architecture */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Certifications */}
        <motion.div variants={fadeUp}>
          <div style={{ ...mono, fontSize: '10px', color: '#5a7268', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Certifications</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px' }}>
            {CERTS.map((c) => (
              <div
                key={c.badge}
                style={{
                  background: '#0e1614',
                  border: '1px solid rgba(240,244,243,0.06)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#f0f4f3' }}>{c.badge}</span>
                <span style={{ ...mono, fontSize: '10px', color: '#5a7268' }}>{c.name}</span>
                <span style={{ ...mono, fontSize: '10px', color: c.color, marginTop: '4px' }}>{c.status}</span>
              </div>
            ))}
          </div>
          {/* Security contact callout */}
          <div style={{ padding: '20px', border: '1px solid rgba(240,244,243,0.06)', borderRadius: '8px', background: '#0e1614' }}>
            <div style={{ ...mono, fontSize: '10px', color: '#5a7268', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Security questions</div>
            <p style={{ fontSize: '13px', color: '#a3b3ae', lineHeight: 1.55, marginBottom: '14px' }}>
              Security questionnaires and sub-processor details available on request. No sales call required.
            </p>
            <a href="mailto:support@veridianapi.com" style={{ fontSize: '13px', color: '#1d9e75' }}>support@veridianapi.com →</a>
          </div>
        </motion.div>

        {/* Architecture items */}
        <motion.div variants={fadeUp}>
          <div style={{ ...mono, fontSize: '10px', color: '#5a7268', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Architecture</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {SECURITY_ARCH.map((it, i) => (
              <div
                key={it.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '32px 1fr',
                  gap: '16px',
                  padding: '18px 0',
                  borderBottom: i < SECURITY_ARCH.length - 1 ? '1px solid rgba(240,244,243,0.06)' : 'none',
                }}
              >
                <span style={{ ...mono, fontSize: '11px', color: '#3d544e', paddingTop: '2px' }}>{it.n}</span>
                <div>
                  <h5 style={{ fontSize: '14px', fontWeight: 500, color: '#f0f4f3', marginBottom: '6px' }}>{it.t}</h5>
                  <p style={{ fontSize: '12px', color: '#5a7268', lineHeight: 1.55, marginBottom: '6px' }}>{it.d}</p>
                  <span style={{ ...mono, fontSize: '10px', color: '#3d544e' }}>{it.m}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FAQSection() {
  const mono: React.CSSProperties = { fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' };
  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ marginBottom: '56px' }}
      >
        <motion.div
          variants={fadeUp}
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(140px, 15vw, 180px) 1fr',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          <div style={{ ...mono, fontSize: '11px', color: '#5a7268', letterSpacing: '0.06em', textTransform: 'uppercase', paddingTop: '6px' }}>
            S / 09 — FAQ
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, letterSpacing: '-0.035em', color: '#f0f4f3', lineHeight: 1.1 }}>
              Common questions
            </h2>
          </div>
        </motion.div>
      </motion.div>

      {/* Accordion card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="max-w-3xl mx-auto"
        style={{
          backgroundColor: '#111916',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {FAQ_ITEMS.map((item, i) => (
          <FAQItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            last={i === FAQ_ITEMS.length - 1}
          />
        ))}
      </motion.div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        borderTop: '1px solid rgba(240,244,243,0.06)',
        background: [
          'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(29,158,117,0.12) 0%, transparent 70%)',
          '#050a09',
        ].join(', '),
        padding: '96px 24px',
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <motion.div
          variants={fadeUp}
          style={{
            fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace',
            fontSize: '11px',
            color: '#5a7268',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          S / 08 — Start
        </motion.div>
        <motion.h2
          variants={fadeUp}
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.035em',
            color: '#f0f4f3',
            lineHeight: 1.05,
            marginBottom: '24px',
          }}
        >
          Ship the hard parts{' '}
          <br />
          <em style={{ color: '#1d9e75', fontStyle: 'italic' }}>of fintech</em>{' '}
          in an afternoon.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          style={{ fontSize: '16px', color: '#a3b3ae', lineHeight: 1.65, maxWidth: '480px', margin: '0 auto 12px' }}
        >
          I built Veridian because fintech founders were paying $50K/yr for KYC when the
          technology costs a fraction of that. Try it free for 14 days. If it doesn&apos;t
          work, email me directly.
        </motion.p>
        <motion.p
          variants={fadeUp}
          style={{ fontSize: '13px', fontStyle: 'italic', color: '#5a7268', marginBottom: '40px' }}
        >
          — Kidanemariam, Founder ·{' '}
          <a href="mailto:hello@veridianapi.com" style={{ color: '#5a7268' }}>
            hello@veridianapi.com
          </a>
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={BILLING_URL}
            className="inline-flex items-center justify-center gap-2 font-medium transition-all hover:opacity-90"
            style={{ height: '44px', padding: '0 28px', backgroundColor: '#1d9e75', color: '#050a09', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}
          >
            Start building →
          </Link>
          <Link
            href={`mailto:support@veridianapi.com`}
            className="inline-flex items-center justify-center gap-2 font-medium transition-all"
            style={{ height: '44px', padding: '0 28px', border: '1px solid rgba(240,244,243,0.08)', color: '#a3b3ae', borderRadius: '8px', fontSize: '14px' }}
          >
            Talk to sales
          </Link>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-6 mt-8"
          style={{ fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace', fontSize: '12px', color: '#5a7268' }}
        >
          <span>No credit card</span>
          <span>·</span>
          <span>14-day free trial</span>
          <span>·</span>
          <span>Operational monitoring from day one</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Announcement Bar ─────────────────────────────────────────────────────────

function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('ann-hosted-flow-dismissed') === '1') {
        setVisible(false);
      }
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem('ann-hosted-flow-dismissed', '1');
  };

  if (!visible) return null;

  return (
    <div
      className="flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] relative"
      style={{
        backgroundColor: 'rgba(29,158,117,0.10)',
        borderBottom: '1px solid rgba(29,158,117,0.20)',
      }}
    >
      <span style={{ color: '#a3b3ae' }}>
        🚀 New: Hosted verification flow — no UI to build
      </span>
      <a
        href="https://verify.veridianapi.com"
        className="font-medium underline underline-offset-2 transition-colors hover:text-[#f0f4f3]"
        style={{ color: '#1d9e75' }}
      >
        Try it →
      </a>
      <button
        onClick={dismiss}
        className="absolute right-4 flex items-center justify-center w-5 h-5 rounded transition-colors hover:text-[#f0f4f3]"
        style={{ color: '#5a7268' }}
        aria-label="Dismiss"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <AnnouncementBar />
      <HeroSection />
      <TrustStrip />
      <SimpleIntegrationSection />
      <LiveDemo />
      <BentoFeaturesSection />
      <DashboardPreview />
      <HowItWorksSection />
      <PricingSection />
      <SecuritySection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
