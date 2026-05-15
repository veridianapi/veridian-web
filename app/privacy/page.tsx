import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Veridian",
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

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 6, 2026">
      <p>
        Veridian (&ldquo;Veridian,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is
        committed to protecting the privacy of our customers and the individuals
        whose data is processed through our platform. This Privacy Policy
        explains how we collect, use, disclose, and safeguard information in
        connection with the Veridian platform, website, and APIs.
      </p>

      <Section title="1. Scope">
        <p>
          This policy applies to (a) visitors to our website at veridianapi.com,
          (b) customers who access our API and platform services, and (c)
          individuals whose personal data is submitted by our customers for
          identity verification or compliance purposes (&ldquo;end users&rdquo;).
        </p>
        <p>
          Where Veridian processes personal data on behalf of customers (acting
          as a data processor), the customer&apos;s own privacy policy governs the
          relationship with end users. Our Data Processing Agreement (&ldquo;DPA&rdquo;)
          governs that relationship.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <p><strong style={{ color: '#f0f4f3' }}>Account and billing information:</strong> When you register, we collect
          your name, email address, company name, billing address, and payment
          method details. Payment card data is handled by our PCI-compliant
          payment processor and is not stored by Veridian.</p>
        <p><strong style={{ color: '#f0f4f3' }}>API usage data:</strong> We collect logs of API requests and responses,
          including timestamps, endpoint paths, status codes, latency, and IP
          addresses. This data is used for billing, debugging, and security
          monitoring.</p>
        <p><strong style={{ color: '#f0f4f3' }}>End-user verification data:</strong> When customers submit individuals&apos;
          data for KYC or sanctions screening, this may include names, dates of
          birth, government ID images, and selfie photos.
          This data is processed strictly to deliver the verification result and
          is not used for any other purpose. Document images and selfies are
          deleted after verification completes.</p>
        <p><strong style={{ color: '#f0f4f3' }}>Website analytics:</strong> We collect anonymized usage data on our
          marketing website using privacy-preserving analytics tools. We do not
          use tracking cookies that require GDPR consent banners.</p>
      </Section>

      <Section title="3. How We Use Information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-1" style={{ color: '#a3b3ae' }}>
          <li>Provide, operate, and improve the Services</li>
          <li>Process transactions and send billing-related communications</li>
          <li>Respond to support requests and troubleshoot issues</li>
          <li>Monitor for security threats, fraud, and abuse</li>
          <li>Comply with legal obligations and respond to lawful requests</li>
          <li>Send product updates and announcements (opt-out available)</li>
        </ul>
        <p>
          We do not sell personal data to third parties and do not use end-user
          verification data for advertising, profiling, or any purpose beyond
          delivering the requested compliance service.
        </p>
      </Section>

      <Section title="4. Legal Basis for Processing (GDPR)">
        <p>For individuals in the European Economic Area, UK, or Switzerland, our legal bases for processing personal data are:</p>
        <ul className="list-disc list-inside space-y-1" style={{ color: '#a3b3ae' }}>
          <li><strong style={{ color: '#f0f4f3' }}>Contract performance:</strong> Processing necessary to provide the Services you have contracted for</li>
          <li><strong style={{ color: '#f0f4f3' }}>Legitimate interests:</strong> Security monitoring, fraud prevention, and service improvement</li>
          <li><strong style={{ color: '#f0f4f3' }}>Legal obligation:</strong> Compliance with applicable laws and regulatory requirements</li>
          <li><strong style={{ color: '#f0f4f3' }}>Consent:</strong> For marketing communications (withdrawable at any time)</li>
        </ul>
      </Section>

      <Section title="5. Data Sharing and Disclosure">
        <p>
          We share personal data only in the following circumstances:
        </p>
        <ul className="list-disc list-inside space-y-1" style={{ color: '#a3b3ae' }}>
          <li><strong style={{ color: '#f0f4f3' }}>Sub-processors:</strong> We use vetted third-party service providers for cloud infrastructure (AWS eu-west-1, Ireland), payment processing, and sanctions database access. Contact us for a current list of sub-processors.</li>
          <li><strong style={{ color: '#f0f4f3' }}>Legal requirements:</strong> When required by applicable law, court order, or government authority</li>
          <li><strong style={{ color: '#f0f4f3' }}>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate data protection obligations</li>
          <li><strong style={{ color: '#f0f4f3' }}>With your consent:</strong> For any other purpose with your explicit authorization</li>
        </ul>
      </Section>

      <Section title="6. Data Retention">
        <p>
          We retain account and billing information for the duration of your
          subscription and as required for tax and financial record-keeping.
          API logs are retained for 90 days.
        </p>
        <p>
          End-user document images and selfies are deleted after verification
          completes. Verification results (status, risk score, extracted identity
          fields) are retained for the duration of your subscription to allow
          you to retrieve them via the API. You may request deletion at any time
          via hello@veridianapi.com.
        </p>
      </Section>

      <Section title="7. International Data Transfers">
        <p>
          Veridian&apos;s API infrastructure runs on AWS eu-west-1 (Ireland). Data
          submitted through the API is stored and processed within the EU. For
          customers in the EEA or UK, we are able to provide a Data Processing
          Agreement (DPA) on request — contact hello@veridianapi.com.
        </p>
      </Section>

      <Section title="8. Security">
        <p>
          We implement administrative and technical safeguards appropriate to
          the sensitivity of the data we process. These include AES-256
          encryption at rest, TLS 1.3 in transit, and role-based access
          controls. To report a security concern, email hello@veridianapi.com.
        </p>
        <p>
          No system is perfectly secure. We will notify affected customers of
          any confirmed data breach affecting their data within 72 hours of
          discovery, as required by GDPR and applicable law.
        </p>
      </Section>

      <Section title="9. Your Rights">
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc list-inside space-y-1" style={{ color: '#a3b3ae' }}>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate or incomplete data</li>
          <li>Request deletion of your personal data</li>
          <li>Object to or restrict certain processing activities</li>
          <li>Data portability (receive your data in a machine-readable format)</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Lodge a complaint with your local supervisory authority</li>
        </ul>
        <p>
          To exercise these rights, contact us at hello@veridianapi.com. We will
          respond within 30 days (or sooner as required by law).
        </p>
      </Section>

      <Section title="10. Cookies">
        <p>
          Our website uses only essential cookies required for authentication and
          security. We do not use third-party advertising cookies. You can
          control cookies through your browser settings.
        </p>
      </Section>

      <Section title="11. Children's Privacy">
        <p>
          The Services are not directed to individuals under 18 years of age. We
          do not knowingly collect personal data from minors. If you believe we
          have inadvertently collected data from a minor, contact us immediately
          at hello@veridianapi.com.
        </p>
      </Section>

      <Section title="12. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of material changes via email or prominent in-product notice at
          least 14 days before the changes take effect. The &ldquo;Last updated&rdquo; date
          at the top of this page indicates when the current version was
          published.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>
          For privacy-related inquiries or to exercise your rights, contact us
          at hello@veridianapi.com.
        </p>
      </Section>
    </LegalLayout>
  );
}
