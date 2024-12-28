/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          700: '#6A4D3F', // Your desired brown color
        },
      },
    },
  },
  plugins: [],
}

