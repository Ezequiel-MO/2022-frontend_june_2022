import { IDay, IHotel } from '../../../interfaces'
import {
  SET_BUDGET,
  SET_SELECTED_HOTEL,
  SET_SELECTED_HOTEL_COST
} from './budgetReducer'

export interface BudgetState {
  hotels: IHotel[]
  selectedHotel: IHotel | null
  selectedHotelCost: number
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

export type SetSelectedHotelAction = {
  type: typeof SET_SELECTED_HOTEL
  payload: {
    selectedHotel: IHotel
  }
}

export type SetSelectedHotelCostAction = {
  type: typeof SET_SELECTED_HOTEL_COST
  payload: {
    nights: number
    selectedHotel: IHotel
  }
}

export type BudgetActions =
  | SetBudgetAction
  | SetSelectedHotelAction
  | SetSelectedHotelCostAction
