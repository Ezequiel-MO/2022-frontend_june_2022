export const BUDGET_ACTIONS = {
  TOGGLE_HOTEL_BREAKDOWN: 'TOGGLE_HOTEL_BREAKDOWN',
  SET_SELECTED_HOTEL_NAME: 'SET_SELECTED_HOTEL_NAME',
  TOGGLE_VENUE_BREAKDOWN: 'TOGGLE_VENUE_BREAKDOWN',
  SET_SELECTED_VENUE_NAME: 'SET_SELECTED_VENUE_NAME',
  SET_SELECTED_VENUE_TOTAL_COST: 'SET_SELECTED_VENUE_TOTAL_COST',
  TOGGLE_MEETING_BREAKDOWN: 'TOGGLE_MEETING_BREAKDOWN',
  SET_SELECTED_MEETING_HOTEL_ID: 'SET_SELECTED_MEETING_HOTEL_ID',
  SET_SELECTED_MEETING: 'SET_SELECTED_MEETING',
  SET_SELECTED_MEETING_TOTAL_COST: 'SET_SELECTED_MEETING_TOTAL_COST'
}

export const initialbudgetValues = {
  hotelBreakdownOpen: true,
  venueBreakdownOpen: false,
  meetingBreakdownOpen: false,
  selectedHotelName: '',
  selectedVenueName: '',
  selectedMeeting: {},
  selectedMeetingHotelId: '',
  selectedVenueTotalCost: 0,
  selectedMeetingTotalCost: 0
}

export const budgetReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case BUDGET_ACTIONS.TOGGLE_HOTEL_BREAKDOWN:
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
    case BUDGET_ACTIONS.TOGGLE_VENUE_BREAKDOWN:
      return {
        ...state,
        venueBreakdownOpen: payload
      }
    case BUDGET_ACTIONS.TOGGLE_MEETING_BREAKDOWN:
      return {
        ...state,
        meetingBreakdownOpen: payload
      }
    case BUDGET_ACTIONS.SET_SELECTED_MEETING_HOTEL_ID:
      return {
        ...state,
        selectedMeetingHotelId: payload
      }
    case BUDGET_ACTIONS.SET_SELECTED_VENUE_TOTAL_COST:
      return {
        ...state,
        selectedVenueTotalCost: payload
      }
    case BUDGET_ACTIONS.SET_SELECTED_MEETING:
      return {
        ...state,
        selectedMeeting: payload
      }
    case BUDGET_ACTIONS.SET_SELECTED_MEETING_TOTAL_COST:
      return {
        ...state,
        selectedMeetingTotalCost: payload
      }
    default:
      return state
  }
}
