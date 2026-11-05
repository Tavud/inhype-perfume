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
        obsidian: '#171615',
        ivory: {
          DEFAULT: '#EDE5D9',
          light: '#F6F2EC',
          muted: '#DFD4C4',
        },
        burgundy: {
          DEFAULT: '#632F39',
          dark: '#4D232B',
          light: '#7E3E4A',
        },
        champagne: {
          DEFAULT: '#B7A58D',
          dark: '#96846C',
          light: '#CDBFA9',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.18em',
        widest: '0.24em',
      },
    },
  },
  plugins: [],
};

export default config;
