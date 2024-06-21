/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        ghastly: "url('/img/ghastly.png')",
      },
    },
  },
  plugins: [],
};
