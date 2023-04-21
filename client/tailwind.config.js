/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
