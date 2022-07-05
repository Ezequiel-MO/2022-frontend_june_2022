export const BUDGET_ACTIONS = {
  SET_BREAKDOWN_OPEN: "SET_BREAKDOWN_OPEN",
  SET_SELECTED_HOTEL_NAME: "SET_SELECTED_HOTEL_NAME",
};

export const initialbudgetValues = {
  hotelBreakdownOpen: false,
  selectedHotelName:
    JSON.parse(localStorage.getItem("currentProject")).hotels[0]?.name ?? "",
};

export const budgetReducer = (state, action) => {
  switch (action.type) {
    case BUDGET_ACTIONS.SET_BREAKDOWN_OPEN:
      return {
        ...state,
        hotelBreakdownOpen: action.payload,
      };
    case BUDGET_ACTIONS.SET_SELECTED_HOTEL_NAME:
      return {
        ...state,
        selectedHotelName: action.payload,
      };
    default:
      return state;
  }
};
