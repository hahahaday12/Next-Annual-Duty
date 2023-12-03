import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-Blue': '#2656f6',
      },
    },
    fontFamily: {
      LINESeedKRBd: ['LINESeedKR-Bd'],
    },
  },
  plugins: [],
};
export default config;
