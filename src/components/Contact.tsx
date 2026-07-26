import { useState } from 'react';
import {
  AlertCircle, Check, CheckCircle2, Copy, Github, Linkedin,
  Loader2, Mail, Phone, Send,
} from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { useReveal } from '@/hooks/useReveal';

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfW8kbB0B19_kjBtnOzhDwf36tHYXBBjYWsGm8FGl28zkCpnQ/formResponse';
const ENTRY_NAME = 'entry.2036202323';
const ENTRY_EMAIL = 'entry.1930735387';
const ENTRY_SUBJECT = 'entry.504223870';
const ENTRY_MESSAGE = 'entry.19948800';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const { t } = useLanguage();
  const { ref, visible } = useReveal();
  const [status, setStatus] = useState<Status>('idle');
  const [revealed, setRevealed] = useState<'email' | 'phone' | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleReveal = (key: 'email' | 'phone') => {
    setRevealed(revealed === key ? null : key);
    setCopied(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');

    const iframe = document.getElementById('google-form-iframe') as HTMLIFrameElement;
    if (!iframe) { setStatus('error'); return; }

    const tempForm = document.createElement('form');
    tempForm.method = 'POST';
    tempForm.action = GOOGLE_FORM_ACTION;
    tempForm.target = 'google-form-iframe';

    const fields: [string, string][] = [
      [ENTRY_NAME, form.name.trim()],
      [ENTRY_EMAIL, form.email.trim()],
      [ENTRY_SUBJECT, form.subject.trim()],
      [ENTRY_MESSAGE, form.message.trim()],
    ];

    fields.forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      tempForm.appendChild(input);
    });

    document.body.appendChild(tempForm);
    tempForm.submit();
    document.body.removeChild(tempForm);

    const onLoad = () => {
      iframe.removeEventListener('load', onLoad);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    };
    iframe.addEventListener('load', onLoad);

    setTimeout(() => {
      iframe.removeEventListener('load', onLoad);
      setStatus((s) => (s === 'loading' ? 'success' : s));
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const iconBtnStyle = (active: boolean) => ({
    background: active ? 'var(--primary)' : 'var(--card-bg)',
    color: active ? 'var(--btn-text)' : 'var(--text-dim)',
    borderColor: active ? 'var(--primary)' : 'var(--border)',
  });

  const revealedValue = revealed === 'email' ? 'abrahymbdh703@gmail.com' : '01037847989';
  const revealedHref = revealed === 'email' ? 'mailto:abrahymbdh703@gmail.com' : 'tel:01037847989';

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <iframe id="google-form-iframe" name="google-form-iframe" className="hidden" aria-hidden title="form-submit" />

      <div className="container-x">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}
        >
          <span className="eyebrow justify-center">{t('contactEyebrow')}</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            <span style={{ color: 'var(--text-head)' }}>{t('contactTitle1')}</span>{' '}
            <span className="text-gradient-brand">{t('contactTitle2')}</span>
          </h2>
          <p className="mt-4" style={{ color: 'var(--text-dim)' }}>{t('contactDesc')}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left: Contact info */}
          <div className="space-y-6">
            {/* Icon buttons + reveal */}
            <div className="card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleReveal('email')}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  style={iconBtnStyle(revealed === 'email')}
                  aria-label={t('contactEmail')}
                >
                  <Mail className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => handleReveal('phone')}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  style={iconBtnStyle(revealed === 'phone')}
                  aria-label={t('contactPhone')}
                >
                  <Phone className="h-6 w-6" />
                </button>

                <div className="mx-1 h-8 w-px" style={{ background: 'var(--border)' }} />

                <a
                  href="https://github.com/abrahymbdh703-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  style={iconBtnStyle(false)}
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/abd-elftah-ebrahem-38a49240a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  style={iconBtnStyle(false)}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>

              {/* Reveal panel */}
              {revealed && (
                <div
                  className="mt-5 animate-fade-up rounded-2xl p-4"
                  style={{ background: 'var(--bg-muted)' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="font-bold text-sm sm:text-base truncate"
                      style={{ color: 'var(--text-head)' }}
                      dir="ltr"
                    >
                      {revealedValue}
                    </span>
                    <div className="flex gap-2 shrink-0">
                      <a
                        href={revealedHref}
                        className="btn-primary text-xs px-4 py-2"
                      >
                        {revealed === 'email' ? t('contactEmail') : t('contactPhone')}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(revealedValue)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border-2 transition-colors"
                        style={{
                          borderColor: copied ? 'var(--primary)' : 'var(--border)',
                          color: copied ? 'var(--primary)' : 'var(--text-dim)',
                        }}
                        aria-label={t('contactCopied')}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Note */}
            <div className="card p-6">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                {t('contactNote')}
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="card p-6 md:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t('fieldName')} name="name" value={form.name} onChange={handleChange} placeholder={t('fieldNamePlaceholder')} required />
              <Field label={t('fieldEmail')} name="email" type="email" value={form.email} onChange={handleChange} placeholder={t('fieldEmailPlaceholder')} required />
            </div>

            <div className="mt-5">
              <Field label={t('fieldSubject')} name="subject" value={form.subject} onChange={handleChange} placeholder={t('fieldSubjectPlaceholder')} />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium" style={{ color: 'var(--text-base)' }}>
                {t('fieldMessage')} <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t('fieldMessagePlaceholder')}
                className="w-full resize-none rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none"
                style={{ border: '1.5px solid var(--border)', background: 'var(--card-bg-soft)', color: 'var(--text-head)' }}
              />
            </div>

            {status === 'error' && (
              <div className="mt-5 flex items-start gap-3 rounded-xl p-4 text-sm" style={{ border: '1.5px solid #ef4444', background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{t('formError')}</span>
              </div>
            )}
            {status === 'success' && (
              <div className="mt-5 flex items-start gap-3 rounded-xl p-4 text-sm" style={{ border: '1.5px solid var(--primary)', background: 'var(--primary-bg)', color: 'var(--primary)' }}>
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{t('formSuccess')}</span>
              </div>
            )}

            <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70">
              {status === 'loading' ? (
                <><Loader2 className="h-4 w-4 animate-spin" />{t('sending')}</>
              ) : (
                <><Send className="h-4 w-4" />{t('send')}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, value, onChange, type = 'text', placeholder, required,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium" style={{ color: 'var(--text-base)' }}>
        {label} {required && <span style={{ color: 'var(--primary)' }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none"
        style={{ border: '1.5px solid var(--border)', background: 'var(--card-bg-soft)', color: 'var(--text-head)' }}
      />
    </div>
  );
}
