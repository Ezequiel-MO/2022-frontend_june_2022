import { BudgetContext } from './context'
import { useBudgetReducer } from './reducer'

export const BudgetProvider = ({ children }) => {
  const [budgetValues, dispatch] = useBudgetReducer()
  return (
    <BudgetContext.Provider value={{ budgetValues, dispatch }}>
      {children}
    </BudgetContext.Provider>
  )
}
