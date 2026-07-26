import { useEffect, useRef } from 'react';

/**
 * Global mouse-following glow + card spotlight effect.
 * Adds a soft radial gradient that follows the cursor (desktop only),
 * and tracks mouse position over `.card` elements for a spotlight hover effect.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      // Card spotlight — update CSS vars on hovered card
      const card = (e.target as HTMLElement)?.closest('.card') as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }
    };

    const animate = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-[500px] w-[500px] rounded-full opacity-30 md:block"
      style={{
        background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 55%)',
        transform: 'translate(-250px, -250px)',
        marginLeft: '-250px',
        marginTop: '-250px',
      }}
      aria-hidden
    />
  );
}
