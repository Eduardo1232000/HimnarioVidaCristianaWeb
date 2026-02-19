/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },
      width: {
        '18': '4.5rem',
      },
      height: {
        '26': '6.5rem',
      }
    },
  },
  plugins: [],
}