import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 30px 0 rgb(0 0 0 / 0.1)',
      },
      animation: {
        appear: 'appear 5s',
        disappear: 'disappear 5s',
        'spin-once': 'spin 3s',
        'single-pulse': 'single-pulse 5s',
      },
      keyframes: {
        appear: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        disappear: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'single-pulse': {
          '0%, 100%': {
            opacity: '0',
          },
          '25%, 75%': {
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
