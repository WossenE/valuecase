/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary-300": '#b54f7d',
        "primary-400": '#c4618d',
        "light":'#20273838',
        "purple":'#7a95d8'
      },
    },
  },
  plugins: [],
};
