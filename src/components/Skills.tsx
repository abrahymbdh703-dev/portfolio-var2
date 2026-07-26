import { Code2, Wrench, Palette } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { useReveal } from '@/hooks/useReveal';

type Skill = { name: string; level: number };
type Group = {
  titleKey: 'skillsGroup1' | 'skillsGroup2' | 'skillsGroup3';
  icon: typeof Code2;
  skills: Skill[];
};

const GROUPS: Group[] = [
  {
    titleKey: 'skillsGroup1',
    icon: Code2,
    skills: [
      { name: 'React',        level: 95 },
      { name: 'TypeScript',   level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Next.js',      level: 85 },
    ],
  },
  {
    titleKey: 'skillsGroup2',
    icon: Wrench,
    skills: [
      { name: 'Supabase',  level: 85 },
      { name: 'Node.js',   level: 80 },
      { name: 'Git',       level: 90 },
      { name: 'Vite',      level: 88 },
    ],
  },
  {
    titleKey: 'skillsGroup3',
    icon: Palette,
    skills: [
      { name: 'Figma',         level: 82 },
      { name: 'UI / UX',       level: 88 },
      { name: 'Responsive',    level: 95 },
      { name: 'Accessibility', level: 80 },
    ],
  },
];

function SkillRow({ skill, visible, delay }: { skill: Skill; visible: boolean; delay: number }) {
  return (
    <li className="group/skill">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2.5 font-medium" style={{ color: 'var(--text-base)' }}>
          <span
            className="h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover/skill:scale-150"
            style={{ background: 'var(--primary)' }}
          />
          {skill.name}
        </span>
        <span className="font-bold tabular-nums" style={{ color: 'var(--primary)' }}>
          {skill.level}%
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: 'var(--bg-muted)' }}>
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-out"
          style={{
            width: visible ? `${skill.level}%` : '0%',
            transitionDelay: `${delay}ms`,
            background: 'linear-gradient(to right, var(--primary), var(--accent))',
          }}
        />
      </div>
    </li>
  );
}

export function Skills() {
  const { t } = useLanguage();
  const { ref, visible } = useReveal();

  return (
    <section id="skills" className="section-alt py-24 md:py-32">
      <div className="container-x">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}
        >
          <span className="eyebrow justify-center">{t('skillsEyebrow')}</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            <span style={{ color: 'var(--text-head)' }}>{t('skillsTitle1')}</span>{' '}
            <span className="text-gradient-brand">{t('skillsTitle2')}</span>
          </h2>
          <p className="mt-4" style={{ color: 'var(--text-dim)' }}>{t('skillsDesc')}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {GROUPS.map((group, gi) => (
            <article
              key={group.titleKey}
              className="card p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="flex items-center gap-3 pb-5"
                style={{ borderBottom: '1.5px solid var(--border)' }}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
                >
                  <group.icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-head)' }}>
                  {t(group.titleKey)}
                </h3>
              </div>

              <ul className="mt-5 space-y-5">
                {group.skills.map((skill, si) => (
                  <SkillRow
                    key={skill.name}
                    skill={skill}
                    visible={visible}
                    delay={gi * 200 + si * 120 + 300}
                  />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
