import { ArrowDown, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { useCountUp } from '@/hooks/useCountUp';

const SOCIALS = [
  { href: 'https://github.com/abrahymbdh703-dev',                      label: 'GitHub',   icon: Github },
  { href: 'https://www.linkedin.com/in/abd-elftah-ebrahem-38a49240a/', label: 'LinkedIn', icon: Linkedin },
];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp<HTMLParagraphElement>(value);
  return (
    <div>
      <p ref={ref} className="text-3xl font-extrabold font-display text-gradient-brand tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{label}</p>
    </div>
  );
}

export function Hero() {
  const { t, dir } = useLanguage();

  const photoOrder = dir === 'rtl' ? 'order-1 lg:order-1' : 'order-1 lg:order-2';
  const textOrder  = dir === 'rtl' ? 'order-2 lg:order-2' : 'order-2 lg:order-1';
  const gridCols   = dir === 'rtl'
    ? 'lg:grid-cols-[0.95fr_1.05fr]'
    : 'lg:grid-cols-[1.05fr_0.95fr]';

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-28 pb-20"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-aurora-light dark:bg-aurora-dark" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-40"
        style={{ backgroundSize: '52px 52px' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 start-[-10%] h-[400px] w-[400px] rounded-full blur-3xl animate-float opacity-20"
        style={{ background: 'var(--primary)' }}
        aria-hidden
      />

      <div className={`container-x relative grid items-center gap-10 ${gridCols} lg:gap-16`}>
        {/* ── Photo column ── */}
        <div className={`mx-auto w-full max-w-[380px] ${photoOrder}`}>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {/* Decorative offset frame */}
            <div
              className="absolute -bottom-4 -end-4 h-full w-full rounded-[2.5rem] border-2"
              style={{ borderColor: 'var(--primary)', opacity: 0.3 }}
              aria-hidden
            />
            {/* Glow */}
            <div
              className="absolute -inset-2 rounded-[2.5rem] opacity-30 blur-2xl"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
              aria-hidden
            />
            {/* Photo */}
            <div
              className="relative overflow-hidden rounded-[2.5rem] border-2 shadow-lift"
              style={{ borderColor: 'var(--border-hover)' }}
            >
              <img
                src="/images/profile.jpg"
                alt="Abd Elftah Ebrahem"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '480px', objectPosition: 'top center' }}
              />
            </div>

            {/* Floating availability chip */}
            <div
              className="absolute top-4 start-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--primary-h)' }}
            >
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
              {t('heroAvailable')}
            </div>
          </div>
        </div>

        {/* ── Text column ── */}
        <div className={textOrder}>
          <span className="eyebrow animate-fade-up">
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
            {t('heroStatus')}
          </span>

          <h1
            className="mt-6 text-4xl font-extrabold leading-[1.1] text-balance sm:text-5xl md:text-6xl lg:text-[4.5rem] animate-fade-up"
            style={{ animationDelay: '0.16s' }}
          >
            <span className="text-gradient">{t('heroTitle1')}</span>{' '}
            <span className="text-gradient-brand">{t('heroTitle2')}</span>
            <br />
            <span className="text-gradient">{t('heroTitle3')}</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg animate-fade-up"
            style={{ color: 'var(--text-dim)', animationDelay: '0.24s' }}
          >
            {t('heroDesc')}
          </p>

          {/* Animated stats */}
          <div
            className="mt-8 flex flex-wrap gap-x-8 gap-y-4 animate-fade-up"
            style={{ animationDelay: '0.32s' }}
          >
            <Stat value={5}  suffix="+"  label={t('heroStat1')} />
            <Stat value={40} suffix="+"  label={t('heroStat2')} />
            <Stat value={98} suffix="%"  label={t('heroStat4')} />
          </div>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <a href="#projects" className="btn-primary">{t('heroViewWork')}</a>
            <a href="#contact" className="btn-ghost">{t('heroContactMe')}</a>
          </div>

          {/* Unified contact + socials row */}
          <div
            className="mt-8 flex flex-wrap items-center gap-2.5 animate-fade-up"
            style={{ animationDelay: '0.48s' }}
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1.5px solid var(--border)', color: 'var(--text-dim)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-dim)';
                }}
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
            <a
              href="mailto:abrahymbdh703@gmail.com"
              aria-label={t('contactEmail')}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1.5px solid var(--border)', color: 'var(--text-dim)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-dim)';
              }}
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="tel:01037847989"
              aria-label={t('contactPhone')}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1.5px solid var(--border)', color: 'var(--text-dim)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-dim)';
              }}
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-colors"
        style={{ color: 'var(--text-dim2)' }}
        aria-label={t('heroScroll')}
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
