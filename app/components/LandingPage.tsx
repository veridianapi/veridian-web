'use client';

/**
 * Veridian Terminal — LandingPage.tsx
 * Next.js client component.
 *
 * Drop-in replacement for the existing LandingPage.tsx.
 * Requires:
 *   - LandingPage.module.css (sibling file)
 *   - Google Fonts in <head> or next/font (Inter Tight + JetBrains Mono)
 *
 * All CTAs link to https://app.veridianapi.com
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import s from './LandingPage.module.css';

/* ─────────────────────────────────────────────────────────────────────────
   GLOBAL CSS VARS — injected once at root so module classes can use them
──────────────────────────────────────────────────────────────────────── */
const GLOBAL_STYLE = `
  :root {
    --vd-bg:     #050a09;
    --vd-bg-2:   #070d0c;
    --vd-text:   #e8efed;
    --vd-text-2: #9aaba6;
    --vd-text-3: #5e706b;
    --vd-text-4: #384541;
    --vd-teal:   #1d9e75;
    --vd-teal-2: #2dc590;
    --vd-teal-3: #3fdfa6;
    --vd-mono:   'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    --vd-sans:   'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--vd-bg);
    color: var(--vd-text);
    font-family: var(--vd-sans);
    font-weight: 400;
    line-height: 1.5;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    letter-spacing: -0.005em;
  }
  a { color: inherit; text-decoration: none; }
  button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
  ::selection { background: rgba(45,197,144,0.25); color: var(--vd-text); }

  /* ambient teal glow behind everything */
  body::before {
    content: "";
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 1200px 800px at 15% -10%, rgba(29,158,117,0.06), transparent 60%),
      radial-gradient(ellipse 800px 600px at 85% 110%, rgba(29,158,117,0.04), transparent 60%);
  }
  /* faint dot grid */
  body::after {
    content: "";
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.4;
    background-image:
      linear-gradient(to right,  rgba(255,255,255,0.012) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.012) 1px, transparent 1px);
    background-size: 96px 96px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, #000 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, #000 20%, transparent 80%);
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   HOOKS
──────────────────────────────────────────────────────────────────────── */

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

interface TypewriterOpts {
  speed?: number;
  lineDelay?: number;
}
function useTypewriter(lines: string[], opts: TypewriterOpts = {}) {
  const [output, setOutput] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);
  const { speed = 16, lineDelay = 220 } = opts;

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      let lineIdx = 0;
      let charIdx = 0;
      const buffer = lines.map(() => '');
      const tick = () => {
        if (cancelled) return;
        if (lineIdx >= lines.length) { setDone(true); return; }
        const cur = lines[lineIdx];
        if (charIdx <= cur.length) {
          buffer[lineIdx] = cur.slice(0, charIdx);
          setOutput([...buffer]);
          charIdx++;
          setTimeout(tick, speed);
        } else {
          lineIdx++;
          charIdx = 0;
          setTimeout(tick, lineDelay);
        }
      };
      tick();
    };

    const el = elRef.current;
    if (!el) { start(); return () => { cancelled = true; }; }
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { start(); io.disconnect(); } }); },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => { cancelled = true; io.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { output, done, elRef };
}

/* ─────────────────────────────────────────────────────────────────────────
   ICONS
──────────────────────────────────────────────────────────────────────── */
function Icon({ name, size = 16, color }: { name: string; size?: number; color?: string }) {
  const p: React.SVGProps<SVGSVGElement> = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color ?? 'currentColor', strokeWidth: 1.5,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'arrow':    return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'check':   return <svg {...p}><path d="M5 12l4 4L19 6"/></svg>;
    case 'globe':   return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'bolt':    return <svg {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>;
    case 'webhook': return <svg {...p}><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="12" cy="6" r="2.5"/><path d="M10.5 8L7.5 15.5M13.5 8L17 15.5M8.5 18h7"/></svg>;
    case 'shield':  return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'code':    return <svg {...p}><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>;
    case 'terminal':return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>;
    default:        return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   NAV
──────────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className={s.nav}>
      <div className={s.navShell}>
        <div className={s.navInner}>
          <a href="/" className={s.logo}>
            <span className={s.logoMark} />
            <span>Veridian</span>
            <span style={{ fontFamily: 'var(--vd-mono)', fontSize: 11, color: 'var(--vd-text-3)', marginLeft: 2, letterSpacing: 0.6 }}>/terminal</span>
          </a>
          <div className={s.navLinks}>
            {[['#capabilities','Capabilities'],['#api','API'],['#security','Security'],['#pricing','Pricing'],['#docs','Docs']].map(([href,label]) => (
              <a key={href} href={href} className={s.navLink}>{label}</a>
            ))}
          </div>
          <div className={s.navCta}>
            <a href="https://app.veridianapi.com/login" className={`${s.btn} ${s.btnLink} ${s.navMini}`}>Sign in</a>
            <a href="https://app.veridianapi.com/signup" className={`${s.btn} ${s.btnPrimary} ${s.navMini}`}>Start free <span className={s.arrow}>→</span></a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HERO
──────────────────────────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useReveal(0.1) as React.RefObject<HTMLElement>;
  const termRef = useReveal(0.1) as React.RefObject<HTMLElement>;
  const cmdLines = [
    "$ curl https://api.veridianapi.com/v1/verify \\",
    "    -H 'Authorization: Bearer sk_live_•••' \\",
    "    -d '{\"document\":\"DE_passport\",\"image\":\"@id.jpg\"}'"
  ];
  const { output: cmdOut, done: cmdDone, elRef: cmdEl } = useTypewriter(cmdLines, { speed: 14, lineDelay: 100 });

  return (
    <section className={s.hero} ref={heroRef as React.RefObject<HTMLDivElement>}>
      <div className={s.heroGlow} />
      <div className={s.heroGlow2} />
      <div className={`${s.wrap} ${s.heroInner}`}>
        {/* Badge */}
        <div className={`${s.reveal} in`}>
          <div className={s.heroPill}>
            <span className={s.heroPillTag}>v3.0</span>
            <span>Terminal-grade KYC for fintech engineers</span>
            <Icon name="arrow" size={11} />
          </div>
        </div>

        {/* Headline */}
        <h1 className={`${s.heroH1} ${s.reveal} ${s.revealD1} in`}>
          KYC without<br/>the <span className={s.heroH1Green}>enterprise drag.</span>
        </h1>
        <p className={`${s.heroSub} ${s.reveal} ${s.revealD2} in`}>
          Identity verification, OFAC screening, and AML risk scoring through one REST API. No sales call. No contract. No annual commitment.
        </p>

        {/* CTAs */}
        <div className={`${s.heroCtaRow} ${s.reveal} ${s.revealD3} in`}>
          <a href="https://app.veridianapi.com/signup" className={`${s.btn} ${s.btnPrimary}`}>
            Get API key free <span className={s.arrow}>→</span>
          </a>
          <a href="https://docs.veridianapi.com" className={`${s.btn} ${s.btnGlass}`}>
            <Icon name="terminal" size={14} /> View docs
          </a>
        </div>

        {/* Terminal */}
        <div className={`${s.heroTermWrap} ${s.revealScale}`} ref={termRef as React.RefObject<HTMLDivElement>}>
          <div className={`${s.glass} ${s.term}`} ref={cmdEl as React.RefObject<HTMLDivElement>}>
            <div className={s.termHead}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className={s.termDots}><span/><span/><span/></div>
                <span className={s.termTitle}><span className={s.termTitleBold}>~/acme-payments</span> — zsh — 96×24</span>
              </div>
              <div className={s.termMeta}>
                <span><span className={s.liveDot}/>v3.0.4</span>
                <span>·</span>
                <span>eu-central-1</span>
              </div>
            </div>
            <div className={s.termBody} style={{ minHeight: 340 }}>
              {cmdOut[0] !== undefined && (
                <div><span className={s.prompt}>$</span><span className={s.cmd}>{cmdOut[0].replace('$ ', '')}</span></div>
              )}
              {cmdOut[1] !== undefined && <div style={{ color: 'var(--vd-text-2)' }}>{cmdOut[1]}</div>}
              {cmdOut[2] !== undefined && (
                <div>
                  <span style={{ color: 'var(--vd-text-2)' }}>{cmdOut[2]}</span>
                  {!cmdDone && <span className={s.cursor}/>}
                </div>
              )}
              {cmdDone && (
                <>
                  <div style={{ marginTop: 8 }}><span className={s.com}>{`# 47ms · HTTP 200 · request_id: req_2K3p9mLqV`}</span></div>
                  <div style={{ marginTop: 6 }}><span className={s.punct}>{'{'}</span></div>
                  <div>{'  '}<span className={s.key}>&quot;verification_id&quot;</span><span className={s.punct}>: </span><span className={s.str}>&quot;vrf_8k2pXqR9N&quot;</span><span className={s.punct}>,</span></div>
                  <div>{'  '}<span className={s.key}>&quot;status&quot;</span><span className={s.punct}>: </span><span className={s.ok}>&quot;verified&quot;</span><span className={s.punct}>,</span></div>
                  <div>{'  '}<span className={s.key}>&quot;risk_score&quot;</span><span className={s.punct}>: </span><span className={s.num}>0.08</span><span className={s.punct}>,</span></div>
                  <div>{'  '}<span className={s.key}>&quot;checks&quot;</span><span className={s.punct}>: {'{'}</span></div>
                  <div>{'    '}<span className={s.key}>&quot;document&quot;</span><span className={s.punct}>: </span><span className={s.ok}>&quot;pass&quot;</span><span className={s.punct}>,</span>{' '}<span className={s.key}>&quot;liveness&quot;</span><span className={s.punct}>: </span><span className={s.ok}>&quot;pass&quot;</span><span className={s.punct}>,</span></div>
                  <div>{'    '}<span className={s.key}>&quot;sanctions&quot;</span><span className={s.punct}>: </span><span className={s.ok}>&quot;clear&quot;</span><span className={s.punct}>,</span>{' '}<span className={s.key}>&quot;pep&quot;</span><span className={s.punct}>: </span><span className={s.ok}>&quot;clear&quot;</span><span className={s.punct}>,</span>{' '}<span className={s.key}>&quot;adverse_media&quot;</span><span className={s.punct}>: </span><span className={s.ok}>&quot;clear&quot;</span></div>
                  <div>{'  '}<span className={s.punct}>{'}'}</span></div>
                  <div>{'  '}<span className={s.key}>&quot;jurisdiction&quot;</span><span className={s.punct}>: </span><span className={s.str}>&quot;DE&quot;</span><span className={s.punct}>,</span>{' '}<span className={s.key}>&quot;latency_ms&quot;</span><span className={s.punct}>: </span><span className={s.num}>47</span></div>
                  <div><span className={s.punct}>{'}'}</span><span className={s.cursor}/></div>
                </>
              )}
            </div>
            <div className={s.heroTermFoot}>
              <span><span className={s.liveDot}/>connected · wss://api.veridianapi.com/v3</span>
              <span>HTTP 200 · req_2K3p9mLqV · 47ms</span>
            </div>
          </div>
        </div>

        {/* Spec strip */}
        <div className={`${s.heroStats} ${s.reveal} ${s.revealD4}`}>
          {[
            ['Endpoint', 'REST · JSON'],
            ['Auth', 'Bearer key'],
            ['Coverage', 'Global · OFAC'],
            ['Free trial', '14 days'],
          ].map(([label, val]) => (
            <div key={label} className={s.heroStat}>
              <span className={s.heroStatLabel}>{label}</span>
              <span className={s.heroStatVal}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TRUST STRIP
──────────────────────────────────────────────────────────────────────── */
function Trust() {
  const ref = useReveal();
  const items = ['Live API', 'OFAC database', 'Hosted KYC flow', 'Paddle billing', 'Full docs', 'Secure API keys'];
  return (
    <section className={s.trust} ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`${s.wrap} ${s.reveal} in`}>
        <div className={s.trustStrip}>
          {items.map((t, i) => (
            <React.Fragment key={t}>
              <span className={s.trustItem}><span className={s.trustDot}/><span>{t}</span></span>
              {i < items.length - 1 && <span className={s.trustSep}>·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   STREAM (live verifications)
──────────────────────────────────────────────────────────────────────── */
interface StreamRow { t: string; ev: string; geo: string; risk: string; st: 'pass'|'block'|'review'; lbl: string; fresh?: boolean }

const SEED_ROWS: StreamRow[] = [
  { t:'14:32:08', ev:'identity.verified',    geo:'DE · Berlin',    risk:'0.08', st:'pass',   lbl:'PASS'   },
  { t:'14:32:06', ev:'transaction.screened', geo:'US · NY',        risk:'0.12', st:'pass',   lbl:'PASS'   },
  { t:'14:32:04', ev:'sanction.hit.ofac',    geo:'CY · Limassol',  risk:'0.94', st:'block',  lbl:'BLOCK'  },
  { t:'14:32:01', ev:'kyb.ubo.verified',     geo:'GB · London',    risk:'0.21', st:'pass',   lbl:'PASS'   },
  { t:'14:31:58', ev:'pep.match.review',     geo:'AE · Dubai',     risk:'0.61', st:'review', lbl:'REVIEW' },
  { t:'14:31:55', ev:'transaction.screened', geo:'SG · Central',   risk:'0.09', st:'pass',   lbl:'PASS'   },
  { t:'14:31:52', ev:'identity.verified',    geo:'FR · Paris',     risk:'0.14', st:'pass',   lbl:'PASS'   },
];

function Stream() {
  const ref = useReveal();
  const [rows, setRows] = useState<StreamRow[]>(SEED_ROWS);
  const [count, setCount] = useState(184_204_108);
  const EVENTS = ['identity.verified','transaction.screened','kyb.ubo.verified','kyc.document.ocr','pep.screening','velocity.check'];
  const GEOS   = ['DE · Munich','US · SF','JP · Tokyo','SG · Marina','NL · Amsterdam','CA · Toronto','BR · Rio','IN · Mumbai'];
  const bars   = [6,8,5,9,12,7,10,14,8,6,9,11,7,5,8,10,13,9,6,8,11,7,9,12,10,8,11,9,7,12];

  useEffect(() => {
    const id = setInterval(() => {
      const r = Math.random();
      const st: StreamRow['st'] = r > 0.94 ? 'block' : r > 0.85 ? 'review' : 'pass';
      const risk = (st === 'block' ? 0.85 + Math.random()*0.14 : st === 'review' ? 0.5 + Math.random()*0.3 : Math.random()*0.3).toFixed(2);
      const now = new Date();
      const hh = String(now.getHours()).padStart(2,'0');
      const mm = String(now.getMinutes()).padStart(2,'0');
      const ss = String(now.getSeconds()).padStart(2,'0');
      const newRow: StreamRow = {
        t: `${hh}:${mm}:${ss}`,
        ev: EVENTS[Math.floor(Math.random()*EVENTS.length)],
        geo: GEOS[Math.floor(Math.random()*GEOS.length)],
        risk, st,
        lbl: st === 'block' ? 'BLOCK' : st === 'review' ? 'REVIEW' : 'PASS',
        fresh: true,
      };
      setRows(prev => [newRow, ...prev.slice(0, 6)]);
      setCount(c => c + Math.floor(20 + Math.random()*40));
    }, 1800);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pillClass = (st: StreamRow['st']) =>
    st === 'block' ? s.pillBlock : st === 'review' ? s.pillReview : s.pillPass;
  const riskColor = (st: StreamRow['st']) =>
    st === 'block' ? '#e07058' : st === 'review' ? '#d4a24a' : 'var(--vd-text-2)';

  return (
    <section className={s.section} id="stream" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={s.wrap}>
        <div className={s.sectionHead}>
          <div className={`${s.sectionKicker} ${s.reveal} in`}>01 / Live</div>
          <div>
            <h2 className={`${s.sectionTitle} ${s.reveal} ${s.revealD1} in`}>
              Decisions stream<br/><span className={s.sectionTitleLight}>at the speed of your checkout.</span>
            </h2>
            <p className={`${s.sectionSub} ${s.reveal} ${s.revealD2} in`}>
              Every verification, screening, and risk decision is observable in real time. Tail your production traffic from the terminal — or pipe it to your warehouse.
            </p>
          </div>
        </div>

        <div className={`${s.streamGrid} ${s.revealScale} in`}>
          {/* Live stream terminal */}
          <div className={`${s.glass} ${s.term} ${s.streamTerm}`}>
            <div className={s.termHead}>
              <div style={{ display:'flex', alignItems:'center', gap: 14 }}>
                <div className={s.termDots}><span/><span/><span/></div>
                <span className={s.termTitle}><span className={s.termTitleBold}>veridian tail</span> — events.live</span>
              </div>
              <div className={s.termMeta}>
                <span className={s.liveDot}/><span>streaming · 2.1k rps</span>
              </div>
            </div>
            <div className={s.streamRows}>
              {rows.map((r, i) => (
                <div
                  key={r.t + r.ev + i}
                  className={`${s.streamRow} ${r.fresh && i === 0 ? s.streamRowFresh : ''}`}
                >
                  <span className={s.srTime}>{r.t}</span>
                  <span className={s.srEv}>{r.ev}</span>
                  <span className={s.srGeo}>{r.geo}</span>
                  <span className={s.srRisk} style={{ color: riskColor(r.st) }}>risk {r.risk}</span>
                  <span className={`${s.pill} ${pillClass(r.st)}`}>{r.lbl}</span>
                </div>
              ))}
            </div>
            <div className={s.heroTermFoot}>
              <span>delivered · {count.toLocaleString()}</span>
              <span>0 dropped · lag 3ms</span>
            </div>
          </div>

          {/* Metric cards */}
          <div className={s.streamAside}>
            <div className={`${s.glass} ${s.streamCard}`}>
              <h5>Events / second</h5>
              <div className={s.metricBig}>2,143<span className={s.metricUnit}>rps</span></div>
              <div className={s.metricSub}>↑ 12% vs 1h ago</div>
              <svg className={s.spark} viewBox="0 0 200 52" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#2dc590" stopOpacity="0.4"/>
                    <stop offset="1" stopColor="#2dc590" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,40 L15,34 L30,38 L45,28 L60,30 L75,22 L90,26 L105,18 L120,22 L135,14 L150,18 L165,10 L180,14 L200,8 L200,52 L0,52 Z" fill="url(#sg)"/>
                <path d="M0,40 L15,34 L30,38 L45,28 L60,30 L75,22 L90,26 L105,18 L120,22 L135,14 L150,18 L165,10 L180,14 L200,8" stroke="#2dc590" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className={`${s.glass} ${s.streamCard}`}>
              <h5>P50 / P99 latency</h5>
              <div className={s.metricBig}>47<span className={s.metricUnit}>/ 112 ms</span></div>
              <div className={s.metricSub}>SLO: 200ms · 99.97% under</div>
            </div>
            <div className={`${s.glass} ${s.streamCard}`}>
              <h5>Queue depth</h5>
              <div className={s.metricBig}>7<span className={s.metricUnit}>cases open</span></div>
              <div className={s.bars}>
                {bars.map((h, i) => <div key={i} className={s.bar} style={{ height: h*2, opacity: 0.3+(h/20) }}/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CAPABILITIES
──────────────────────────────────────────────────────────────────────── */
function Capabilities() {
  const ref = useReveal();
  const cards = [
    { icon:'globe',   name:'Coverage',    desc:'Local identity schemes, national registries, and language-aware OCR — maintained by regional compliance teams.', val:'212', unit:'jurisdictions', label:'Live in 9,200+ document types' },
    { icon:'bolt',    name:'Performance', desc:'P50 of 47ms. P99 under 112ms. Decisions fast enough to inline in checkout, not bolt onto onboarding.',         val:'47',  unit:'ms · p50',      label:'Across all regions'          },
    { icon:'webhook', name:'Webhooks',    desc:'Exactly-once delivery, signed payloads, replay log, ordered per-account. Production-grade out of the box.',        val:'99.99%',unit:'delivered',   label:'30 day rolling'              },
    { icon:'shield',  name:'Audit',       desc:'Every decision is a cryptographic artifact. Immutable evidence chains, exportable in regulator-friendly formats.', val:'0',  unit:'data loss events',label:'Since 2021'                  },
  ];

  return (
    <section className={s.section} id="capabilities" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={s.wrap}>
        <div className={s.sectionHead}>
          <div className={`${s.sectionKicker} ${s.reveal} in`}>02 / Capabilities</div>
          <div>
            <h2 className={`${s.sectionTitle} ${s.reveal} ${s.revealD1} in`}>
              Four primitives.<br/><span className={s.sectionTitleLight}>Every compliance decision your fintech will ever make.</span>
            </h2>
          </div>
        </div>
        <div className={s.capGrid}>
          {cards.map((c, i) => (
            <div
              key={c.name}
              className={`${s.glass} ${s.capCard} ${s.reveal} ${[s.revealD1,s.revealD2,s.revealD3,s.revealD4][i]} in`}
            >
              <div className={s.capBg}/>
              <div className={s.capIcon}>
                <Icon name={c.icon} size={22} color="var(--vd-teal-3)"/>
              </div>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <div className={s.capMetric}>
                <span className={s.capMetricVal}>{c.val}<span className={s.capMetricUnit}>{c.unit}</span></span>
                <span className={s.capMetricLabel}>{c.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   API SHOWCASE
──────────────────────────────────────────────────────────────────────── */
type LangKey = 'node'|'python'|'go'|'curl';

interface Token { t: string; v: string }
type CodeLine = Token | string;

function ApiShowcase() {
  const ref = useReveal();
  const [lang, setLang] = useState<LangKey>('node');

  const samples: Record<LangKey, CodeLine[]> = {
    node: [
      {t:'k',v:'import'},{t:'p',v:' { Veridian } '},{t:'k',v:'from'},{t:'s',v:" 'veridian'"},{t:'p',v:';'},'\n\n',
      {t:'k',v:'const'},{t:'f',v:' veridian '},{t:'p',v:'= '},{t:'k',v:'new'},{t:'f',v:' Veridian'},{t:'p',v:'({ apiKey: process.env.VERIDIAN_KEY });'},'\n\n',
      {t:'k',v:'const'},{t:'f',v:' result '},{t:'p',v:'= '},{t:'k',v:'await'},{t:'f',v:' veridian.verify'},{t:'p',v:'({'},'\n',
      '  ',{t:'key',v:'document'},{t:'p',v:': '},{t:'s',v:"'DE_passport'"},{t:'p',v:','},'\n',
      '  ',{t:'key',v:'image'},{t:'p',v:': '},{t:'f',v:'fs.readFileSync'},{t:'p',v:'('},{t:'s',v:"'./id.jpg'"},{t:'p',v:'),'},'\n',
      '  ',{t:'key',v:'checks'},{t:'p',v:': ['},{t:'s',v:"'liveness'"},{t:'p',v:', '},{t:'s',v:"'sanctions'"},{t:'p',v:', '},{t:'s',v:"'pep'"},{t:'p',v:']'},'\n',
      {t:'p',v:'});'},'\n\n',
      {t:'k',v:'if '},{t:'p',v:'(result.status '},{t:'p',v:'=== '},{t:'s',v:"'verified'"},{t:'p',v:') {'},'\n',
      '  ',{t:'f',v:'console.log'},{t:'p',v:'('},{t:'s',v:'`✓ ${result.id} (${result.latency_ms}ms)`'},{t:'p',v:');'},'\n',
      {t:'p',v:'}'},
    ],
    python: [
      {t:'k',v:'from'},{t:'f',v:' veridian '},{t:'k',v:'import'},{t:'f',v:' Veridian'},'\n\n',
      {t:'f',v:'client '},{t:'p',v:'= '},{t:'f',v:'Veridian'},{t:'p',v:"(api_key=os.environ["},{t:'s',v:"'VERIDIAN_KEY'"},{t:'p',v:'])'},'\n\n',
      {t:'f',v:'result '},{t:'p',v:'= client.'},{t:'f',v:'verify'},{t:'p',v:'('},'\n',
      "    document=",{t:'s',v:"'DE_passport'"},{t:'p',v:','},'\n',
      "    image=",{t:'k',v:'open'},{t:'p',v:'('},{t:'s',v:"'./id.jpg'"},{t:'p',v:', '},{t:'s',v:"'rb'"},{t:'p',v:'),'},'\n',
      "    checks=[",{t:'s',v:"'liveness'"},{t:'p',v:', '},{t:'s',v:"'sanctions'"},{t:'p',v:']'},'\n',
      {t:'p',v:')'},'\n\n',
      {t:'k',v:'if'},{t:'p',v:' result.status '},{t:'p',v:'== '},{t:'s',v:"'verified'"},{t:'p',v:':'},'\n',
      "    ",{t:'f',v:'print'},{t:'p',v:'('},{t:'s',v:"f'✓ {result.id} ({result.latency_ms}ms)'"},{t:'p',v:')'},
    ],
    go: [
      {t:'k',v:'import'},{t:'p',v:' '},{t:'s',v:'"github.com/veridian/veridian-go"'},'\n\n',
      {t:'f',v:'client '},{t:'p',v:':= veridian.'},{t:'f',v:'New'},{t:'p',v:'(os.'},{t:'f',v:'Getenv'},{t:'p',v:'('},{t:'s',v:'"VERIDIAN_KEY"'},{t:'p',v:'))'},'\n\n',
      {t:'f',v:'result, err '},{t:'p',v:':= client.'},{t:'f',v:'Verify'},{t:'p',v:'(ctx, &veridian.VerifyParams{'},'\n',
      '    Document: ',{t:'s',v:'"DE_passport"'},{t:'p',v:','},'\n',
      '    Image:    ',{t:'f',v:'loadImage'},{t:'p',v:'('},{t:'s',v:'"./id.jpg"'},{t:'p',v:'),'},'\n',
      '    Checks:   []',{t:'k',v:'string'},{t:'p',v:'{'},{t:'s',v:'"liveness"'},{t:'p',v:', '},{t:'s',v:'"sanctions"'},{t:'p',v:'},'},'\n',
      {t:'p',v:'})'},
    ],
    curl: [
      {t:'p',v:'curl https://api.veridianapi.com/v1/verify \\'},'\n',
      '  -H ',{t:'s',v:"'Authorization: Bearer sk_live_•••'"},{t:'p',v:' \\'},'\n',
      '  -H ',{t:'s',v:"'Content-Type: application/json'"},{t:'p',v:' \\'},'\n',
      '  -d ',{t:'s',v:"'{"},'\n',
      {t:'s',v:'    "document": "DE_passport",'},'\n',
      {t:'s',v:'    "image": "@id.jpg",'},'\n',
      {t:'s',v:'    "checks": ["liveness","sanctions","pep"]'},'\n',
      {t:'s',v:"  }'"},
    ],
  };

  const tokenColor = (t: string) => {
    if (t === 'k')   return 'var(--vd-teal-2)';
    if (t === 's')   return 'var(--vd-teal-3)';
    if (t === 'f')   return 'var(--vd-text)';
    if (t === 'key') return '#b58cf0';
    if (t === 'n')   return '#d4a24a';
    return 'var(--vd-text-3)';
  };

  const renderTokens = (toks: CodeLine[]) =>
    toks.map((t, i) => {
      if (typeof t === 'string') return <span key={i}>{t}</span>;
      return <span key={i} style={{ color: tokenColor(t.t) }}>{t.v}</span>;
    });

  const tabs: { k: LangKey; l: string }[] = [
    { k:'node', l:'TypeScript' }, { k:'python', l:'Python' }, { k:'go', l:'Go' }, { k:'curl', l:'cURL' }
  ];

  return (
    <section className={s.section} id="api" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={s.wrap}>
        <div className={s.sectionHead}>
          <div className={`${s.sectionKicker} ${s.reveal} in`}>03 / API</div>
          <div>
            <h2 className={`${s.sectionTitle} ${s.reveal} ${s.revealD1} in`}>
              Four SDKs.<br/><span className={s.sectionTitleLight}>One coherent shape.</span>
            </h2>
            <p className={`${s.sectionSub} ${s.reveal} ${s.revealD2} in`}>
              Idiomatic typing in every language. Sandbox environments that mirror production scoring. Webhooks with exactly-once delivery.
            </p>
          </div>
        </div>

        <div className={`${s.glass} ${s.glassDeep} ${s.apiShell} ${s.revealScale} in`}>
          <div className={s.apiTabs}>
            {tabs.map(t => (
              <button
                key={t.k}
                className={`${s.apiTab} ${lang === t.k ? s.apiTabActive : ''}`}
                onClick={() => setLang(t.k)}
              >
                {t.l}
              </button>
            ))}
            <div className={s.apiTabMeta}>
              <span><span className={s.liveDot}/>POST /v1/verify</span>
              <span>·</span>
              <span>47ms · 200 OK</span>
            </div>
          </div>

          <div className={s.apiCols}>
            {/* Request */}
            <div className={`${s.apiCol} ${s.apiColLeft}`}>
              <div className={s.apiColLabel}><Icon name="code" size={11}/> Request</div>
              <pre style={{ whiteSpace:'pre-wrap', fontFamily:'inherit', fontSize:'inherit' }}>
                {renderTokens(samples[lang])}
              </pre>
            </div>

            {/* Response */}
            <div className={s.apiCol}>
              <div className={s.apiColLabel}><span className={s.dotOk}/> Response · 200 OK</div>
              <div><span className={s.punct}>{'{'}</span></div>
              {[
                ['"verification_id"', '"vrf_8k2pXqR9N"', true, false],
                ['"status"',          '"verified"',       true, true ],
                ['"risk_score"',      '0.08',             false,false],
                ['"checks"',          '{',                false,false],
              ].map(([k, v, isStr, isOk]) => (
                <div key={String(k)}>
                  {'  '}<span style={{ color:'#b58cf0' }}>{k}</span><span className={s.punct}>: </span>
                  <span style={{ color: isOk ? 'var(--vd-teal-2)' : isStr ? 'var(--vd-teal-3)' : '#d4a24a' }}>{String(v)}</span>
                  {String(v) !== '{' && <span className={s.punct}>,</span>}
                </div>
              ))}
              <div>{'    '}<span style={{ color:'#b58cf0' }}>&quot;document&quot;</span><span className={s.punct}>: </span><span style={{ color:'var(--vd-teal-2)' }}>&quot;pass&quot;</span><span className={s.punct}>,</span></div>
              <div>{'    '}<span style={{ color:'#b58cf0' }}>&quot;liveness&quot;</span><span className={s.punct}>: </span><span style={{ color:'var(--vd-teal-2)' }}>&quot;pass&quot;</span><span className={s.punct}>,</span></div>
              <div>{'    '}<span style={{ color:'#b58cf0' }}>&quot;sanctions&quot;</span><span className={s.punct}>: </span><span style={{ color:'var(--vd-teal-2)' }}>&quot;clear&quot;</span><span className={s.punct}>,</span></div>
              <div>{'    '}<span style={{ color:'#b58cf0' }}>&quot;pep&quot;</span><span className={s.punct}>: </span><span style={{ color:'var(--vd-teal-2)' }}>&quot;clear&quot;</span></div>
              <div>{'  '}<span className={s.punct}>{'}'}</span><span className={s.punct}>,</span></div>
              <div>{'  '}<span style={{ color:'#b58cf0' }}>&quot;latency_ms&quot;</span><span className={s.punct}>: </span><span style={{ color:'#d4a24a' }}>47</span><span className={s.punct}>,</span></div>
              <div>{'  '}<span style={{ color:'#b58cf0' }}>&quot;jurisdiction&quot;</span><span className={s.punct}>: </span><span style={{ color:'var(--vd-teal-3)' }}>&quot;DE&quot;</span></div>
              <div><span className={s.punct}>{'}'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SECURITY
──────────────────────────────────────────────────────────────────────── */
function Security() {
  const ref = useReveal();
  const flow = [
    { num:'01', label:'Client signs request · ed25519', meta:'TLS 1.3',       accent:false },
    { num:'02', label:'Edge auth · key rotation every 90d', meta:'Cloudflare', accent:false },
    { num:'03', label:'Verify · per-tenant compute pool', meta:'veridian-core',accent:true  },
    { num:'04', label:'Decision logged · cryptographic chain', meta:'audit.v3',accent:false },
    { num:'05', label:'Encrypted at rest · per-region keys', meta:'AES-256-GCM',accent:false},
  ];
  const certs = [
    { name:'TLS 1.3 in transit',    desc:'All API traffic encrypted end-to-end',       stat:'Default'   },
    { name:'AES-256-GCM at rest',   desc:'Per-region keys, never co-mingled',           stat:'Default'   },
    { name:'Bearer-key auth',       desc:'Rotate from the dashboard, no downtime',      stat:'Default'   },
    { name:'Audit log retention',   desc:'Every decision logged, exportable as JSON',    stat:'Default'   },
    { name:'GDPR-friendly DPA',     desc:'Available pre-signature on request',           stat:'Available' },
  ];

  return (
    <section className={s.section} id="security" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={s.wrap}>
        <div className={s.sectionHead}>
          <div className={`${s.sectionKicker} ${s.reveal} in`}>04 / Security</div>
          <div>
            <h2 className={`${s.sectionTitle} ${s.reveal} ${s.revealD1} in`}>
              Designed for the team<br/><span className={s.sectionTitleLight}>whose name is on the filing.</span>
            </h2>
          </div>
        </div>

        <div className={s.secShell}>
          {/* Architecture flow */}
          <div className={`${s.glass} ${s.secArch} ${s.reveal} in`}>
            <h4>Request lifecycle</h4>
            <div className={s.archFlow}>
              {flow.map((n, i) => (
                <React.Fragment key={n.num}>
                  <div className={`${s.archNode} ${n.accent ? s.archNodeAccent : ''}`}>
                    <span className={`${s.archNum} ${n.accent ? s.archNumAccent : ''}`}>{n.num}</span>
                    <span className={s.archLabel}>{n.label}</span>
                    <span className={s.archMeta}>{n.meta}</span>
                  </div>
                  {i < flow.length - 1 && <div className={s.archConn}/>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Cert rows */}
          <div className={s.secCerts}>
            {certs.map((c, i) => (
              <div
                key={c.name}
                className={`${s.glass} ${s.certRow} ${s.reveal} ${[s.revealD1,s.revealD2,s.revealD3,s.revealD4,s.revealD4][i]} in`}
              >
                <span className={s.certName}>{c.name}</span>
                <span className={s.certDesc}>{c.desc}</span>
                <span className={s.certStat}>{c.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PRICING
──────────────────────────────────────────────────────────────────────── */
function Pricing() {
  const ref = useReveal();
  const tiers = [
    {
      name:'Starter', price: 199, featured:false,
      desc:'Everything you need to ship KYC into your first product surface.',
      features:[
        {t:'10,000 verifications / mo',       on:true },
        {t:'Identity + OFAC screening',        on:true },
        {t:'REST API + hosted KYC flow',       on:true },
        {t:'Email support · 24h SLA',          on:true },
        {t:'Webhooks · standard delivery',     on:true },
        {t:'Custom rules engine',              on:false},
        {t:'AML risk scoring',                 on:false},
      ],
    },
    {
      name:'Growth', price: 499, featured:true,
      desc:'For teams scaling past their first compliance hire — predictable spend, every primitive unlocked.',
      features:[
        {t:'100,000 verifications / mo',       on:true },
        {t:'Identity + OFAC + PEP screening',  on:true },
        {t:'REST API + hosted KYC flow',       on:true },
        {t:'Priority support · 2h SLA',        on:true },
        {t:'Webhooks · exactly-once',          on:true },
        {t:'Custom rules engine',              on:true },
        {t:'AML risk scoring',                 on:true },
      ],
    },
    {
      name:'Scale', price: 999, featured:false,
      desc:'For platforms processing high verification volume across multiple jurisdictions.',
      features:[
        {t:'Unlimited verifications',          on:true },
        {t:'All checks + adverse media',       on:true },
        {t:'REST API + hosted KYC flow',       on:true },
        {t:'Dedicated support · 30m SLA',      on:true },
        {t:'Webhooks · exactly-once',          on:true },
        {t:'Custom rules + ML scoring',        on:true },
        {t:'Audit logs + on-call escalation',  on:true },
      ],
    },
  ];

  return (
    <section className={s.section} id="pricing" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={s.wrap}>
        <div className={s.sectionHead}>
          <div className={`${s.sectionKicker} ${s.reveal} in`}>05 / Pricing</div>
          <div>
            <h2 className={`${s.sectionTitle} ${s.reveal} ${s.revealD1} in`}>
              Predictable from day one.<br/><span className={s.sectionTitleLight}>Negotiable when you outgrow it.</span>
            </h2>
            <p className={`${s.sectionSub} ${s.reveal} ${s.revealD2} in`}>
              Flat monthly tiers, no per-check surprises, no annual contract until you ask for one. 14-day free trial — no card required.
            </p>
          </div>
        </div>

        <div className={s.priceGrid}>
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={[
                s.glass,
                t.featured ? s.glassTeal : '',
                s.priceCard,
                t.featured ? s.priceCardFeatured : '',
                s.reveal,
                [s.revealD1,s.revealD2,s.revealD3][i],
                'in',
              ].join(' ')}
            >
              {t.featured && <div className={s.priceTag}>Most popular</div>}
              <span className={s.priceName}>{t.name}</span>
              <div className={s.priceAmt}>
                <span className={s.priceCurrency}>$</span>
                <span className={s.priceNum}>{t.price}</span>
                <span className={s.priceUnit}>/mo</span>
              </div>
              <p className={s.priceDesc}>{t.desc}</p>
              <a
                href="https://app.veridianapi.com/signup"
                className={`${s.btn} ${t.featured ? s.btnPrimary : s.btnGlass}`}
                style={{ marginTop: 8, justifyContent:'center' }}
              >
                Start 14-day free trial <span className={s.arrow}>→</span>
              </a>
              <ul className={s.priceFeatures}>
                {t.features.map(f => (
                  <li key={f.t} className={f.on ? '' : s.priceFeatureMuted}>
                    <Icon name="check" size={14} color={f.on ? 'var(--vd-teal-2)' : 'var(--vd-text-4)'}/>
                    <span>{f.t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FINAL CTA
──────────────────────────────────────────────────────────────────────── */
function FinalCta() {
  const ref = useReveal();
  const lines = [
    '$ npm install veridian',
    '  added 1 package · 4.2s',
    '',
    '$ veridian init',
    '  ✓ workspace created · acme-payments',
    '  ✓ keys provisioned · sandbox + live',
    '  ✓ webhooks configured · https://acme.co/hooks/veridian',
    '  ✓ first verification: vrf_8k2pXqR9N · 47ms · pass',
    '',
    '$ ready in 90 seconds.',
  ];
  const { output, done, elRef } = useTypewriter(lines, { speed: 18, lineDelay: 280 });

  return (
    <section className={s.fcta} id="start" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={s.fctaGlow}/>
      <div className={`${s.wrap} ${s.fctaInner} ${s.reveal} in`}>
        {/* Terminal */}
        <div
          ref={elRef}
          className={`${s.glass} ${s.term} ${s.fctaTerm}`}
        >
          <div className={s.termHead}>
            <div style={{ display:'flex', alignItems:'center', gap: 14 }}>
              <div className={s.termDots}><span/><span/><span/></div>
              <span className={s.termTitle}><span className={s.termTitleBold}>~/acme-payments</span> — zsh</span>
            </div>
            <div className={s.termMeta}>
              <span className={s.liveDot}/><span>ready</span>
            </div>
          </div>
          <div className={s.termBody} style={{ minHeight: 280 }}>
            {output.map((l, i) => {
              if (l === '') return <div key={i}>&nbsp;</div>;
              if (l.startsWith('$')) {
                return (
                  <div key={i}>
                    <span className={s.prompt}>$</span>
                    <span className={s.cmd}>{l.slice(2)}</span>
                    {i === output.length - 1 && !done && <span className={s.cursor}/>}
                  </div>
                );
              }
              const isCheck = l.trim().startsWith('✓');
              return (
                <div key={i}>
                  <span style={{ color: isCheck ? 'var(--vd-teal-2)' : 'var(--vd-text-4)', fontStyle: isCheck ? 'normal' : 'italic' }}>{l}</span>
                  {i === output.length - 1 && !done && <span className={s.cursor}/>}
                </div>
              );
            })}
            {done && <span className={s.cursor}/>}
          </div>
        </div>

        <h2 className={s.fctaH2}>
          Ship the hard parts.<br/>
          <span className={s.fctaH2Accent}>Sleep through the weekend.</span>
        </h2>
        <p className={s.fctaP}>Production keys in 90 seconds. No sales call required. No annual contract until you outgrow the trial.</p>
        <div className={s.fctaRow}>
          <a href="https://app.veridianapi.com/signup" className={`${s.btn} ${s.btnPrimary}`}>
            Start free trial <span className={s.arrow}>→</span>
          </a>
          <a href="mailto:hello@veridianapi.com" className={`${s.btn} ${s.btnGlass}`}>
            Talk to engineering
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FOOTER
──────────────────────────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { title:'Product',    links:[['Identity','#'],['Sanctions','#'],['Transactions','#'],['Console','https://app.veridianapi.com']] },
    { title:'Developers', links:[['Documentation','https://docs.veridianapi.com'],['API reference','https://docs.veridianapi.com/api'],['Changelog','#'],['Status','#']] },
    { title:'Company',    links:[['About','#'],['Careers','#'],['Customers','#'],['Press','#']] },
    { title:'Legal',      links:[['Privacy','#'],['Terms','#'],['DPA','#'],['Trust centre','#']] },
  ];

  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footerGrid}>
          {/* Brand column */}
          <div className={`${s.footerCol} ${s.footerBrand}`}>
            <a href="/" className={s.logo}>
              <span className={s.logoMark}/>
              <span>Veridian</span>
              <span style={{ fontFamily:'var(--vd-mono)', fontSize:11, color:'var(--vd-text-3)', marginLeft:2, letterSpacing:0.6 }}>/terminal</span>
            </a>
            <p>Compliance infrastructure for modern fintechs.<br/>Built for global fintech teams.</p>
          </div>

          {cols.map(col => (
            <div key={col.title} className={s.footerCol}>
              <h6>{col.title}</h6>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={s.footerBot}>
          <span>© 2026 VERIDIAN · noreply@veridianapi.com</span>
          <span style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <span className={s.liveDot}/>ALL SYSTEMS NOMINAL
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ROOT EXPORT
──────────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      {/* Inject CSS variables and global resets */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLE }} />

      <Nav />
      <main style={{ position:'relative', zIndex: 1 }}>
        <Hero />
        <Trust />
        <Stream />
        <Capabilities />
        <ApiShowcase />
        <Security />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
