/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'rounded-full',
    'hover:bg-blue-600',
    'bg-blue-500',
    'text-white',
    'transition-colors',
    'duration-200'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 