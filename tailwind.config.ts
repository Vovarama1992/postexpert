import type { Config } from "tailwindcss";
import {nextui} from '@nextui-org/react'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        'sm': {'min': '640px', 'max': '767px'},
        'md': {'min': '768px', 'max': '1023px'},
        'lg': {'min': '1024px', 'max': '1279px'},
        'xl': {'min': '1280px', 'max': '1535px'},
        '2xl': {'min': '1536px'},
      },
      padding: {
        DEFAULT: '1.25rem',
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '3.5rem',
        '2xl': '3.5rem',
      },
    },
    extend: {
      lineHeight: {
        'list': '1.4',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      gridTemplateColumns: {
        'tarrifs': 'repeat(auto-fit, minmax(260px, 1fr))',
      },
      colors: {
        'gray-1': '#A1A1AA',
        'gray-2': '#D4D4D8',
        'gray-3': '#71717A',
        'gray-4': '#3F3F46',
        'BG': '#172154',
        'BG-3': '#232E66',
        'accordion': 'rgba(239, 246, 255, 0.03)',
        'dialog-card': 'rgba(255, 255, 255, 0.04)',
        'blog-base': '#374151',
      },
      fontSize: {
        'title-1': ['20px', {
          lineHeight: '20px',
        }],
        'title-2': ['32px', {
          lineHeight: 'normal',
        }],
        'small-1': ['12px', {
          lineHeight: '20px',
        }],
        'small-2': ['16px', {
          lineHeight: '24px',
        }],
        'small-3': ['16px', {
          lineHeight: '20px',
        }],
        'chip': ['16px', {
          lineHeight: '16px',
        }],
        'small-4': ['16px', {
          lineHeight: '20px',
        }],
        'small-5': ['16px', {
          lineHeight: '18px',
        }],
        'subtitle-1': ['16px', {
          lineHeight: '24px',
        }],
        'subtitle-2': ['18px', {
          lineHeight: '24px',
          letterSpacing: '-0.01em'
        }],
        'subtitle-3': ['18px', {
          lineHeight: '28px',
        }],
        'subtitle-4': ['24px', {
          lineHeight: '28px',
        }],
        'subtitle-6': ['24px', {
          lineHeight: 'normal',
        }],
        'base': ['16px', {
          lineHeight: 'normal',
        }],
        'small': ['16px', {
          lineHeight: 'normal',
        }],
        'normal': ['16px', {
          lineHeight: 'normal',
        }], // тут много мусора, тк размеры шрифта менялись и тд. под конец рефакторинг проведу
        'site-title-4': ['54px', {
          lineHeight: '108.4%',
          fontWeight: 600
        }],
        'site-title-6': ['64px', {
          lineHeight: '72px',
          fontWeight: 500
        }],
        'site-text-2': ['18px', {
          lineHeight: '149.2%',
          letterSpacing: '-0.01em'
        }],
        'site-text-3': ['18px', {
          lineHeight: '29px',
          letterSpacing: '-1%'
        }],
        'site-text-4': ['22px', {
          lineHeight: '32px',
          letterSpacing: '-2%'
        }],
        'button-1': ['14px', {
          fontWeight: 500,
          letterSpacing: '-0.02em'
        }],
        'bottom': ['14px', {
          fontWeight: 600,
          letterSpacing: '-0.01em'
        }],
        'generate-page-text': ['18px', {
          lineHeight: '26px',
          letterSpacing: '-0.5px'
        }],
        'generate-page-text-2': ['16px', {
          lineHeight: '25px',
          letterSpacing: '-0.5px'
        }],
        'generate-page-title': ['32px', {
          lineHeight: 'normal',
          fontWeight: 600,
          letterSpacing: '-0.5px'
        }],
        'generate-page-blockquote': ['18px', {
          lineHeight: '29px',
          fontWeight: 500,
          letterSpacing: '-1px'
        }],
      },
      backgroundImage: {
        'BG-2': 'linear-gradient(178deg, #172154 1.94%, #0D1644 97.96%)',
        'line': 'linear-gradient(to bottom, rgba(23,33,84,0.090) 0%,rgba(13,22,68,0.050) 100%);',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontWeight: {
        body: '400',
        heading: '700',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(
      {
        layout: {
          radius: {
            small: "6px",
            medium: "12px",
          }
        },
        themes: {
          light: {},
          dark: {},
        },
      }
  )],
};
export default config;
