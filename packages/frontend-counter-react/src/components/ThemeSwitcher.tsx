import * as Toggle from '@radix-ui/react-toggle'
import { Badge } from '@radix-ui/themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { detectBrowserTheme } from '~~/helpers/theme'

const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage('theme', detectBrowserTheme(), {
    raw: true,
  })

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme!)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Toggle.Root aria-label="Toggle theme" onPressedChange={toggleTheme}>
      <Badge className="rounded-full p-2 shadow" highContrast={true}>
        {theme === 'dark' ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </Badge>
    </Toggle.Root>
  )
}

export default ThemeSwitcher
