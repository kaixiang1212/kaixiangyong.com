/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "light_bg_primary": "#eff2f6",
        "light_bg_secondary": colors.white,
        "light_text_primary": "#020202",
        "light_text_secondary": "#495057",
        "dark_bg_primary": "#202634",
        "dark_bg_secondary": "#293042",
      },
    },
  },
  plugins: [],
}
