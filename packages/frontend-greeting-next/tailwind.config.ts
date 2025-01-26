import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:not(.light *) }',
      '&:is(.dark *)',
    ],
  ],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'sds-light': 'var(--sds-light)',
        'sds-dark': 'var(--sds-dark)',
        'sds-pink': 'var(--sds-pink)',
        'sds-blue': 'var(--sds-blue)',
        'sds-accent-a11': 'var(--accent-a11)',
      },
      fontFamily: {
        inter: 'var(--sds-font-inter)',
      },
      boxShadow: {
        toast: 'inset 0 0 0 1px var(--accent-a7)',
      },
    },
  },
  plugins: [],
}

export default config
