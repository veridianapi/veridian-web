import Link from 'next/link';

const SIGNUP_URL = "https://app.veridianapi.com/login?next=/dashboard/billing";
const LOGIN_URL = "https://app.veridianapi.com/login";
const DOCS_URL = "/docs";
const SALES_EMAIL = "mailto:support@veridianapi.com";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="logo">
          <svg className="logo-mark" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="20" height="20" rx="4" stroke="#1d9e75" strokeWidth="1.25"/>
            <path d="M5.5 10.5L9.5 14.5L16.5 7.5" stroke="#1d9e75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Veridian</span>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Product</a>
          <a href="#api" className="nav-link">Developers</a>
          <a href="#security" className="nav-link">Security</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <Link href={DOCS_URL} className="nav-link">Docs</Link>
        </div>
        <div className="nav-cta">
          <Link href={LOGIN_URL} className="nav-link">Sign in</Link>
          <a href={SALES_EMAIL} className="btn btn-ghost">Talk to sales</a>
          <Link href={SIGNUP_URL} className="btn btn-primary">Start building <span className="arrow">→</span></Link>
        </div>
      </div>
    </nav>
  );
}
