import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.theme === 'dark'
  )

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  useEffect(() => {
    // Add listener to update styles
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) =>
        onSelectMode(e.matches ? 'dark' : 'light')
      )

    // Setup dark/light mode for the first time
    onSelectMode(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    )

    // Remove listener
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {})
    }
  }, [])

  const onSelectMode = (mode) => {
    const html = window.document.documentElement

    if (mode === 'dark') {
      html.classList.remove('light')
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
    }

    localStorage.setItem('theme', mode)
  }

  useEffect(() => {
    const html = window.document.documentElement

    const prevTheme = isDarkMode ? 'light' : 'dark'
    html.classList.remove(prevTheme)

    const nextTheme = isDarkMode ? 'dark' : 'light'
    html.classList.add(nextTheme)

    localStorage.setItem('theme', nextTheme)
  }, [isDarkMode])

  return [isDarkMode, toggleDarkMode]
}
