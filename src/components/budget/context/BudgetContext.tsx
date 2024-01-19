import { FC, createContext, useContext, useReducer, ReactNode } from 'react'
import { BudgetState, BudgetActions } from './interfaces'
import { budgetReducer } from './budgetReducer'

const initialHotels =
  JSON.parse(localStorage.getItem('currentProject') ?? '[]')?.hotels || []

const initialSchedule =
  JSON.parse(localStorage.getItem('currentProject') ?? '[]')?.schedule || []

const initialNrPax =
  JSON.parse(localStorage.getItem('currentProject') ?? '[]')?.nrPax || 0

const initialState: BudgetState = {
  hotels: initialHotels,
  selectedHotel: null,
  selectedHotelCost: 0,
  schedule: initialSchedule,
  activities: {},
  activitiesCost: 0,
  meals: {},
  mealsCost: 0,
  meetings: {},
  meetingsCost: 0,
  overnight: {},
  overnightCost: 0,
  shows: {},
  showsCost: 0,
  programTransfers: {},
  programTransfersCost: 0,
  transfersInCost: 0,
  transfersOutCost: 0,
  itineraryTransfers: {},
  itineraryTransfersCost: 0,
  nrPax: initialNrPax
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
