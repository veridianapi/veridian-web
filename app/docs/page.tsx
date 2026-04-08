import type { Metadata } from 'next';
import DocsClient from './DocsClient';

export const metadata: Metadata = {
  title: 'Veridian — API Documentation',
  description:
    'Complete API reference for Veridian KYC, sanctions screening, and AML compliance. Authentication, endpoints, SDKs, webhooks, and error handling.',
};

export default function DocsPage() {
  return <DocsClient />;
}
