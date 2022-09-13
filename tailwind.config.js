/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xl: '1.5rem',
      lg: '1.125rem',
      md: '0.938rem',
      sm: '0.813rem',
      xs: '0.75rem',
    },
    colors: {
      black: 'rgba(0,1,18,1)',
      'very-dark-grey': 'rgba(32,33,44,1)',
      'dark-grey': 'rgba(43,44,55,1)',
      'lines(dark)': 'rgba(62,63,78,1)',
      'medium-grey': 'rgba(130,143,163,1)',
      'lines(light)': 'rgba(228,235,250,1)',
      'light-grey': 'rgba(244,247,253,1)',
      white: 'rgba(255,255,255,1)',
      'main-purple': 'rgba(99,95,199,1)',
      'main-purple(hover)': 'rgba(168,164,255,1)',
      red: 'rgba(234,85,85,1)',
      'red(hover)': 'rgba(255, 152, 152, 1)',
    },
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
};
