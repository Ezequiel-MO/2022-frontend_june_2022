import { FC, createContext, useContext, useReducer, ReactNode } from 'react'
import { BudgetState, BudgetActions } from './interfaces'
import { budgetReducer } from './budgetReducer'

const initialState: BudgetState = {
  hotels: [],
  selectedHotel: null,
  selectedHotelCost: 0,
  schedule: [],
  transfersInCost: 0,
  transfersOutCost: 0,
  nrPax: 0
}

export const BudgetContext = createContext<{
  state: BudgetState
  dispatch: React.Dispatch<BudgetActions>
}>({
  state: initialState,
  dispatch: () => null
})

export const useContextBudget = () => {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider')
  }
  return context
}

interface BudgetProviderProps {
  children: ReactNode
}

export const BudgetProvider: FC<BudgetProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  )
}
