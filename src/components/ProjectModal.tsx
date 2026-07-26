import { useEffect } from 'react';
import { X, ExternalLink, Code2 } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import type { TranslationKey } from '@/lib/translations';

export interface ProjectData {
  nameKey: TranslationKey;
  catKey: TranslationKey;
  descKey: TranslationKey;
  link: string;
  tags: string[];
  techStack: { name: string; color: string }[];
  image: string;
  featured?: boolean;
}

interface Props {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-up"
      onClick={onClose}
    >
      {/* Blurred image background — gives the frosted transparency effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.image}
          alt=""
          aria-hidden
          className="h-full w-full object-cover scale-110"
          style={{ filter: 'blur(50px) brightness(0.35)' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(12,10,9,0.55)' }} />
      </div>

      {/* Frosted glass card */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1.5px solid rgba(255,255,255,0.15)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-white/20"
          style={{ background: 'rgba(0,0,0,0.4)', color: '#fff', backdropFilter: 'blur(8px)' }}
          aria-label={t('projectClose')}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Project image — clear, not blurred */}
        <div className="relative h-48 sm:h-60 overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={t(project.nameKey)}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-5">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-2"
              style={{ background: 'var(--primary)', color: 'var(--btn-text)' }}
            >
              {t(project.catKey)}
            </span>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              {t(project.nameKey)}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {/* Description */}
          <h3
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3"
            style={{ color: 'var(--primary)' }}
          >
            <Code2 className="h-4 w-4" />
            {t('projectDescription')}
          </h3>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {t(project.descKey)}
          </p>

          {/* Tech stack */}
          <h3
            className="text-sm font-bold uppercase tracking-wider mb-4"
            style={{ color: 'var(--primary)' }}
          >
            {t('projectTechStack')}
          </h3>
          <div className="flex flex-wrap gap-2.5 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: tech.color }} />
                {tech.name}
              </span>
            ))}
          </div>

          {/* Show project button */}
          <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-base py-4"
            >
              <ExternalLink className="h-5 w-5" />
              {t('projectVisit')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
