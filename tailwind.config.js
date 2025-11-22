/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        },
        'alert-red': '#ef4444',
        'alert-yellow': '#eab308',
        'alert-green': '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      backdropBlur: {
        'md': '12px',
      },
    },
  },
  plugins: [],
}

