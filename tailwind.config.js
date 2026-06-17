/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        'green-mid': 'var(--color-green-mid)',
        'green-light': 'var(--color-green-light)',
        lavender: 'var(--color-lavender)',
        'lavender-light': 'var(--color-lavender-light)',
        app: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
        },
        foreground: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Segoe UI Emoji',
          'Noto Color Emoji',
          'Apple Color Emoji',
          'sans-serif',
        ],
      },
      boxShadow: {
        nav: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        card: '0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
      },
      keyframes: {
        'modal-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'modal-in': 'modal-in 0.22s ease-out forwards',
        'fade-slide-up': 'fade-slide-up 0.3s ease-out 0.15s both',
      },
    },
  },
  plugins: [],
};
