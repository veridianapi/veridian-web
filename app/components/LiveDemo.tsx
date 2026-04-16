'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const STEPS = [
  '⬆ Uploading document...',
  '🔍 Extracting fields...',
  '👤 Running face match...',
  '🛡 Screening sanctions...',
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase mb-6 px-3 py-1.5 rounded-full"
      style={{
        color: '#1d9e75',
        backgroundColor: 'rgba(29, 158, 117, 0.08)',
        border: '1px solid rgba(29, 158, 117, 0.15)',
        letterSpacing: '0.08em',
      }}
    >
      {children}
    </div>
  );
}

// Blurred passport placeholder
function DocumentIcon() {
  return (
    <div
      className="w-full rounded-lg flex items-center justify-center py-5"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ filter: 'blur(3px)', opacity: 0.3 }}>
        <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
          <rect x="1" y="1" width="54" height="38" rx="3" stroke="#a3b3ae" strokeWidth="1.5" />
          <circle cx="16" cy="18" r="8" stroke="#a3b3ae" strokeWidth="1.25" />
          <rect x="30" y="11" width="16" height="2.5" rx="1.25" fill="#a3b3ae" />
          <rect x="30" y="16" width="12" height="2.5" rx="1.25" fill="#a3b3ae" />
          <rect x="30" y="21" width="14" height="2.5" rx="1.25" fill="#a3b3ae" />
          <rect x="7" y="30" width="42" height="2" rx="1" fill="#a3b3ae" opacity="0.5" />
          <rect x="7" y="34" width="30" height="2" rx="1" fill="#a3b3ae" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

// Blurred selfie placeholder
function SelfieIcon() {
  return (
    <div
      className="w-full rounded-lg flex items-center justify-center py-5"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ filter: 'blur(3px)', opacity: 0.3 }}>
        <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
          <circle cx="18" cy="13" r="11" stroke="#a3b3ae" strokeWidth="1.5" />
          <path
            d="M1 43c0-9.389 7.611-17 17-17s17 7.611 17 17"
            stroke="#a3b3ae"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// Single JSON result line with syntax highlighting
function JsonLine({
  keyName,
  value,
  last = false,
}: {
  keyName: string;
  value: string | number | boolean;
  last?: boolean;
}) {
  const comma = !last ? <span style={{ color: '#5a7268' }}>,</span> : null;

  let rendered: React.ReactNode;

  if (keyName === 'status' && value === 'approved') {
    rendered = (
      <>
        <span style={{ color: '#1d9e75' }}>&quot;approved&quot;</span>
        {comma}
        {' '}
        <span
          className="inline-flex items-center px-2 py-px rounded-full text-[10px] font-medium"
          style={{ backgroundColor: 'rgba(22,163,74,0.12)', color: '#16a34a', letterSpacing: '0.02em' }}
        >
          approved
        </span>
      </>
    );
  } else if (typeof value === 'string') {
    rendered = (
      <>
        <span style={{ color: '#1d9e75' }}>&quot;{value}&quot;</span>
        {comma}
      </>
    );
  } else {
    // numbers and booleans
    rendered = (
      <>
        <span style={{ color: '#79c0ff' }}>{String(value)}</span>
        {comma}
      </>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-1.5">
      <span style={{ color: '#a3b3ae' }}>&nbsp;&nbsp;&quot;{keyName}&quot;</span>
      <span style={{ color: '#5a7268' }}>:</span>
      <span>{rendered}</span>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function LiveDemo() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clean up timeouts on unmount
  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), []);

  const runDemo = () => {
    if (isRunning) return;
    // Cancel any in-flight timers
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setVisibleSteps([]);
    setShowResult(false);
    setIsRunning(true);

    // Stagger each processing step
    ([0, 800, 1600, 2400] as const).forEach((delay, i) => {
      timeoutsRef.current.push(
        setTimeout(() => setVisibleSteps((s) => [...s, i]), delay + 60)
      );
    });

    // Final result
    timeoutsRef.current.push(
      setTimeout(() => {
        setShowResult(true);
        setIsRunning(false);
      }, 3260)
    );
  };

  const showResponseArea = isRunning || visibleSteps.length > 0 || showResult;

  return (
    <section id="live-demo" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
      {/* Section header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-12"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>Live Demo</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: '#f0f4f3', letterSpacing: '-0.64px' }}
        >
          Watch a verification happen
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg max-w-xl mx-auto"
          style={{ color: '#a3b3ae' }}
        >
          Click &ldquo;Run verification&rdquo; to see the full KYC flow — document scan, face match, and sanctions check.
        </motion.p>
      </motion.div>

      {/* Two-panel layout */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="grid md:grid-cols-2 gap-4 items-start"
      >
        {/* ── Left: request panel ─────────────────────────────────────────── */}
        <div
          className="rounded-xl p-6 flex flex-col"
          style={{
            background: '#0d1117',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
          }}
        >
          {/* Endpoint */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded"
              style={{
                backgroundColor: 'rgba(29,158,117,0.12)',
                color: '#1d9e75',
                letterSpacing: '0.04em',
              }}
            >
              POST
            </span>
            <span className="text-sm font-mono" style={{ color: '#a3b3ae' }}>
              /v1/verifications
            </span>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-5 flex-1">
            {/* document_type */}
            <div>
              <div
                className="text-[11px] font-medium mb-1.5"
                style={{ color: '#5a7268', letterSpacing: '0.04em' }}
              >
                document_type
              </div>
              <div
                className="px-3 py-2 rounded-lg text-sm font-mono"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#1d9e75',
                }}
              >
                &quot;passport&quot;
              </div>
            </div>

            {/* document_front */}
            <div>
              <div
                className="text-[11px] font-medium mb-1.5"
                style={{ color: '#5a7268', letterSpacing: '0.04em' }}
              >
                document_front
              </div>
              <DocumentIcon />
            </div>

            {/* selfie */}
            <div>
              <div
                className="text-[11px] font-medium mb-1.5"
                style={{ color: '#5a7268', letterSpacing: '0.04em' }}
              >
                selfie
              </div>
              <SelfieIcon />
            </div>
          </div>

          {/* Run button */}
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="mt-6 w-full flex items-center justify-center gap-2 h-9 rounded-lg text-[13px] font-medium transition-all"
            style={{
              backgroundColor: '#1d9e75',
              color: '#050a09',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              opacity: isRunning ? 0.65 : 1,
            }}
          >
            {isRunning ? (
              <>
                <span
                  className="w-3.5 h-3.5 rounded-full border-2 animate-spin"
                  style={{ borderColor: 'rgba(5,10,9,0.4)', borderTopColor: '#050a09' }}
                />
                Running...
              </>
            ) : showResult ? (
              <>Run again</>
            ) : (
              <>
                Run verification
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* ── Right: response panel ────────────────────────────────────────── */}
        <div
          className="rounded-xl p-6 flex flex-col"
          style={{
            background: '#0d1117',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            minHeight: '420px',
          }}
        >
          <div
            className="text-[11px] font-semibold uppercase mb-5"
            style={{ color: '#5a7268', letterSpacing: '0.08em' }}
          >
            Response
          </div>

          {!showResponseArea && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-center" style={{ color: '#5a7268' }}>
                Click &ldquo;Run verification&rdquo; to see results
              </p>
            </div>
          )}

          {showResponseArea && (
            <div className="flex flex-col gap-2">
              {/* Processing steps — stack up as they appear */}
              {STEPS.map((step, i) =>
                visibleSteps.includes(i) ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="text-sm font-mono"
                    style={{ color: '#5a7268' }}
                  >
                    {step}
                  </motion.div>
                ) : null
              )}

              {/* Final JSON result */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="mt-3 font-mono text-sm leading-[1.8]"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    padding: '16px',
                  }}
                >
                  <div style={{ color: '#5a7268' }}>{'{'}</div>
                  <JsonLine keyName="status"       value="approved" />
                  <JsonLine keyName="risk_score"   value={12} />
                  <JsonLine keyName="face_match"   value={0.94} />
                  <JsonLine keyName="name"         value="Sarah Chen" />
                  <JsonLine keyName="document"     value="passport" />
                  <JsonLine keyName="sanctions_hit" value={false} />
                  <JsonLine keyName="processed_in" value="1.8s" last />
                  <div style={{ color: '#5a7268' }}>{'}'}</div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
