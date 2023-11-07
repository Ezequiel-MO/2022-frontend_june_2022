import { IDay, IHotel } from '../../../interfaces'
import { SET_BUDGET } from './budgetReducer'

export interface BudgetState {
  hotels: IHotel[]
  schedule: IDay[]
  nrPax: number
}

export type SetBudgetAction = {
  type: typeof SET_BUDGET
  payload: {
    hotels: IHotel[]
    schedule: IDay[]
    nrPax: number
  }
}

export type BudgetActions = SetBudgetAction
