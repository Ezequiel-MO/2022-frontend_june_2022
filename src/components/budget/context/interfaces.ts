import { IDay, IHotel, ITransfer } from '../../../interfaces'
import { UPDATE_PROGRAM_TRANSFERS_COST } from './budgetReducer'
import {
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
  programTransfers: {
    [date: string]: {
      [type: string]: {
        transferCost: number
      }
    }
  }
  programTransfersCost: number
  transfersInCost: number
  transfersOutCost: number
  nrPax: number
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

export type UpdateProgramTransfersCost = {
  type: typeof UPDATE_PROGRAM_TRANSFERS_COST
  payload: {
    date: string
    transfer: ITransfer
    count: number
    type:
      | 'transfer_morningEvents'
      | 'transfer_afternoonEvents'
      | 'transfer_lunch'
      | 'transfer_dinner'
      | 'meetGreet'
      | 'assistance'
  }
}

export type BudgetActions =
  | SetSelectedHotelAction
  | SetSelectedHotelCostAction
  | UpdateTransfersInCost
  | UpdateTransfersOutCost
  | UpdateProgramTransfersCost
