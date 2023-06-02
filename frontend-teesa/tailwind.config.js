/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teesaBlueDark: '#00082D',
        teesaBlueLight: '#192C8C',
        teesaWhite: '#FBFEFA',
        teesaGrey: '#E5E5E5',
        teesaGreenDark: '#224957',
        teesaGreen: '#03D368',
      },
    },
  },
  plugins: [],
};
