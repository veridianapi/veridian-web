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

// ─── Hero Dashboard Visual ────────────────────────────────────────────────────

type VerifStatus = 'Approved' | 'Review' | 'Rejected';

const HERO_ROWS: { name: string; document: string; status: VerifStatus; risk: number }[] = [
  { name: 'Sarah Chen',     document: 'passport',        status: 'Approved', risk: 12 },
  { name: 'James Okafor',   document: 'driving_licence', status: 'Review',   risk: 45 },
  { name: 'Maria Santos',   document: 'passport',        status: 'Approved', risk: 9  },
  { name: 'Unknown Person', document: 'national_id',     status: 'Rejected', risk: 82 },
  { name: 'Aiko Tanaka',    document: 'passport',        status: 'Approved', risk: 12 },
];

const STATUS_STYLES: Record<VerifStatus, { color: string; bg: string }> = {
  Approved: { color: '#16a34a', bg: 'rgba(22,163,74,0.12)'   },
  Review:   { color: '#d97706', bg: 'rgba(217,119,6,0.12)'   },
  Rejected: { color: '#dc2626', bg: 'rgba(220,38,38,0.12)'   },
};

function riskColor(r: number) {
  return r < 30 ? '#16a34a' : r < 70 ? '#d97706' : '#dc2626';
}

function HeroDashboard() {
  return (
    <div style={{
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(29,158,117,0.1), 0 40px 80px -20px rgba(0,0,0,0.6)',
    }}>
      {/* Browser chrome */}
      <div style={{
        height: '36px',
        background: '#0d1211',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1d9e75' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontFamily: 'monospace', fontSize: '11px', color: '#5a7268' }}>
          app.veridianapi.com/dashboard
        </div>
      </div>

      {/* Dashboard body */}
      <div style={{ display: 'flex', background: '#0a0f0e', height: '420px' }}>
        {/* Sidebar */}
        <div style={{
          width: '200px',
          flexShrink: 0,
          background: '#050a09',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 12px',
        }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4f3', marginBottom: '24px', paddingLeft: '8px' }}>
            <span style={{ color: '#1d9e75' }}>V</span>eridian
          </div>
          {[
            { label: 'Overview',      active: true  },
            { label: 'Verifications', active: false },
            { label: 'API Keys',      active: false },
            { label: 'Billing',       active: false },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: item.active ? '6px' : '8px',
                borderRadius: '6px',
                marginBottom: '2px',
                fontSize: '13px',
                fontWeight: 500,
                color: item.active ? '#1d9e75' : '#5a7268',
                backgroundColor: item.active ? 'rgba(29,158,117,0.10)' : 'transparent',
                borderLeft: item.active ? '2px solid #1d9e75' : '2px solid transparent',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', minWidth: 0 }}>
          <div style={{ fontSize: '16px', fontWeight: 500, color: '#f0f4f3', marginBottom: '16px' }}>Overview</div>

          {/* Metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              { label: 'TOTAL',    value: '1,247' },
              { label: 'APPROVED', value: '1,089' },
              { label: 'REVIEW',   value: '98'    },
              { label: 'REJECTED', value: '60'    },
            ].map((card) => (
              <div key={card.label} style={{
                background: '#111916',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                padding: '12px',
              }}>
                <div style={{ fontSize: '20px', fontWeight: 600, color: '#f0f4f3', fontVariantNumeric: 'tabular-nums' }}>{card.value}</div>
                <div style={{ fontSize: '10px', fontWeight: 500, color: '#5a7268', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{card.label}</div>
              </div>
            ))}
          </div>

          {/* Table label */}
          <div style={{ fontSize: '11px', fontWeight: 500, color: '#5a7268', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Recent Verifications
          </div>

          {/* Table */}
          <div style={{ background: '#111916', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr>
                  {['Name', 'Document', 'Status', 'Risk'].map((col) => (
                    <th key={col} style={{
                      padding: '8px 12px', textAlign: 'left',
                      fontSize: '10px', fontWeight: 500, color: '#5a7268',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HERO_ROWS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < HERO_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding: '8px 12px', color: '#f0f4f3', fontWeight: 500, whiteSpace: 'nowrap' }}>{row.name}</td>
                    <td style={{ padding: '8px 12px', color: '#5a7268', fontFamily: 'monospace', fontSize: '11px', whiteSpace: 'nowrap' }}>{row.document}</td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center',
                        padding: '2px 6px', borderRadius: '9999px',
                        fontSize: '10px', fontWeight: 500,
                        color: STATUS_STYLES[row.status].color,
                        backgroundColor: STATUS_STYLES[row.status].bg,
                      }}>{row.status}</span>
                    </td>
                    <td style={{ padding: '8px 12px', color: riskColor(row.risk), fontFamily: 'monospace', fontSize: '11px', fontVariantNumeric: 'tabular-nums' }}>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

          {/* Hero dashboard visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            suppressHydrationWarning
            className="w-full"
            style={{ marginTop: '64px' }}
          >
            <HeroDashboard />
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
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-12"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>Integration</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold"
          style={{ color: '#f0f4f3', letterSpacing: '-0.64px' }}
        >
          Integrate in minutes, not weeks.
        </motion.h2>
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

// ─── Social Proof Bar ─────────────────────────────────────────────────────────

// SocialProofBar removed — no logos available

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
        className="text-center mb-16"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>Features</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: '#f0f4f3', letterSpacing: '-0.64px' }}
        >
          Everything compliance requires. Nothing it doesn&apos;t.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg max-w-xl mx-auto"
          style={{ color: '#a3b3ae' }}
        >
          Built for fintech teams done stitching together five vendors.
        </motion.p>
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
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>How it works</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-semibold mb-4"
            style={{ color: '#f0f4f3', letterSpacing: '-0.64px' }}
          >
            Integrate in 15 minutes
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg max-w-lg mx-auto"
            style={{ color: '#a3b3ae' }}
          >
            From zero to live KYC verifications in an afternoon.
          </motion.p>
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
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-16"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>Pricing</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: '#f0f4f3', letterSpacing: '-0.64px' }}
        >
          Simple, transparent pricing
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg max-w-md mx-auto mb-3"
          style={{ color: '#a3b3ae' }}
        >
          No setup fees. No per-seat pricing. Cancel anytime.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="text-sm italic"
          style={{ color: '#a3b3ae' }}
        >
          Persona starts at $50K/yr. We start at $199/mo.
        </motion.p>
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

function SecuritySection() {
  return (
    <section id="security" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-12"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>Security</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: '#f0f4f3', letterSpacing: '-0.64px' }}
        >
          Enterprise-grade security
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg max-w-xl mx-auto"
          style={{ color: '#a3b3ae' }}
        >
          Built for regulated industries from day one.
        </motion.p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="grid sm:grid-cols-2 gap-4"
      >
        {SECURITY_CARDS.map((card) => (
          <motion.div
            key={card.title}
            variants={fadeUp}
            style={{
              backgroundColor: '#111916',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center mb-4"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(29, 158, 117, 0.15)',
              }}
            >
              {card.icon}
            </div>
            <h3
              className="text-base font-semibold mb-2"
              style={{ color: '#f0f4f3' }}
            >
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#a3b3ae' }}>
              {card.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-12"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>FAQ</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: '#f0f4f3', letterSpacing: '-0.64px' }}
        >
          Common questions
        </motion.h2>
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
      className="relative py-24 overflow-hidden cta-glow"
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="relative max-w-2xl mx-auto px-6 text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold mb-6"
          style={{ color: '#f0f4f3', letterSpacing: '-0.64px' }}
        >
          Built by a developer,{' '}
          <span className="gradient-text">for developers.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg mb-4 max-w-xl mx-auto"
          style={{ color: '#a3b3ae', lineHeight: '1.7' }}
        >
          I built Veridian because fintech founders were paying $50K/yr for KYC when the
          technology costs a fraction of that. Try it free for 14 days. If it doesn&apos;t
          work, email me directly.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="text-sm italic mb-10"
          style={{ color: '#a3b3ae' }}
        >
          — Kidanemariam, Founder ·{' '}
          <a
            href="mailto:hello@veridianapi.com"
            className="transition-colors hover:text-[#f0f4f3]"
            style={{ color: '#a3b3ae' }}
          >
            hello@veridianapi.com
          </a>
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={BILLING_URL}
            className="inline-flex items-center justify-center gap-2 font-medium px-8 h-11 sm:h-9 rounded-lg text-[13px] transition-all"
            style={{ backgroundColor: 'var(--brand)', color: '#050a09' }}
          >
            Start your free trial →
          </Link>
          <Link
            href={DOCS_URL}
            className="inline-flex items-center justify-center gap-2 font-medium px-8 h-11 sm:h-9 rounded-lg text-[13px] transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#a3b3ae' }}
          >
            Read the docs
          </Link>
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
