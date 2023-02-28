import { useEffect, useState } from 'react'

const getUserPreference = () => {
  const storedTheme = localStorage.getItem('theme')
  const hasStoredPreference = typeof storedTheme === 'string'
  if (hasStoredPreference) {
    return storedTheme === 'dark'
  }

  const userPreference = window.matchMedia('(prefers-color-scheme: dark)')
  const hasUserPreference = typeof userPreference.matches === 'boolean'
  if (hasUserPreference) {
    return userPreference.matches
  }

  return true
}

const setMode = (isDarkMode) => {
  const html = window.document.documentElement
  const prevTheme = isDarkMode ? 'light' : 'dark'
  const nextTheme = isDarkMode ? 'dark' : 'light'

  html.classList.remove(prevTheme)
  html.classList.add(nextTheme)

  localStorage.setItem('theme', nextTheme)
}

export const useDarkMode = (storage = localStorage, dom = window.document) => {
  const [isDarkMode, setIsDarkMode] = useState(() => getUserPreference(storage))
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  useEffect(() => {
    const onChange = (e) => {
      const isDark = e.matches
      setIsDarkMode(isDark)
    }

    const userPreference = window.matchMedia('(prefers-color-scheme: dark)')
    userPreference.addEventListener('change', onChange)

    return () => {
      userPreference.removeEventListener('change', onChange)
    }
  }, [])

  useEffect(() => {
    setMode(isDarkMode, dom)
  }, [isDarkMode])

  return [isDarkMode, toggleDarkMode]
}
