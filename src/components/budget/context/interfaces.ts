import { IDay, IHotel, ITransfer } from '../../../interfaces'
import {
  SET_BUDGET,
  SET_SELECTED_HOTEL,
  SET_SELECTED_HOTEL_COST,
  UPDATE_TRANSFERS_IN_COST,
  UPDATE_TRANSFERS_OUT_COST
} from './budgetReducer'

export interface BudgetState {
  hotels: IHotel[]
  selectedHotel: IHotel | null
  selectedHotelCost: number
  schedule: IDay[]
  transfersInCost: number
  transfersOutCost: number
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

export type UpdateTransfersInCost = {
  type: typeof UPDATE_TRANSFERS_IN_COST
  payload: {
    transfer_in: ITransfer[]
  }
}

export type UpdateTransfersOutCost = {
  type: typeof UPDATE_TRANSFERS_OUT_COST
  payload: {
    transfer_out: ITransfer[]
  }
}

export type BudgetActions =
  | SetBudgetAction
  | SetSelectedHotelAction
  | SetSelectedHotelCostAction
  | UpdateTransfersInCost
  | UpdateTransfersOutCost
