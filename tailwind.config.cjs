/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [...['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'].map((c) => `bg-${c}-500`)],
}
