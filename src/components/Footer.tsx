import { useState } from 'react';
import {
  ArrowUp, Check, Copy, Github, Linkedin, Mail, Phone, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/lib/language';


type SocialKey = 'email' | 'phone' | null;

const EMAIL = 'abrahymbdh703@gmail.com';
const PHONE = '01037849789';

export function Footer() {
  const { t, dir } = useLanguage();
  const [revealed, setRevealed] = useState<SocialKey>(null);
  const [copied, setCopied] = useState(false);

  const handleReveal = (key: 'email' | 'phone') => {
    setRevealed(revealed === key ? null : key);
    setCopied(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links: { href: string; label: string }[] = [
    { href: '#about',      label: t('navAbout') },
    { href: '#skills',     label: t('navSkills') },
    { href: '#projects',   label: t('navProjects') },
    { href: '#experience', label: t('navExperience') },
    { href: '#contact',    label: t('navContact') },
  ];

  const revealedValue = revealed === 'email' ? EMAIL : PHONE;
  const revealedHref = revealed === 'email' ? `mailto:${EMAIL}` : `tel:${PHONE}`;

  return (
    <footer
      className="relative overflow-hidden py-16"
      style={{ background: 'var(--bg-subtle)', borderTop: '1.5px solid var(--border)' }}
    >
      {/* Decorative top glow */}
      <div
        className="pointer-events-none absolute -top-px inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }}
      />

      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand + social cards */}
          <div>
            <a href="#home" className="flex items-center gap-2.5 font-extrabold font-display">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black transition-transform duration-300 hover:scale-110 hover:rotate-6"
                style={{ background: 'var(--primary)', color: 'var(--btn-text)' }}
              >
                A
              </span>
              <span style={{ color: 'var(--text-head)' }}>
                {t('brandName')}
                <span style={{ color: 'var(--primary)' }}>.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              {t('footerTagline')}
            </p>

            {/* Interactive social cards */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/abd-elftah-ebrahem-38a49240a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group/card flex h-11 w-11 items-center justify-center rounded-xl border-[1.5px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                style={{ border: '1.5px solid var(--border)', background: 'var(--card-bg)' }}
              >
                <span
                  className="flex h-full w-full items-center justify-center rounded-[10px] transition-all duration-300 group-hover/card:scale-105 group-hover/card:rotate-3"
                  style={{ color: 'var(--text-head)' }}
                >
                  <Linkedin className="h-5 w-5" />
                </span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/abrahymbdh703-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group/card flex h-11 w-11 items-center justify-center rounded-xl border-[1.5px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                style={{ border: '1.5px solid var(--border)', background: 'var(--card-bg)' }}
              >
                <span
                  className="flex h-full w-full items-center justify-center rounded-[10px] transition-all duration-300 group-hover/card:scale-105 group-hover/card:-rotate-3"
                  style={{ color: 'var(--text-head)' }}
                >
                  <Github className="h-5 w-5" />
                </span>
              </a>

              {/* Email — click to reveal */}
              <button
                type="button"
                onClick={() => handleReveal('email')}
                aria-label={t('contactEmail')}
                className="group/card flex h-11 w-11 items-center justify-center rounded-xl border-[1.5px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                style={{
                  border: `1.5px solid ${revealed === 'email' ? 'var(--primary)' : 'var(--border)'}`,
                  background: revealed === 'email' ? 'var(--primary-bg)' : 'var(--card-bg)',
                }}
              >
                <span
                  className="flex h-full w-full items-center justify-center rounded-[10px] transition-all duration-300 group-hover/card:scale-105 group-hover/card:rotate-3"
                  style={{ color: 'var(--primary)' }}
                >
                  <Mail className="h-5 w-5" />
                </span>
              </button>

              {/* Phone — click to reveal */}
              <button
                type="button"
                onClick={() => handleReveal('phone')}
                aria-label={t('contactPhone')}
                className="group/card flex h-11 w-11 items-center justify-center rounded-xl border-[1.5px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                style={{
                  border: `1.5px solid ${revealed === 'phone' ? 'var(--primary)' : 'var(--border)'}`,
                  background: revealed === 'phone' ? 'var(--primary-bg)' : 'var(--card-bg)',
                }}
              >
                <span
                  className="flex h-full w-full items-center justify-center rounded-[10px] transition-all duration-300 group-hover/card:scale-105 group-hover/card:-rotate-3"
                  style={{ color: 'var(--primary)' }}
                >
                  <Phone className="h-5 w-5" />
                </span>
              </button>
            </div>

            {/* Reveal panel */}
            {revealed && (
              <div
                className="mt-3 max-w-xs animate-fade-up rounded-2xl p-4"
                style={{ background: 'var(--bg-muted)', border: '1.5px solid var(--border)' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="font-bold text-xs sm:text-sm truncate"
                    style={{ color: 'var(--text-head)' }}
                    dir="ltr"
                  >
                    {revealedValue}
                  </span>
                  <div className="flex gap-2 shrink-0">
                    <a href={revealedHref} className="btn-primary text-[10px] px-3 py-1.5">
                      {revealed === 'email' ? t('contactEmail') : t('contactPhone')}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(revealedValue)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border-2 transition-colors"
                      style={{
                        borderColor: copied ? 'var(--primary)' : 'var(--border)',
                        color: copied ? 'var(--primary)' : 'var(--text-dim)',
                      }}
                      aria-label={t('contactCopied')}
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links — interactive */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-head)' }}>
              {t('footerQuickLinks')}
            </h3>
            <ul className="mt-5 space-y-1">
              {links.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group/link flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-300"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    <span
                      className="flex h-5 w-5 items-center justify-center text-[10px] font-bold rounded transition-all duration-300 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0"
                      style={{ color: 'var(--primary)' }}
                    >
                      0{i + 1}
                    </span>
                    <span className="relative transition-colors duration-300 group-hover/link:text-[var(--text-head)]">
                      {l.label}
                      <span
                        className="absolute -bottom-0.5 start-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover/link:w-full"
                        style={{ background: 'var(--primary)' }}
                      />
                    </span>
                    <ArrowRight
                      className={`h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover/link:opacity-100 ${dir === 'rtl' ? 'rotate-180 -translate-x-2 group-hover/link:translate-x-0' : 'translate-x-2 group-hover/link:translate-x-0'}`}
                      style={{ color: 'var(--primary)' }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-head)' }}>
              {t('footerContact')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm" style={{ color: 'var(--text-dim)' }}>
              <li>
                <a
                  href="mailto:abrahymbdh703@gmail.com"
                  className="group/contact inline-flex items-center gap-2 transition-colors hover:text-current"
                  dir="ltr"
                >
                  <Mail className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/contact:scale-125" style={{ color: 'var(--primary)' }} />
                  abrahymbdh703@gmail.com
                </a>
              </li>
              <li dir="ltr">
                <a
                  href="tel:01037849789"
                  className="group/contact inline-flex items-center gap-2 transition-colors hover:text-current"
                >
                  <Phone className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/contact:scale-125" style={{ color: 'var(--primary)' }} />
                  01037849789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row"
          style={{ borderTop: '1.5px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-dim2)' }}>
            © {new Date().getFullYear()} Abd Elftah Ebrahem. {t('footerCopyright')}
          </p>
          <a
            href="#home"
            className="group/top inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-1"
            style={{ border: '1.5px solid var(--border)', color: 'var(--text-dim)' }}
          >
            {t('footerBackToTop')}
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover/top:-translate-y-1" style={{ color: 'var(--primary)' }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
