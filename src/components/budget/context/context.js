import { useContext } from 'react'
import { createContext } from 'react'

export const BudgetContext = createContext(null)

export const useBudgetContext = () => {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error('useBudgetContext must be used within a BudgetProvider')
  }
  return context
}
