import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy — Veridian",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="April 6, 2026">
      <p>
        We want you to be completely satisfied with Veridian. This Refund Policy
        describes the circumstances under which refunds are available and how to
        request them. By subscribing to any Veridian plan, you agree to this
        policy.
      </p>

      <Section title="1. Free Trial">
        <p>
          All paid plans include a 14-day free trial. No credit card is required
          to start a trial. Your first 50 identity verifications are free,
          regardless of whether you convert to a paid plan. You will not be
          charged until your free trial period ends and you elect to continue
          with a paid subscription.
        </p>
      </Section>

      <Section title="2. Subscription Fees">
        <p>
          Veridian charges subscription fees monthly in advance. Because we
          provide immediate access to the full platform — including API access,
          sandbox environment, and all features included in your plan — monthly
          subscription fees are <strong className="text-gray-800">generally non-refundable</strong> once a billing
          cycle has begun.
        </p>
        <p>
          We do not offer partial-month refunds for cancellations made
          mid-cycle. If you cancel your subscription, your access will continue
          until the end of the current billing period and you will not be charged
          for subsequent months.
        </p>
      </Section>

      <Section title="3. Exceptions — When We Do Issue Refunds">
        <p>
          Notwithstanding the above, Veridian will issue a full refund in the
          following circumstances:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            <strong className="text-gray-800">First-month cancellation within 48 hours:</strong> If you convert from a
            free trial to a paid plan and cancel within 48 hours of your first
            charge, we will refund the full subscription fee for that month, no
            questions asked.
          </li>
          <li>
            <strong className="text-gray-800">Service outage credit:</strong> If we fail to meet our stated uptime
            commitment and you are on the Scale plan with an active SLA, you are
            eligible for a prorated service credit as defined in your Service
            Level Agreement. This credit will be applied to your next invoice.
          </li>
          <li>
            <strong className="text-gray-800">Duplicate charges:</strong> If you are charged more than once for the
            same billing period due to a system error, we will refund the
            duplicate charge within 5 business days of confirmation.
          </li>
          <li>
            <strong className="text-gray-800">Unauthorized charges:</strong> If you believe a charge was made without
            your authorization, contact us immediately. We will investigate and
            refund verified unauthorized charges.
          </li>
          <li>
            <strong className="text-gray-800">We cancel your account without cause:</strong> If Veridian terminates
            your account for reasons other than your breach of our Terms of
            Service, we will refund a prorated portion of your prepaid
            subscription fees for the unused portion of the billing period.
          </li>
        </ul>
      </Section>

      <Section title="4. Overage Charges">
        <p>
          If your API usage exceeds your plan&apos;s monthly verification quota,
          overage fees are billed at the end of the billing cycle at the rates
          displayed on our pricing page. Overage charges reflect actual API
          consumption and are non-refundable, except in cases of verified system
          error where verifications were charged but not completed due to
          platform failure.
        </p>
        <p>
          If you anticipate regularly exceeding your quota, we encourage you to
          upgrade your plan to avoid overage charges.
        </p>
      </Section>

      <Section title="5. Annual Plans">
        <p>
          If Veridian introduces annual subscription options in the future,
          annual plans canceled within 30 days of the original purchase date
          will be eligible for a full refund minus any verifications consumed.
          Annual plans canceled after 30 days are non-refundable but may be
          downgraded with credit applied proportionally.
        </p>
      </Section>

      <Section title="6. How to Request a Refund">
        <p>To request a refund, please contact our billing team:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Email: billing@veridian.io</li>
          <li>Subject line: &ldquo;Refund Request — [your account email]&rdquo;</li>
          <li>Include: the reason for your request and the relevant invoice number</li>
        </ul>
        <p>
          We aim to respond to all refund requests within 2 business days.
          Approved refunds are returned to the original payment method within
          5–10 business days, depending on your bank or card issuer.
        </p>
      </Section>

      <Section title="7. Chargebacks">
        <p>
          We ask that you contact us at billing@veridian.io before initiating a
          chargeback with your bank or payment provider. Most issues can be
          resolved quickly and informally. Initiating a chargeback without first
          contacting us may result in suspension of your account during the
          dispute period.
        </p>
      </Section>

      <Section title="8. Changes to This Policy">
        <p>
          Veridian reserves the right to modify this Refund Policy at any time.
          Changes will be communicated via email and will apply to charges
          arising after the effective date. This policy does not affect your
          statutory rights under applicable consumer protection law.
        </p>
      </Section>

      <Section title="9. Contact">
        <p>
          Questions about this policy? Reach us at billing@veridian.io or at
          Veridian Technologies, Inc., 228 Park Ave S, PMB 70145, New York, NY
          10003.
        </p>
      </Section>
    </LegalLayout>
  );
}
