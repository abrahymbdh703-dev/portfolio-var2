/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'system-ui', 'sans-serif'],
      },
      colors: {
        amber: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(120,53,15,0.04), 0 8px 24px rgba(120,53,15,0.06)',
        lift: '0 4px 8px rgba(120,53,15,0.06), 0 20px 48px rgba(120,53,15,0.12)',
        glow: '0 0 0 1px rgba(245,158,11,0.3), 0 12px 40px rgba(245,158,11,0.22)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(180,83,9,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(180,83,9,0.04) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'aurora-light':
          'radial-gradient(55% 65% at 80% 0%, rgba(245,158,11,0.14) 0%, transparent 60%), radial-gradient(40% 50% at 15% 20%, rgba(249,115,22,0.08) 0%, transparent 60%)',
        'aurora-dark':
          'radial-gradient(55% 65% at 80% 0%, rgba(245,158,11,0.16) 0%, transparent 60%), radial-gradient(40% 50% at 15% 20%, rgba(249,115,22,0.10) 0%, transparent 60%)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        float:     'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
