import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy — Veridian",
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

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="May 15, 2026">
      <p>
        This Refund Policy explains the conditions under which Veridian will
        issue refunds for subscription fees.
      </p>

      <Section title="1. Free Trial">
        <p>
          All plans include a 14-day free trial. You will not be charged during
          the trial period. If you cancel before the trial ends, no charge will
          be applied.
        </p>
      </Section>

      <Section title="2. Paid Subscriptions">
        <p>
          Once your trial ends and a paid subscription begins, subscription fees
          are non-refundable for partial billing periods. We do not issue prorated
          refunds when you cancel mid-month.
        </p>
        <p>
          If you cancel your subscription, you retain access to the Services
          until the end of your current billing period. No further charges will
          be made after cancellation.
        </p>
      </Section>

      <Section title="3. Service Failure">
        <p>
          If the Services do not function as documented and the issue is
          attributable to Veridian, contact us at{" "}
          <a
            href="mailto:hello@veridianapi.com"
            className="underline underline-offset-2"
            style={{ color: "var(--brand)" }}
          >
            hello@veridianapi.com
          </a>{" "}
          within 7 days of experiencing the problem. We will investigate and, if
          the failure is confirmed on our end, we will issue a credit or refund
          for the affected period at our discretion.
        </p>
      </Section>

      <Section title="4. Cancellation">
        <p>
          You may cancel your subscription at any time from your account
          settings. Cancellation takes effect at the end of your current billing
          period — there are no early termination fees.
        </p>
      </Section>

      <Section title="5. Contact">
        <p>
          For refund or billing questions, email us at{" "}
          <a
            href="mailto:hello@veridianapi.com"
            className="underline underline-offset-2"
            style={{ color: "var(--brand)" }}
          >
            hello@veridianapi.com
          </a>
          . We respond within one business day.
        </p>
      </Section>
    </LegalLayout>
  );
}
