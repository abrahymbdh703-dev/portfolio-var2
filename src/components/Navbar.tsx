import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: '#about',      label: t('navAbout') },
    { href: '#skills',     label: t('navSkills') },
    { href: '#projects',   label: t('navProjects') },
    { href: '#experience', label: t('navExperience') },
    { href: '#contact',    label: t('navContact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-bg shadow-soft' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Brand */}
        <a href="#home" onClick={close} className="flex items-center gap-2.5 font-extrabold font-display tracking-tight">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black transition-transform duration-300 hover:rotate-6"
            style={{ background: 'var(--primary)', color: 'var(--btn-text)', boxShadow: '0 4px 20px var(--primary-glow)' }}
          >
            A
          </span>
          <span style={{ color: 'var(--text-head)' }} className="whitespace-nowrap text-lg">
            {t('brandName')}
            <span style={{ color: 'var(--primary)' }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-current"
                style={{ color: 'var(--text-dim)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <a href="#contact" className="btn-primary hidden md:inline-flex">
            {t('navCta')}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden"
            style={{ border: '1.5px solid var(--border)', color: 'var(--text-head)' }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'var(--bg)', borderBottom: '1.5px solid var(--border)' }}
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className="block rounded-xl px-4 py-3 text-base font-medium transition-colors"
                style={{ color: 'var(--text-base)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a href="#contact" onClick={close} className="btn-primary w-full">
              {t('navCta')}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
