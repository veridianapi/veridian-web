import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="logo">
              <svg className="logo-mark" viewBox="0 0 22 22" fill="none">
                <rect x="1" y="1" width="20" height="20" rx="4" stroke="#1d9e75" strokeWidth="1.25"/>
                <path d="M5.5 10.5L9.5 14.5L16.5 7.5" stroke="#1d9e75" strokeWidth="1.5"/>
              </svg>
              <span>Veridian</span>
            </div>
            <p>Built from Ethiopia for global fintech teams.</p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
              <span className="chip"><span className="dot"/> All systems operational</span>
            </div>
          </div>
          <div className="footer-col">
            <h6>Product</h6>
            <ul>
              <li><a href="#features">Identity</a></li>
              <li><a href="#features">Sanctions</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Developers</h6>
            <ul>
              <li><Link href="/docs">Documentation</Link></li>
              <li><Link href="/docs">API reference</Link></li>
              <li><Link href="/docs">SDKs</Link></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Company</h6>
            <ul>
              <li><a href="mailto:support@veridianapi.com">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Legal</h6>
            <ul>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/refund">Refund</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
              <li><Link href="/security">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <span>© 2026 Veridian</span>
          <span>veridianapi.com</span>
        </div>
      </div>
    </footer>
  );
}
