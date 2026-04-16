'use client';

import { motion } from 'framer-motion';

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

// ─── Data ──────────────────────────────────────────────────────────────────────

type VerificationStatus = 'Approved' | 'Review' | 'Rejected';

const ROWS: {
  name: string;
  document: string;
  status: VerificationStatus;
  risk: number;
  date: string;
}[] = [
  { name: 'Sarah Chen',     document: 'passport',         status: 'Approved', risk: 12, date: '4/15/2026' },
  { name: 'James Okafor',   document: 'driving_licence',  status: 'Review',   risk: 45, date: '4/15/2026' },
  { name: 'Maria Santos',   document: 'passport',         status: 'Approved', risk: 9,  date: '4/15/2026' },
  { name: 'Unknown Person', document: 'national_id',      status: 'Rejected', risk: 82, date: '4/14/2026' },
  { name: 'Aiko Tanaka',    document: 'passport',         status: 'Approved', risk: 12, date: '4/13/2026' },
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

function StatusPill({ status }: { status: VerificationStatus }) {
  const styles: Record<VerificationStatus, { color: string; backgroundColor: string }> = {
    Approved: { color: '#16a34a', backgroundColor: 'rgba(22,163,74,0.12)' },
    Review:   { color: '#d97706', backgroundColor: 'rgba(217,119,6,0.12)' },
    Rejected: { color: '#dc2626', backgroundColor: 'rgba(220,38,38,0.12)' },
  };
  return (
    <span
      className="inline-flex items-center px-2 py-px rounded-full text-[11px] font-medium"
      style={{ ...styles[status], letterSpacing: '0.02em' }}
    >
      {status}
    </span>
  );
}

function RiskScore({ score }: { score: number }) {
  const color = score < 30 ? '#16a34a' : score < 70 ? '#d97706' : '#dc2626';
  return (
    <span
      className="font-mono text-[13px] font-medium"
      style={{ color, fontVariantNumeric: 'tabular-nums' }}
    >
      {score}
    </span>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
      {/* Section header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-10"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>Dashboard</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: '#f0f4f3', letterSpacing: '-0.64px' }}
        >
          Real-time compliance monitoring
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg max-w-xl mx-auto"
          style={{ color: '#a3b3ae' }}
        >
          Every verification logged, scored, and auditable — the moment it happens.
        </motion.p>
      </motion.div>

      {/* Dashboard card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        style={{
          backgroundColor: '#111916',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* macOS chrome bar */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{
            backgroundColor: '#0a0f0e',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#1d9e75' }} />
          </div>
          <span
            className="text-[12px] font-medium"
            style={{ color: '#5a7268' }}
          >
            Verifications
          </span>
          {/* Live indicator */}
          <div className="ml-auto flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#1d9e75' }}
            />
            <span className="text-[11px]" style={{ color: '#5a7268' }}>Live</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr>
                {['Name', 'Document', 'Status', 'Risk', 'Date'].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#5a7268',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom:
                      i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background =
                      'rgba(255,255,255,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
                  }}
                >
                  {/* Name */}
                  <td
                    style={{
                      padding: '14px 16px',
                      color: '#f0f4f3',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.name}
                  </td>
                  {/* Document */}
                  <td
                    style={{
                      padding: '14px 16px',
                      color: '#a3b3ae',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.document}
                  </td>
                  {/* Status */}
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <StatusPill status={row.status} />
                  </td>
                  {/* Risk score */}
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <RiskScore score={row.risk} />
                  </td>
                  {/* Date */}
                  <td
                    style={{
                      padding: '14px 16px',
                      color: '#5a7268',
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
