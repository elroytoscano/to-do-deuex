const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  enabled: true, //enabled:false
  content: ['./src/**/*.{html,js}', './src/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    fill: ['hover', 'focus'],
  },
  plugins: [],
};
