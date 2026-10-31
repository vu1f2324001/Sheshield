/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sheshield: {
          rose: '#E85D8E',
          plum: '#5B214E',
          purple: '#7C3AED',
          lavender: '#F3E8FF',
          blush: '#FCE7F3',
          cream: '#FFF9F5',
          softRose: '#FFF1F5',
          textDark: '#241A24',
          textMuted: '#6B6170',
          border: '#E9DDE6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
