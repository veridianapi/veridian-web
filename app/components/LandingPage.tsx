'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import Link from 'next/link';

const SIGNUP_URL = "https://app.veridianapi.com/login?next=/dashboard/billing";
const DOCS_URL = "/docs";
const SALES_EMAIL = "mailto:support@veridianapi.com";

// ─── Icon ────────────────────────────────────────────────────────────────────

function Icon({ name, size = 16, stroke = 1.5, className = '' }: { name: string; size?: number; stroke?: number; className?: string }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className };
  switch (name) {
    case "graph": return <svg {...p}><path d="M4 20V4M4 20h16M7 16l4-4 3 3 5-7"/></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    case "copy": return <svg {...p}><rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V4H4v12h4"/></svg>;
    default: return null;
  }
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const CONSOLE_ROWS = [
  { t: "14:32:08", ev: "identity.verified",     country: "DE · Berlin",    risk: "0.08", status: "ok",   label: "PASS" },
  { t: "14:32:06", ev: "transaction.screened",  country: "US · NY",        risk: "0.12", status: "ok",   label: "PASS" },
  { t: "14:32:04", ev: "sanction.hit.ofac",      country: "CY · Limassol", risk: "0.94", status: "err",  label: "BLOCK" },
  { t: "14:32:01", ev: "kyb.ubo.verified",       country: "GB · London",   risk: "0.21", status: "ok",   label: "PASS" },
  { t: "14:31:58", ev: "pep.match.review",       country: "AE · Dubai",    risk: "0.61", status: "warn", label: "REVIEW" },
  { t: "14:31:55", ev: "transaction.screened",  country: "SG · Central",   risk: "0.09", status: "ok",   label: "PASS" },
  { t: "14:31:52", ev: "identity.verified",     country: "FR · Paris",     risk: "0.14", status: "ok",   label: "PASS" },
  { t: "14:31:49", ev: "kyc.document.ocr",       country: "BR · São Paulo", risk: "0.18", status: "ok",  label: "PASS" },
];

const QUEUE_HEIGHTS = [6, 8, 5, 9, 12, 7, 10, 14, 8, 6, 9, 11, 7, 5, 8, 10, 13, 9, 6, 8, 11, 7, 9, 12];

type ConsoleRowData = {
  id: number; t: string; ev: string; country: string;
  risk: string; status: string; label: string; isNew: boolean;
};

const BASE_CONSOLE_ROWS: ConsoleRowData[] = CONSOLE_ROWS.map((r, i) => ({ ...r, id: i, isNew: false }));

const ANIMATED_EVENTS: Omit<ConsoleRowData, 'id' | 'isNew'>[] = [
  { t: "14:32:10", ev: "identity.verified",    country: "SN · Dakar",    risk: "0.08", status: "ok",   label: "PASS"   },
  { t: "14:32:09", ev: "identity.verified",    country: "CN · Shanghai", risk: "0.14", status: "ok",   label: "PASS"   },
  { t: "14:32:08", ev: "pep.match.review",     country: "MX · CDMX",    risk: "0.52", status: "warn", label: "REVIEW" },
  { t: "14:32:07", ev: "identity.verified",    country: "NG · Lagos",    risk: "0.06", status: "ok",   label: "PASS"   },
  { t: "14:32:06", ev: "sanction.hit.ofac",    country: "US · Miami",    risk: "0.91", status: "err",  label: "BLOCK"  },
];

function Hero() {
  const [rows, setRows] = useState<ConsoleRowData[]>(BASE_CONSOLE_ROWS);
  const eventIdxRef = useRef(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      const src = ANIMATED_EVENTS[eventIdxRef.current % ANIMATED_EVENTS.length];
      eventIdxRef.current++;
      const rowId = Date.now();
      setRows(prev => [{ ...src, id: rowId, isNew: true }, ...prev].slice(0, 5));
      setTimeout(() => {
        setRows(prev => prev.map(r => r.id === rowId ? { ...r, isNew: false } : r));
      }, 350);
    }, 3000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <h1 className="hero-h1">
          KYC without the<br/>
          <span className="accent">enterprise drag.</span>
        </h1>
        <p className="hero-sub">
          Identity verification, OFAC screening, and AML risk scoring through one REST API. Launch compliant onboarding in minutes — no sales call, no annual contract.
        </p>
        <ul className="hero-benefits">
          <li className="hero-benefit">API key in 90 seconds — no approval</li>
          <li className="hero-benefit">OFAC + 140 watchlists on every call</li>
          <li className="hero-benefit">14-day free trial, no credit card</li>
        </ul>
        <div className="hero-cta-row">
          <Link href={SIGNUP_URL} className="btn btn-primary">Get your API key — free <span className="arrow">→</span></Link>
          <Link href={DOCS_URL} className="btn btn-ghost">View docs</Link>
        </div>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">Uptime</span>
            <span className="hero-meta-val">99.9%</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Median</span>
            <span className="hero-meta-val">47ms</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Jurisdictions</span>
            <span className="hero-meta-val">212</span>
          </div>
        </div>

        <div className="hero-console">
          <div className="console">
            <div className="console-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="console-dots"><span/><span/><span/></div>
                <span className="console-title">veridian / live · acme-payments</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
                <span className="live-dot"/>streaming · eu-central-1
              </span>
            </div>
            <div className="console-body">
              <div className="console-main">
                <div className="console-rows">
                  {rows.map((r) => (
                    <div className={`console-row${r.isNew ? ' console-row-new' : ''}`} key={r.id}>
                      <span className="r-time">{r.t}</span>
                      <span className="r-ev">{r.ev}</span>
                      <span className="r-country">{r.country}</span>
                      <span className="r-risk" style={{ color: r.status === 'err' ? 'var(--red)' : r.status === 'warn' ? 'var(--amber)' : 'var(--text-2)' }}>
                        risk {r.risk}
                      </span>
                      <span className="r-status">
                        <span className={`pill ${r.status === 'err' ? 'pill-err' : r.status === 'warn' ? 'pill-warn' : 'pill-ok'}`}>{r.label}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <aside className="console-side-r">
                <div className="mini-metric">
                  <span className="mini-metric-label">Events / sec</span>
                  <span className="mini-metric-val">2,143<span className="suffix">rps</span></span>
                  <svg className="sparkline" viewBox="0 0 200 52" preserveAspectRatio="none">
                    <path d="M0,40 L15,34 L30,38 L45,28 L60,30 L75,22 L90,26 L105,18 L120,22 L135,14 L150,18 L165,10 L180,14 L200,8" stroke="#1d9e75" strokeWidth="1.25" fill="none"/>
                    <path d="M0,40 L15,34 L30,38 L45,28 L60,30 L75,22 L90,26 L105,18 L120,22 L135,14 L150,18 L165,10 L180,14 L200,8 L200,52 L0,52 Z" fill="url(#sparkGrad)"/>
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#1d9e75" stopOpacity="0.3"/>
                        <stop offset="1" stopColor="#1d9e75" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="mini-metric">
                  <span className="mini-metric-label">P50 · p99 latency</span>
                  <span className="mini-metric-val">47<span className="suffix">/ 112 ms</span></span>
                </div>
                <div className="mini-metric">
                  <span className="mini-metric-label">Block rate · 24h</span>
                  <span className="mini-metric-val">0.41<span className="suffix">%</span></span>
                </div>
                <div className="mini-metric">
                  <span className="mini-metric-label">Queue depth</span>
                  <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
                    {QUEUE_HEIGHTS.map((h, i) => (
                      <div key={i} style={{ width: 6, height: h * 2, background: 'var(--green)', opacity: 0.3 + h / 20 }}/>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
            <div className="console-footer">
              <span>wss://api.veridianapi.com/v3/stream</span>
              <span>streaming · lag 3ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust strip ──────────────────────────────────────────────────────────────

const CREDIBILITY_ITEMS = [
  "Live API",
  "OFAC database loaded",
  "Hosted KYC flow",
  "Paddle billing active",
  "14-day free trial",
  "Full documentation",
];

function TrustStrip() {
  return (
    <section className="trust">
      <div className="wrap trust-inner">
        <div className="trust-label">What&apos;s live<br/>and ready to use.</div>
        <div className="trust-logos">
          {CREDIBILITY_ITEMS.map((item, i) => (
            <div className="trust-logo" key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span className="live-dot"/>{item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── API Demo ─────────────────────────────────────────────────────────────────

const ENDPOINTS = [
  { id: "verify",  method: "POST", path: "/v3/identity/verify",       desc: "Run KYC against 9,200 document types in 212 jurisdictions." },
  { id: "screen",  method: "POST", path: "/v3/sanctions/screen",      desc: "Screen against OFAC, EU, UN, HMT, and 140+ watchlists." },
  { id: "monitor", method: "POST", path: "/v3/transactions/monitor",  desc: "Real-time rules engine. Block, review, or approve in <50ms." },
  { id: "kyb",     method: "POST", path: "/v3/business/verify",       desc: "KYB with UBO graph resolution and corporate registry lookups." },
  { id: "case",    method: "GET",  path: "/v3/cases/:id",             desc: "Investigator-grade audit trail with immutable evidence chains." },
];

type LangId = 'node' | 'python' | 'curl';

type CodeLine = [string, ReactNode];

const CODE_SAMPLES: Record<string, Record<LangId, CodeLine[]>> = {
  verify: {
    node: [
      ['1',  <><span className="tok-k">import</span>{' '}{'{ Veridian }'}{' '}<span className="tok-k">from</span>{' '}<span className="tok-s">&quot;@veridian/sdk&quot;</span>;</>],
      ['2',  <></>],
      ['3',  <><span className="tok-k">const</span>{' '}<span className="tok-p">v</span>{' = '}<span className="tok-k">new</span>{' '}<span className="tok-f">Veridian</span>(process.env.<span className="tok-p">VERIDIAN_KEY</span>);</>],
      ['4',  <></>],
      ['5',  <><span className="tok-k">const</span>{' '}result{' = '}<span className="tok-k">await</span>{' '}v.identity.<span className="tok-f">verify</span>{'({'}</>],
      ['6',  <>{'  '}<span className="tok-m">subject</span>{': {' }</>],
      ['7',  <>{'    '}<span className="tok-m">firstName</span>{': '}<span className="tok-s">&quot;Amara&quot;</span>,</>],
      ['8',  <>{'    '}<span className="tok-m">lastName</span>{': '}<span className="tok-s">&quot;Okafor&quot;</span>,</>],
      ['9',  <>{'    '}<span className="tok-m">dateOfBirth</span>{': '}<span className="tok-s">&quot;1991-04-12&quot;</span>,</>],
      ['10', <>{'    '}<span className="tok-m">country</span>{': '}<span className="tok-s">&quot;NG&quot;</span>,</>],
      ['11', <>{'  '}{'}'},{' '}</>],
      ['12', <>{'  '}<span className="tok-m">document</span>{': { '}<span className="tok-m">type</span>{': '}<span className="tok-s">&quot;passport&quot;</span>{', '}<span className="tok-m">file</span>{': buffer },'}</>],
      ['13', <>{'  '}<span className="tok-m">liveness</span>{': '}<span className="tok-n">true</span>,</>],
      ['14', <>{'  '}<span className="tok-m">riskProfile</span>{': '}<span className="tok-s">&quot;standard&quot;</span>,</>],
      ['15', <>{'});'}</>],
      ['16', <></>],
      ['17', <><span className="tok-c">{'// result.decision ⇒ "approve" | "review" | "reject"'}</span></>],
    ],
    python: [
      ['1', <><span className="tok-k">from</span>{' '}veridian{' '}<span className="tok-k">import</span>{' '}Veridian</>],
      ['2', <></>],
      ['3', <>v{' = '}<span className="tok-f">Veridian</span>(os.environ[<span className="tok-s">&quot;VERIDIAN_KEY&quot;</span>])</>],
      ['4', <></>],
      ['5', <>result{' = '}v.identity.<span className="tok-f">verify</span>(</>],
      ['6', <>{'    '}subject=Subject(first=<span className="tok-s">&quot;Amara&quot;</span>, last=<span className="tok-s">&quot;Okafor&quot;</span>),</>],
      ['7', <>{'    '}document=Document.<span className="tok-f">from_file</span>(<span className="tok-s">&quot;passport.jpg&quot;</span>),</>],
      ['8', <>{'    '}liveness=<span className="tok-n">True</span>,</>],
      ['9', <>)</>],
    ],
    curl: [
      ['1', <><span className="tok-f">curl</span>{' '}<span className="tok-s">https://api.veridianapi.com/v3/identity/verify</span>{' \\'}</>],
      ['2', <>{'  '}-H{' '}<span className="tok-s">&quot;Authorization: Bearer $VERIDIAN_KEY&quot;</span>{' \\'}</>],
      ['3', <>{'  '}-H{' '}<span className="tok-s">&quot;Content-Type: application/json&quot;</span>{' \\'}</>],
      ['4', <>{'  '}-d{' '}<span className="tok-s">&apos;{'{"subject":{"firstName":"Amara"}}'}&apos;</span></>],
    ],
  },
};

const RESPONSE_LINES = [
  '{',
  '  "id": "ver_4kT9aQxXm2p",',
  '  "decision": "approve",',
  '  "score": 0.0842,',
  '  "checks": {',
  '    "document.authenticity": "pass",',
  '    "face.match":            "pass · 0.971",',
  '    "liveness":              "pass",',
  '    "sanctions":             "pass · 142 lists",',
  '    "pep":                   "pass",',
  '    "adverse_media":         "pass"',
  '  },',
  '  "jurisdiction": "NG",',
  '  "latency_ms": 312,',
  '  "evidence_chain": "sha256:a7f…c81",',
  '  "expires_at": "2027-04-24T14:32:08Z"',
  '}',
];

function ApiDemo() {
  const [active, setActive] = useState("verify");
  const [lang, setLang] = useState<LangId>("node");
  const sample = CODE_SAMPLES[active] ?? CODE_SAMPLES.verify;
  const lines = sample[lang] ?? sample.node;

  return (
    <section className="section" id="api">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">S / 03 — API</div>
          <div>
            <h2 className="section-title">
              Five endpoints. <em>Every compliance decision<br/>your fintech will ever make.</em>
            </h2>
            <p className="section-sub">TypeScript, Python, Go, Ruby, PHP, and Java SDKs. Webhooks with exactly-once delivery. A sandbox that mirrors production risk scoring — no surprises when you go live.</p>
          </div>
        </div>

        <div className="api-demo">
          <div className="api-endpoints">
            {ENDPOINTS.map(e => (
              <div
                key={e.id}
                className={`api-endpoint${active === e.id ? ' active' : ''}`}
                onClick={() => setActive(e.id)}
              >
                <div className="api-endpoint-top">
                  <span className={`api-method${e.method === 'POST' ? ' post' : ''}`}>{e.method}</span>
                  <span className="api-path">{e.path}</span>
                </div>
                <span className="api-desc">{e.desc}</span>
              </div>
            ))}
            <div style={{ padding: '20px 0 0 20px', marginTop: 'auto' }}>
              <Link href={DOCS_URL} className="btn-link">View full reference <span className="arrow">→</span></Link>
            </div>
          </div>

          <div className="code-panel">
            <div className="code-tabs">
              {(['node', 'python', 'curl'] as LangId[]).map(l => (
                <div key={l} className={`code-tab${lang === l ? ' active' : ''}`} onClick={() => setLang(l)}>
                  {l === 'node' ? 'TypeScript' : l === 'python' ? 'Python' : 'cURL'}
                </div>
              ))}
              <div className="code-tab-r">
                <Icon name="copy" size={12}/> Copy
              </div>
            </div>
            <div className="code-body">
              {lines.map(([n, content], i) => (
                <div key={i}><span className="ln">{n}</span>{content}</div>
              ))}
            </div>
            <div className="response-panel">
              <div className="response-head">
                <span className="status">200 OK</span>
                <span>312 ms</span>
                <span>sha256 · evidence</span>
                <span style={{ marginLeft: 'auto' }}>response</span>
              </div>
              <div className="response-body">
                {RESPONSE_LINES.map((l, i) => (
                  <div key={i} style={{ whiteSpace: 'pre' }}>{l}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

const AUDIT_CHAIN = [
  { l: "request",    h: "sha256:a7f…c81" },
  { l: "document",   h: "sha256:3d2…b09" },
  { l: "biometric",  h: "sha256:e81…4fa" },
  { l: "screen.ofac", h: "sha256:12c…7e3" },
  { l: "decision",   h: "sha256:9bb…a14" },
];

const LATENCY_BARS = [18,22,20,24,28,22,26,30,24,28,32,26,28,22,26,30,24,28,22,26,20,24,22,26,20,24,28,22,26,30,24,28,22,26,20,24];

function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">S / 05 — Capabilities</div>
          <div>
            <h2 className="section-title">
              Every compliance primitive,<br/><em>composable and individually priced.</em>
            </h2>
            <p className="section-sub">Use all five endpoints or just one. Drop Veridian&apos;s rules engine into your existing KYC stack without a migration. Infrastructure — not a platform lock-in.</p>
          </div>
        </div>

        <div className="bento">
          {/* 1: Rules engine — large */}
          <div className="bento-cell bc-1">
            <div className="b-eyebrow">Rules engine</div>
            <h4>Author compliance logic the way your engineers author code.</h4>
            <p>Version-controlled rules, shadow mode, gradual rollout. Any analyst can write a rule. Any engineer can review the diff.</p>
            <div style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.8, color: 'var(--text-2)', background: '#080d0c', border: '1px solid var(--line)', borderRadius: 8, padding: '18px 20px' }}>
              <div style={{ color: 'var(--text-3)' }}><span style={{ color: 'var(--text-4)' }}>01</span>{'  '}rule <span style={{ color: '#c68cef' }}>velocity_structuring</span>{' {'}</div>
              <div style={{ color: 'var(--text-3)' }}><span style={{ color: 'var(--text-4)' }}>02</span>{'    '}when <span style={{ color: '#7ecf97' }}>txn.amount</span> &lt; 10000 and</div>
              <div style={{ color: 'var(--text-3)' }}><span style={{ color: 'var(--text-4)' }}>03</span>{'         '}<span style={{ color: '#7ecf97' }}>count(user, &apos;1h&apos;)</span> &gt; 4</div>
              <div style={{ color: 'var(--text-3)' }}><span style={{ color: 'var(--text-4)' }}>04</span>{'    '}then <span style={{ color: '#d4a24a' }}>flag</span>(<span style={{ color: '#7ecf97' }}>&quot;structuring&quot;</span>, 0.72)</div>
              <div style={{ color: 'var(--text-3)' }}><span style={{ color: 'var(--text-4)' }}>05</span>{'  '}{'}'}<span style={{ color: 'var(--text-4)', fontStyle: 'italic' }}>{'  // shadow · 3 days · 0.02% fp'}</span></div>
            </div>
          </div>

          {/* 2: Global coverage */}
          <div className="bento-cell bc-2">
            <div className="b-eyebrow">Coverage</div>
            <h4>212 jurisdictions. 9,200 document types.</h4>
            <p>Local identity schemes, national registries, and language-aware OCR — maintained by regional compliance teams, not a vendor map.</p>
            <div style={{ position: 'absolute', right: -20, top: 30, display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 4, width: 220, opacity: 0.6 }}>
              {Array.from({ length: 56 }).map((_, i) => (
                <div key={i} style={{ width: 18, height: 18, border: '1px solid var(--line-2)', background: [3,5,11,14,19,22,27,30,35,38,43,46,51].includes(i) ? 'var(--green)' : 'transparent', opacity: [3,5,11,14,19,22,27,30].includes(i) ? 0.8 : 0.4 }}/>
              ))}
            </div>
          </div>

          {/* 3: Latency */}
          <div className="bento-cell bc-3">
            <div className="b-eyebrow">Performance</div>
            <h4>47ms median. 112ms p99.</h4>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', gap: 3, height: 40 }}>
              {LATENCY_BARS.map((h, i) => (
                <div key={i} style={{ flex: 1, height: h + 'px', background: 'var(--green)', opacity: 0.4 + i / 50 }}/>
              ))}
            </div>
          </div>

          {/* 4: Webhooks */}
          <div className="bento-cell bc-4">
            <div className="b-eyebrow">Webhooks</div>
            <h4>Exactly once.</h4>
            <p style={{ fontSize: 12.5 }}>Guaranteed ordering, signed payloads, replay log.</p>
          </div>

          {/* 5: Evidence chain — tall */}
          <div className="bento-cell bc-5">
            <div className="b-eyebrow">Audit</div>
            <h4>Every decision is a cryptographic artifact.</h4>
            <p>Immutable evidence chains. Exportable in regulator-friendly formats. Your audit trail is the product, not a feature.</p>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>
              {AUDIT_CHAIN.map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '16px 80px 1fr', gap: 10, alignItems: 'center', paddingBottom: 8, borderBottom: '1px dashed rgba(26,35,32,0.8)' }}>
                  <span style={{ color: 'var(--green)' }}>→</span>
                  <span style={{ color: 'var(--text-3)' }}>{r.l}</span>
                  <span>{r.h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6: Adverse media */}
          <div className="bento-cell bc-6">
            <div className="b-eyebrow">Adverse media</div>
            <h4>Multilingual NLP, scored and sourced.</h4>
            <p>140+ languages. Every hit comes with a citation, a score, and a human-readable rationale.</p>
          </div>

          {/* 7: Migration */}
          <div className="bento-cell bc-7">
            <div className="b-eyebrow">Migrate · 48h</div>
            <h4>Drop-in for Alloy, Persona, Sardine.</h4>
            <p>Response shapes match out of the box. Run us in shadow first; flip the feature flag when you&apos;re ready.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Security ─────────────────────────────────────────────────────────────────

const SEC_ITEMS = [
  { n: "01", t: "Tenant-isolated key management",     d: "Per-tenant KMS with hardware-backed key derivation. Keys never leave the enclave. BYOK supported for regulated environments.", m: "AWS KMS · HSM FIPS 140-3" },
  { n: "02", t: "Zero-retention processing paths",    d: "PII is hashed at the edge. Document images are destroyed after decisioning unless explicitly retained under a documented lawful basis.", m: "GDPR Art. 5 · 17 · 32" },
  { n: "03", t: "Immutable, regulator-grade audit",   d: "Every API call is hash-chained and anchored hourly. Tamper evidence is provable to an external auditor — no cooperation from us required.", m: "SOC 2 · CC7 · CC8" },
  { n: "04", t: "Regionalised data residency",        d: "Pin tenants to EU, US, UK, SG, or AU. Cross-border transfer is opt-in per endpoint, not per account.", m: "SCC · IDTA · Privacy Shield" },
  { n: "05", t: "Responsible disclosure policy",      d: "We maintain a public security policy and accept responsible disclosure reports. Security architecture documentation available on request.", m: "security@veridianapi.com" },
];

function Security() {
  return (
    <section className="section" id="security">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">S / 06 — Security</div>
          <div>
            <h2 className="section-title">
              Designed for the team<br/><em>whose name is on the filing.</em>
            </h2>
            <p className="section-sub">We build like your regulator is sitting in the next room. Because eventually, they will be.</p>
          </div>
        </div>

        <div className="sec-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>Compliance status</div>
            <div className="cert-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div className="cert">
                <span className="cert-badge">SOC 2</span>
                <span className="cert-name">Type II · in progress</span>
                <span className="cert-status" style={{ color: 'var(--amber)' }}>In progress</span>
              </div>
              <div className="cert">
                <span className="cert-badge">GDPR</span>
                <span className="cert-name">Privacy-ready workflows</span>
                <span className="cert-status">Ready</span>
              </div>
            </div>

            <div style={{ marginTop: 40, padding: 24, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, background: '#111916' }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Security contact</div>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 18 }}>Security architecture documentation and responsible disclosure policy available on request. No sales call required.</p>
              <a href="mailto:security@veridianapi.com" className="btn-link">Contact security team <span className="arrow">→</span></a>
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>Architecture</div>
            <div className="sec-list">
              {SEC_ITEMS.map((it, i) => (
                <div className="sec-item" key={i}>
                  <span className="sec-num">{it.n}</span>
                  <div>
                    <h5>{it.t}</h5>
                    <p>{it.d}</p>
                  </div>
                  <span className="sec-meta">{it.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">S / 07 — Pricing</div>
          <div>
            <h2 className="section-title">
              Simple monthly pricing.<br/><em>14-day free trial on all plans.</em>
            </h2>
            <p className="section-sub">No per-seat fees. No annual contract. Cancel any time. Start with a free trial — no credit card required.</p>
          </div>
        </div>

        <div className="pricing-grid">
          <div className="price-card">
            <div>
              <div className="price-name">Starter</div>
              <p className="price-desc" style={{ marginTop: 10 }}>For teams building their first compliance integration. Everything you need to go live.</p>
            </div>
            <div className="price-amt">$199<span className="unit">/mo</span></div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>14-day free trial · no credit card required</div>
            <Link href={SIGNUP_URL} className="btn btn-ghost" style={{ justifyContent: 'center' }}>Start free trial <span className="arrow">→</span></Link>
            <ul className="price-features">
              <li>Identity verification (KYC)</li>
              <li>OFAC + 140 watchlist screening</li>
              <li>Hosted KYC flow</li>
              <li>Full API access + sandbox</li>
              <li>Webhook delivery</li>
              <li>Email support</li>
            </ul>
          </div>

          <div className="price-card featured">
            <div>
              <div className="price-name">Growth</div>
              <p className="price-desc" style={{ marginTop: 10 }}>For fintechs scaling onboarding. Adds AML monitoring and business verification.</p>
            </div>
            <div className="price-amt">$499<span className="unit">/mo</span></div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>14-day free trial · no credit card required</div>
            <Link href={SIGNUP_URL} className="btn btn-primary" style={{ justifyContent: 'center' }}>Start free trial <span className="arrow">→</span></Link>
            <ul className="price-features">
              <li>Everything in Starter</li>
              <li>AML transaction monitoring</li>
              <li>KYB business verification</li>
              <li>Operations case queue</li>
              <li>Audit log exports</li>
              <li>Priority email support</li>
            </ul>
          </div>

          <div className="price-card">
            <div>
              <div className="price-name">Scale</div>
              <p className="price-desc" style={{ marginTop: 10 }}>For regulated fintechs with complex compliance requirements and higher volumes.</p>
            </div>
            <div className="price-amt">$999<span className="unit">/mo</span></div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>14-day free trial · no credit card required</div>
            <Link href={SIGNUP_URL} className="btn btn-ghost" style={{ justifyContent: 'center' }}>Start free trial <span className="arrow">→</span></Link>
            <ul className="price-features">
              <li>Everything in Growth</li>
              <li>Custom compliance rules engine</li>
              <li>GDPR-ready data retention controls</li>
              <li>Dedicated onboarding support</li>
              <li>Higher API rate limits</li>
              <li>SOC 2 documentation when available</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 32, padding: '24px 28px', border: '1px solid var(--line)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' }}>Not sure which plan fits?</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>All plans include a 14-day free trial. Start building and upgrade when you&apos;re ready.</div>
          </div>
          <a href={SALES_EMAIL} className="btn-link">Questions? Contact us <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function Cta() {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div className="eyebrow" style={{ marginBottom: 32 }}>S / 08 — Start</div>
        <h2>
          One afternoon.<br/>
          <span className="accent">Your compliance layer, done.</span>
        </h2>
        <p>Production API key in 90 seconds. First live verification in under 15 minutes. No sales call. No contract review.</p>
        <div className="cta-row">
          <Link href={SIGNUP_URL} className="btn btn-primary">Start building <span className="arrow">→</span></Link>
          <a href={SALES_EMAIL} className="btn btn-ghost">Talk to sales</a>
        </div>
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Features />
      <Security />
      <Pricing />
      <Cta />
    </>
  );
}
