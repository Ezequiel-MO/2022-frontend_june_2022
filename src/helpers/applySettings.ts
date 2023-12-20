export const applySettings = () => {
  const settingsString = localStorage.getItem('settings')
  if (settingsString) {
    try {
      const settings = JSON.parse(settingsString)

      document.documentElement.style.setProperty(
        '--color-primary',
        settings.colorPalette?.primary || '#0033A0'
      )
      document.documentElement.style.setProperty(
        '--color-secondary',
        settings.colorPalette?.secundary || '#009E49'
      )
      document.documentElement.style.setProperty(
        '--color-tertiary',
        settings.colorPalette?.tertiary || '#C7BAAE'
      )
      if (settings.fonts && settings.fonts.length > 0) {
        document.documentElement.style.setProperty(
          '--font-family-body',
          settings.fonts.join(', ')
        )
      }
    } catch (error) {
      console.error('Error applying settings:', error)
    }
  }
}
