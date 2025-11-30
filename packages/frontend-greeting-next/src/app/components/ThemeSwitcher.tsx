'use client'

import * as Toggle from '@radix-ui/react-toggle'
import { Badge } from '@radix-ui/themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

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
