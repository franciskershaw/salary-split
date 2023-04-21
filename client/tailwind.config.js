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
      screens: {
        sm: '400px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
