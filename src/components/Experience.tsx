import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { useReveal } from '@/hooks/useReveal';

export function Experience() {
  const { t } = useLanguage();
  const { ref, visible } = useReveal();

  const timeline = [
    { type: 'work'      as const, role: t('exp1Role'), org: t('exp1Org'), desc: t('exp1Desc'), period: '2023 — Now' },
    { type: 'work'      as const, role: t('exp2Role'), org: t('exp2Org'), desc: t('exp2Desc'), period: '2021 — 2023' },
    { type: 'work'      as const, role: t('exp3Role'), org: t('exp3Org'), desc: t('exp3Desc'), period: '2019 — 2021' },
    { type: 'education' as const, role: t('exp4Role'), org: t('exp4Org'), desc: t('exp4Desc'), period: '2015 — 2019' },
  ];

  return (
    <section id="experience" className="section-alt py-24 md:py-32">
      <div className="container-x">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}
        >
          <span className="eyebrow justify-center">{t('experienceEyebrow')}</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            <span style={{ color: 'var(--text-head)' }}>{t('experienceTitle1')}</span>{' '}
            <span className="text-gradient-brand">{t('experienceTitle2')}</span>
          </h2>
          <p className="mt-4" style={{ color: 'var(--text-dim)' }}>{t('experienceDesc')}</p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <ol className="relative border-s ps-8" style={{ borderColor: 'var(--border)' }}>
            {timeline.map((entry, i) => {
              const Icon = entry.type === 'work' ? Briefcase : GraduationCap;
              return (
                <li
                  key={entry.role}
                  className={`relative mb-10 last:mb-0 reveal ${visible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span
                    className="absolute -start-[2.6rem] flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ border: '1.5px solid var(--border)', background: 'var(--card-bg)', color: 'var(--primary)' }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text-head)' }}>{entry.role}</h3>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
                        dir="ltr"
                      >
                        {entry.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--primary)' }}>{entry.org}</p>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>{entry.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
