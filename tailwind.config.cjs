/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light_bg_primary: '#eff2f6',
        light_bg_secondary: colors.white,
        light_text_primary: '#020202',
        light_text_secondary: '#495057',
        dark_bg_primary: '#202634',
        dark_bg_secondary: '#293042',
        active_highlight: '#60a5fa',
        inactive_highlight: '#e2e8f0',
        dark_active_highlight: '#3b82f6',
        dark_inactive_highlight: '#334155'
      }
    }
  },
  plugins: []
};
