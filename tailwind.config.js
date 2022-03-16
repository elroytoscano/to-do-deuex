const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  enabled: true, //enabled:false
  content: ['./**/*.html,.js'],
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
