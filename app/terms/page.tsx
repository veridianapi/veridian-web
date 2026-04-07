import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Veridian",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 6, 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Veridian
        platform, APIs, and related services (collectively, the &ldquo;Services&rdquo;) provided
        by Veridian (&ldquo;Veridian,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By
        accessing or using our Services, you agree to be bound by these Terms.
      </p>

      <Section title="1. Acceptance of Terms">
        <p>
          By creating an account, accessing our API, or using any Veridian
          Service, you confirm that you have read, understood, and agree to be
          bound by these Terms, our Privacy Policy, and any additional terms
          applicable to specific features or plans. If you are entering into
          these Terms on behalf of an entity, you represent that you have the
          authority to bind that entity.
        </p>
        <p>
          If you do not agree with any part of these Terms, you must not access
          or use the Services.
        </p>
      </Section>

      <Section title="2. Description of Services">
        <p>
          Veridian provides a Compliance-as-a-Service API platform enabling
          businesses to perform KYC (Know Your Customer) identity verification,
          KYB (Know Your Business) entity verification, sanctions screening, AML
          (Anti-Money Laundering) monitoring, and related compliance workflows.
        </p>
        <p>
          We reserve the right to modify, suspend, or discontinue any feature
          or the Services as a whole at any time with reasonable advance notice
          except in cases of emergency.
        </p>
      </Section>

      <Section title="3. Account Registration and Security">
        <p>
          You must provide accurate, current, and complete information when
          creating an account. You are responsible for safeguarding your API
          keys and credentials and for all activity that occurs under your
          account. Notify us immediately at security@veridian.io of any
          unauthorized access or suspected breach.
        </p>
        <p>
          You may not share, sell, transfer, or sublicense your API keys to
          third parties without express written permission from Veridian.
        </p>
      </Section>

      <Section title="4. Acceptable Use">
        <p>
          You agree to use the Services only for lawful purposes and in
          accordance with these Terms. You must not:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Use the Services to violate any applicable law or regulation</li>
          <li>Submit fraudulent, inaccurate, or fabricated identity information</li>
          <li>Attempt to circumvent rate limits, access controls, or security measures</li>
          <li>Reverse-engineer, decompile, or disassemble any part of the Services</li>
          <li>Use the Services for any purpose that Veridian reasonably determines to be harmful</li>
          <li>Resell or white-label the Services without a separate written reseller agreement</li>
        </ul>
      </Section>

      <Section title="5. Fees and Payment">
        <p>
          Access to the Services is subject to the fees set forth on our
          pricing page or in an order form executed between you and Veridian.
          Subscription fees are billed monthly in advance. Overages above your
          plan&apos;s verification quota are billed at the end of each billing cycle.
        </p>
        <p>
          All fees are non-refundable except as expressly set forth in our
          Refund Policy or as required by applicable law. We reserve the right
          to modify pricing with 30 days&apos; written notice.
        </p>
      </Section>

      <Section title="6. Data Processing and Compliance">
        <p>
          You acknowledge that you are the data controller for any personal data
          you submit through the Services, and Veridian acts as a data
          processor. You are solely responsible for ensuring that your use of
          the Services complies with all applicable data protection laws,
          including GDPR, CCPA, and any applicable financial services
          regulations.
        </p>
        <p>
          You represent and warrant that you have obtained all necessary
          consents and have the legal basis to submit personal data to Veridian
          for processing.
        </p>
      </Section>

      <Section title="7. Intellectual Property">
        <p>
          Veridian retains all right, title, and interest in and to the
          Services, including all software, algorithms, trademarks, and
          documentation. These Terms do not grant you any ownership rights in
          the Services.
        </p>
        <p>
          You retain ownership of any data you submit to the Services. You grant
          Veridian a limited license to process that data solely to deliver the
          Services to you.
        </p>
      </Section>

      <Section title="8. Service Level and Uptime">
        <p>
          Veridian targets 99.9% API uptime on the Scale plan and commercially
          reasonable availability on Starter and Growth plans. Scheduled
          maintenance will be communicated in advance via our status page at
          status.veridian.io. Uptime commitments do not apply to downtime caused
          by third-party data providers, force majeure events, or your own
          systems.
        </p>
      </Section>

      <Section title="9. Limitation of Liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, VERIDIAN SHALL NOT
          BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, OR
          GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE USE
          OF THE SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          VERIDIAN&apos;S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO
          THESE TERMS SHALL NOT EXCEED THE AMOUNTS PAID BY YOU TO VERIDIAN IN
          THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
        </p>
      </Section>

      <Section title="10. Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless Veridian and its
          officers, directors, employees, and agents from any claims, damages,
          losses, or expenses (including reasonable attorneys&apos; fees) arising out
          of your use of the Services, your breach of these Terms, or your
          violation of any applicable law or third-party rights.
        </p>
      </Section>

      <Section title="11. Term and Termination">
        <p>
          These Terms remain in effect for as long as you use the Services.
          Either party may terminate the agreement by providing 30 days&apos; written
          notice. Veridian may suspend or terminate your access immediately for
          material breach, non-payment, or activity that poses a legal or
          security risk.
        </p>
        <p>
          Upon termination, your right to access the Services ceases and
          Veridian will delete or return your data in accordance with our data
          retention policy and applicable law.
        </p>
      </Section>

      <Section title="12. Governing Law">
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the State of Delaware, without regard to its conflict of law
          principles. Any disputes shall be resolved through binding arbitration
          in accordance with the JAMS rules, or in courts of competent
          jurisdiction in Delaware if arbitration is not permitted by law.
        </p>
      </Section>

      <Section title="13. Changes to Terms">
        <p>
          We may update these Terms from time to time. We will provide at least
          14 days&apos; notice of material changes via email or in-product
          notification. Continued use of the Services after the effective date
          constitutes acceptance of the revised Terms.
        </p>
      </Section>

      <Section title="14. Contact">
        <p>
          For questions about these Terms, contact us at legal@veridian.io or by
          mail at Veridian, 228 Park Ave S, PMB 70145, New York, NY 10003.
        </p>
      </Section>
    </LegalLayout>
  );
}
