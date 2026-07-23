/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#6B1E23',
          dark: '#4A1418',
          light: '#8B2E34',
        },
        gold: {
          DEFAULT: '#C9973E',
          light: '#E0B968',
          dark: '#A67A2E',
        },
        ivory: '#FAF3E7',
        teal: {
          DEFAULT: '#1F4B4A',
          light: '#2E6664',
        },
        ink: '#241511',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'maroon-soft': '0 12px 40px -8px rgba(107, 30, 35, 0.25)',
        'maroon-lift': '0 20px 50px -12px rgba(107, 30, 35, 0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'unfurl': 'unfurl 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        unfurl: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
