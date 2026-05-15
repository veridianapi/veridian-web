import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy — Veridian",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-xl font-semibold mb-3"
        style={{ color: '#f0f4f3' }}
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="May 15, 2026">
      <p>
        This Cookie Policy explains what cookies Veridian uses on veridianapi.com
        and in the Veridian dashboard.
      </p>

      <Section title="1. What We Use">
        <p>
          We use one cookie: the Supabase authentication session cookie. This
          cookie is set when you log in and is required for the dashboard to
          function. It stores your session token so you remain authenticated
          across page loads.
        </p>
        <p>
          Without this cookie, you cannot use the authenticated portions of the
          product. It expires when your session ends or you log out.
        </p>
      </Section>

      <Section title="2. What We Do Not Use">
        <ul className="list-disc list-inside space-y-1" style={{ color: '#a3b3ae' }}>
          <li>No advertising cookies</li>
          <li>No third-party analytics cookies (e.g. Google Analytics)</li>
          <li>No tracking pixels or fingerprinting scripts</li>
          <li>No cross-site tracking of any kind</li>
        </ul>
        <p>
          Our marketing website uses anonymized, privacy-preserving analytics
          that do not set cookies or require a consent banner.
        </p>
      </Section>

      <Section title="3. Cookie Details">
        <div
          style={{
            background: '#111916',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Name', 'Purpose', 'Duration', 'Provider'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#5a7268',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '14px 16px', color: '#f0f4f3', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                  sb-*-auth-token
                </td>
                <td style={{ padding: '14px 16px', color: '#a3b3ae' }}>
                  Stores your authentication session
                </td>
                <td style={{ padding: '14px 16px', color: '#a3b3ae' }}>
                  Session / 1 week
                </td>
                <td style={{ padding: '14px 16px', color: '#a3b3ae' }}>
                  Supabase (first-party)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Managing Cookies">
        <p>
          You can delete or block cookies at any time through your browser
          settings. Blocking the authentication cookie will prevent you from
          logging in to the Veridian dashboard. It has no effect on the public
          marketing website.
        </p>
      </Section>

      <Section title="5. Contact">
        <p>
          Questions about cookies or privacy? Email{" "}
          <a
            href="mailto:hello@veridianapi.com"
            className="underline underline-offset-2"
            style={{ color: "var(--brand)" }}
          >
            hello@veridianapi.com
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
