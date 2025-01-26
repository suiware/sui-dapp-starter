/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  tailwindConfig: './tailwind.config.mjs',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'c', 'cn'],
}

export default config;
