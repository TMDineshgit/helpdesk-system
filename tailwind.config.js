/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#7C3AED',
        accent: '#F59E0B',

        background: '#F8FAFC',
        surface: '#FFFFFF',

        text: {
          primary: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
        },

        success: '#16A34A',
        danger: '#DC2626',
        warning: '#D97706',
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },

  plugins: [],
};