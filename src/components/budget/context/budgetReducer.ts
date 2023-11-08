import { BudgetActions, BudgetState } from './interfaces'

export const SET_BUDGET = 'SET_BUDGET'
export const SET_SELECTED_HOTEL = 'SET_SELECTED_HOTEL'
export const SET_SELECTED_HOTEL_COST = 'SET_SELECTED_HOTEL_COST'
export const UPDATE_TRANSFERS_IN_COST = 'UPDATE_TRANSFERS_IN_COST'
export const UPDATE_TRANSFERS_OUT_COST = 'UPDATE_TRANSFERS_OUT_COST'

export const budgetReducer = (
  state: BudgetState,
  action: BudgetActions
): BudgetState => {
  switch (action.type) {
    case SET_BUDGET:
      return {
        ...state,
        hotels: action.payload.hotels,
        schedule: action.payload.schedule,
        nrPax: action.payload.nrPax
      }
    case SET_SELECTED_HOTEL: {
      return {
        ...state,
        selectedHotel: action.payload.selectedHotel
      }
    }
    case SET_SELECTED_HOTEL_COST: {
      let cost
      const { nights, selectedHotel } = action.payload
      const { price = [] } = selectedHotel
      if (price.length === 0) {
        return {
          ...state,
          selectedHotelCost: 0
        }
      }
      const firstPrice = price[0]

      cost =
        nights *
        ((firstPrice.DUInr ?? 0) * (firstPrice.DUIprice ?? 0) +
          (firstPrice.DoubleRoomNr ?? 0) * (firstPrice.DoubleRoomPrice ?? 0) +
          (firstPrice.breakfast ?? 0) * (firstPrice.DUInr ?? 0) +
          (firstPrice.breakfast ?? 0) * (firstPrice.DoubleRoomNr ?? 0) * 2 +
          (firstPrice.DailyTax ?? 0) * (firstPrice.DUInr ?? 0) +
          (firstPrice.DailyTax ?? 0) * (firstPrice.DoubleRoomNr ?? 0) * 2)

      return {
        ...state,
        selectedHotelCost: cost
      }
    }
    case UPDATE_TRANSFERS_IN_COST: {
      let cost = 0
      const { transfer_in } = action.payload
      cost = transfer_in.reduce((acc, item) => acc + (item.transfer_in || 0), 0)
      if (transfer_in.length > 0) {
        const firstItem = transfer_in[0]
        cost +=
          (firstItem.assistance || 0) * (firstItem.assistanceCost || 0) +
          (firstItem.meetGreet || 0) * (firstItem.meetGreetCost || 0)
      }

      return {
        ...state,
        transfersInCost: cost
      }
    }
    case UPDATE_TRANSFERS_OUT_COST: {
      let cost = 0
      const { transfer_out } = action.payload
      cost = transfer_out.reduce(
        (acc, item) => acc + (item.transfer_out || 0),
        0
      )
      if (transfer_out.length > 0) {
        const firstItem = transfer_out[0]
        cost +=
          (firstItem.assistance || 0) * (firstItem.assistanceCost || 0) +
          (firstItem.meetGreet || 0) * (firstItem.meetGreetCost || 0)
      }

      return {
        ...state,
        transfersOutCost: cost
      }
    }
    default:
      return state
  }
}
