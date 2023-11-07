import { BudgetActions, BudgetState } from './interfaces'

export const SET_BUDGET = 'SET_BUDGET'
export const SET_SELECTED_HOTEL = 'SET_SELECTED_HOTEL'
export const SET_SELECTED_HOTEL_COST = 'SET_SELECTED_HOTEL_COST'

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
    default:
      return state
  }
}
