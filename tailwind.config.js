/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Pontano Sans', 'sans-serif'],
        secondary: ['Stint Ultra Expanded', 'serif'],
      },
      colors: {
        primary: '#6096ba',
        secondary: '#a3cef1',
        tertiary: '#e7ecef',
        extra: '#143760'

      }
    },
  },
  plugins: [],
}

