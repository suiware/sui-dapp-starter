import { darkTheme, lightTheme } from '../config/themes'
import { TTheme } from '../types/TTheme'

export const detectBrowserTheme = (): TTheme => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return !('theme' in window.localStorage) &&
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
