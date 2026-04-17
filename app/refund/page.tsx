import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy — Veridian",
};

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="April 6, 2026">
      <p>
        We offer a full refund within 14 days of purchase, no questions asked.
      </p>
      <p>
        To request a refund, contact us at{" "}
        <a
          href="mailto:support@veridianapi.com"
          className="underline underline-offset-2"
          style={{ color: "var(--brand)" }}
        >
          support@veridianapi.com
        </a>
        .
      </p>
    </LegalLayout>
  );
}
