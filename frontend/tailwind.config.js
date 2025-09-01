/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0077b5', // Main primary color
          600: '#006699',
          700: '#00557a',
          800: '#00445c',
          900: '#00333d',
        },
        secondary: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#caccce', // Main secondary color
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#3c4043',
          900: '#202124',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#86888a', // Medium gray
          600: '#6b7280',
          700: '#4b5563',
          800: '#313335', // Dark gray
          900: '#000000', // Black
        },
        background: '#FFFFFF',
        surface: '#FFFFFF',
        // Direct color references for easy use
        'medium-gray': '#86888a',
        'dark-gray': '#313335',
        'pure-black': '#000000',
      },
    },
  },
  plugins: [],
}