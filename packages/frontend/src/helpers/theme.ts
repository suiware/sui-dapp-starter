import { TTheme } from '~~/types/TTheme'
import { darkTheme, lightTheme } from '../config/themes'

export const detectBrowserTheme = (): TTheme => {
  return !('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const getThemeSettings = () => [
  {
    // Default to light theme.
    variables: lightTheme,
  },
  {
    // React to the color scheme media query.
    mediaQuery: '(prefers-color-scheme: dark)',
    variables: darkTheme,
  },
  {
    // Reacts to the dark class.
    selector: '.dark',
    variables: darkTheme,
  },
]
