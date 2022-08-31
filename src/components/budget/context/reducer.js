export const BUDGET_ACTIONS = {
  SET_HOTEL_BREAKDOWN_OPEN: 'SET_HOTEL_BREAKDOWN_OPEN',
  SET_SELECTED_HOTEL_NAME: 'SET_SELECTED_HOTEL_NAME',
  SET_VENUE_BREAKDOWN_OPEN: 'SET_VENUE_BREAKDOWN_OPEN',
  SET_SELECTED_VENUE_NAME: 'SET_SELECTED_VENUE_NAME'
}

export const initialbudgetValues = {
  hotelBreakdownOpen: false,
  venueBreakdownOpen: false,
  selectedHotelName: '',
  selectedVenueName: ''
}

export const budgetReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case BUDGET_ACTIONS.SET_HOTEL_BREAKDOWN_OPEN:
      return {
        ...state,
        hotelBreakdownOpen: payload
      }
    case BUDGET_ACTIONS.SET_SELECTED_HOTEL_NAME:
      return {
        ...state,
        selectedHotelName: payload
      }
    case BUDGET_ACTIONS.SET_SELECTED_VENUE_NAME:
      return {
        ...state,
        selectedVenueName: payload
      }
    case BUDGET_ACTIONS.SET_VENUE_BREAKDOWN_OPEN:
      return {
        ...state,
        venueBreakdownOpen: payload
      }
    default:
      return state
  }
}
