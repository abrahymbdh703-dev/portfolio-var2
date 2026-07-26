import { Code2, Heart, Lightbulb, Rocket } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { useReveal } from '@/hooks/useReveal';

export function About() {
  const { t } = useLanguage();
  const { ref, visible } = useReveal();

  const values = [
    { icon: Lightbulb, title: t('aboutValue1Title'), desc: t('aboutValue1Desc') },
    { icon: Rocket,    title: t('aboutValue2Title'), desc: t('aboutValue2Desc') },
    { icon: Heart,     title: t('aboutValue3Title'), desc: t('aboutValue3Desc') },
    { icon: Code2,     title: t('aboutValue4Title'), desc: t('aboutValue4Desc') },
  ];

  const tags = [t('aboutTag1'), t('aboutTag2'), t('aboutTag3')];

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20`}
        >
          <div>
            <span className="eyebrow">{t('aboutEyebrow')}</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              <span className="text-gradient">{t('aboutTitle1')}</span>
              <br />
              <span style={{ color: 'var(--text-head)' }}>{t('aboutTitle2')}</span>
            </h2>

            <div className="mt-8 max-w-md space-y-4 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-4 py-2 text-sm"
                  style={{ border: '1.5px solid var(--border)', background: 'var(--primary-bg)', color: 'var(--text-base)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <article
                key={v.title}
                className="card group p-6 hover:-translate-y-1 hover:shadow-lift"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
                >
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold" style={{ color: 'var(--text-head)' }}>{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
