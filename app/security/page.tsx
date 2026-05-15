import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Security — Veridian",
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

export default function SecurityPage() {
  return (
    <LegalLayout title="Security" lastUpdated="May 15, 2026">
      <p>
        This page documents the security controls Veridian has in place to
        protect customer data and API traffic. We believe in being specific
        rather than vague about what we do and do not do.
      </p>

      <Section title="Data in Transit">
        <p>
          All traffic between clients and the Veridian API is encrypted using
          TLS 1.3. Connections using TLS 1.2 or below are rejected. HTTP
          requests are redirected to HTTPS.
        </p>
      </Section>

      <Section title="Data at Rest">
        <p>
          Data stored in our database is encrypted at rest using AES-256.
          Encryption is handled by Supabase (PostgreSQL on AWS), which manages
          key rotation and hardware security module (HSM) integration.
        </p>
      </Section>

      <Section title="API Key Security">
        <p>
          API keys are hashed with SHA-256 before storage. Veridian never stores
          the plaintext key after initial generation. If you lose your API key,
          you must rotate it — we cannot recover it.
        </p>
        <p>
          Keys are displayed in full only at the moment of creation. After that,
          only the last four characters are visible in the dashboard.
        </p>
      </Section>

      <Section title="OFAC Screening">
        <p>
          Every identity verification request is screened against the OFAC SDN
          (Specially Designated Nationals) list as part of the verification
          pipeline. Screening occurs on every request, not just at onboarding.
        </p>
      </Section>

      <Section title="Document Handling">
        <p>
          Government ID images and selfie photos submitted through the API are
          used solely to produce a verification result and are deleted after
          verification completes. We do not retain document images or use them
          for any purpose beyond the requested check.
        </p>
      </Section>

      <Section title="Infrastructure">
        <p>
          The Veridian API runs on AWS eu-west-1 (Ireland). Data submitted
          through the API is stored and processed within the EU. We do not
          replicate data to regions outside the EU without customer instruction.
        </p>
      </Section>

      <Section title="Compliance Status">
        <ul className="list-disc list-inside space-y-1" style={{ color: '#a3b3ae' }}>
          <li>
            <strong style={{ color: '#f0f4f3' }}>SOC 2 Type II:</strong> Audit
            in progress. We will publish the report when complete.
          </li>
          <li>
            <strong style={{ color: '#f0f4f3' }}>GDPR:</strong> We act as a data
            processor for customer-submitted end-user data. A Data Processing
            Agreement (DPA) is available on request.
          </li>
        </ul>
      </Section>

      <Section title="Responsible Disclosure">
        <p>
          If you believe you have found a security vulnerability in Veridian,
          please report it to{" "}
          <a
            href="mailto:hello@veridianapi.com"
            className="underline underline-offset-2"
            style={{ color: "var(--brand)" }}
          >
            hello@veridianapi.com
          </a>{" "}
          with a description of the issue and steps to reproduce. We will
          acknowledge receipt within one business day and investigate promptly.
        </p>
        <p>
          We ask that you do not publicly disclose the vulnerability until we
          have had a reasonable opportunity to address it.
        </p>
      </Section>
    </LegalLayout>
  );
}
