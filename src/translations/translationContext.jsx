// translationContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import EN from './EN.json'
import ES from './ES.json'

const translations = {
  EN,
  ES
}

const TranslationContext = createContext()

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

export const TranslationProvider = ({ quoteLanguage, children }) => {
  const [language, setLanguage] = useState(quoteLanguage || 'EN')

  useEffect(() => {
    setLanguage(quoteLanguage)
  }, [quoteLanguage])

  const t = (key) => translations[language][key] || key

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  )
}
