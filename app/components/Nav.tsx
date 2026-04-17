'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const LOGIN_URL = "https://veridian-api-dashboard.vercel.app/login";

const NAV_LINKS = [
  { label: 'Features', href: '#features', external: false },
  { label: 'Pricing', href: '#pricing', external: false },
  { label: 'Security', href: '#security', external: false },
  { label: 'Docs', href: '/docs', external: false },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const close = () => setMobileOpen(false);
      window.addEventListener('resize', close);
      return () => window.removeEventListener('resize', close);
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(5, 10, 9, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(29, 158, 117, 0.1)' : '1px solid transparent',
        }}
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl tracking-tight" style={{ color: '#e8f5ef' }}>
            <span style={{ color: 'var(--brand)' }}>V</span>eridian
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--text-muted)' }}>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#e8f5ef] transition-colors"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={LOGIN_URL}
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--brand)', color: '#050a09' }}
            >
              Get started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-0.5 w-5 rounded-full"
              style={{ backgroundColor: '#e8f5ef' }}
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-5 rounded-full"
              style={{ backgroundColor: '#e8f5ef' }}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-0.5 w-5 rounded-full"
              style={{ backgroundColor: '#e8f5ef' }}
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              backgroundColor: 'rgba(5, 10, 9, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(29, 158, 117, 0.1)',
            }}
          >
            <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4 text-sm">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-2 transition-colors hover:text-[#e8f5ef]"
                  style={{ color: 'var(--text-muted)' }}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-3 border-t" style={{ borderColor: 'var(--border)' }}>
                <Link
                  href={LOGIN_URL}
                  className="text-center py-2.5 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'var(--brand)', color: '#050a09' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Get started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
