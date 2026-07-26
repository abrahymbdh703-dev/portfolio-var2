import { useState } from 'react';
import { ArrowUpLeft, ExternalLink, Eye } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { useReveal } from '@/hooks/useReveal';
import { ProjectModal, type ProjectData } from './ProjectModal';

const PROJECTS: ProjectData[] = [
  {
    nameKey: 'projectGammalName',
    catKey:  'projectGammalCat',
    descKey: 'projectGammalDesc',
    link: 'https://abrahymbdh703-dev.github.io/portfolio-website/',
    tags: ['HTML', 'CSS', 'JavaScript'],
    techStack: [
      { name: 'HTML5',   color: '#e34f26' },
      { name: 'CSS3',    color: '#1572b6' },
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'Responsive', color: '#f59e0b' },
    ],
    featured: true,
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    nameKey: 'projectLabcareName',
    catKey:  'projectLabcareCat',
    descKey: 'projectLabcareDesc',
    link: 'https://abrahymbdh703-dev.github.io/labcare-website/',
    tags: ['HTML', 'CSS', 'JavaScript'],
    techStack: [
      { name: 'HTML5',   color: '#e34f26' },
      { name: 'CSS3',    color: '#1572b6' },
      { name: 'JavaScript', color: '#f7df1e' },
    ],
    image: 'https://images.pexels.com/photos/5722164/pexels-photo-5722164.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    nameKey: 'projectSignupName',
    catKey:  'projectSignupCat',
    descKey: 'projectSignupDesc',
    link: 'https://abrahymbdh703-dev.github.io/signup-website/',
    tags: ['HTML', 'CSS', 'JavaScript'],
    techStack: [
      { name: 'HTML5',   color: '#e34f26' },
      { name: 'CSS3',    color: '#1572b6' },
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'Form Validation', color: '#f59e0b' },
    ],
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export function Projects() {
  const { t } = useLanguage();
  const { ref, visible } = useReveal();
  const [active, setActive] = useState<ProjectData | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-x">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} flex flex-wrap items-end justify-between gap-6`}
        >
          <div className="max-w-xl">
            <span className="eyebrow">{t('projectsEyebrow')}</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              <span style={{ color: 'var(--text-head)' }}>{t('projectsTitle1')}</span>{' '}
              <span className="text-gradient-brand">{t('projectsTitle2')}</span>
            </h2>
          </div>
          <p className="max-w-sm" style={{ color: 'var(--text-dim)' }}>{t('projectsDesc')}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <article
              key={project.nameKey}
              className={`card group relative cursor-pointer overflow-hidden hover:shadow-lift hover:-translate-y-1 ${
                project.featured ? 'md:col-span-2' : ''
              }`}
              onClick={() => setActive(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(project)}
            >
              <div className={`grid ${project.featured ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                <div className={`relative overflow-hidden ${project.featured ? 'h-64 md:h-full' : 'h-56'}`}>
                  <img
                    src={project.image}
                    alt={t(project.nameKey)}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                  {/* Hover overlay with "view details" */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'rgba(12,10,9,0.5)' }}>
                    <span className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white" style={{ background: 'var(--primary)' }}>
                      <Eye className="h-4 w-4" />
                      {t('projectViewDetails')}
                    </span>
                  </div>

                  <span
                    className="absolute top-4 end-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                    style={{ background: 'rgba(12,10,9,0.8)', color: 'var(--primary)' }}
                  >
                    {t(project.catKey)}
                  </span>
                </div>

                <div className="flex flex-col p-6 md:p-8">
                  <h3 className="text-xl font-bold transition-colors md:text-2xl" style={{ color: 'var(--text-head)' }}>
                    {t(project.nameKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-dim)' }}>
                    {t(project.descKey)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ border: '1.5px solid var(--border)', background: 'var(--primary-bg)', color: 'var(--text-base)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4 pt-4" style={{ borderTop: '1.5px solid var(--border)' }}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                      style={{ color: 'var(--primary)' }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t('projectLive')}
                    </a>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setActive(project); }}
                      className="mr-auto flex h-9 w-9 items-center justify-center rounded-full transition-all group-hover:scale-110"
                      style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
                      aria-label={t('projectViewDetails')}
                    >
                      <ArrowUpLeft className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
