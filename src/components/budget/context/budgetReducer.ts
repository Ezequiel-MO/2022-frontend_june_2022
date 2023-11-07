import { BudgetActions, BudgetState } from './interfaces'

export const SET_BUDGET = 'SET_BUDGET'

export const budgetReducer = (
  state: BudgetState,
  action: BudgetActions
): BudgetState => {
  switch (action.type) {
    case 'SET_BUDGET':
      return {
        ...state,
        hotels: action.payload.hotels,
        schedule: action.payload.schedule,
        nrPax: action.payload.nrPax
      }
    default:
      return state
  }
}
