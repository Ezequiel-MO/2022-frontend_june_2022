import { useDispatch, useSelector } from 'react-redux'
import {
  SET_BUDGET_SCHEDULE,
  SET_HOTELS,
  SET_SELECTED_HOTEL_NAME,
  SET_SELECTED_VENUE_NAME,
  selectBudget,
  TOGGLE_BREAKDOWN,
  TOGGLE_MEETING_BREAKDOWN,
  TOGGLE_VENUE_BREAKDOWN,
  UPDATE_HOTEL_TOTAL_COST,
  UPDATE_MEETING_TOTAL_COST,
  UPDATE_EVENT_TOTAL_COST,
  UPDATE_TRANSFERS,
  UPDATE_TRANSFERS_IN,
  UPDATE_TRANSFERS_OUT,
  SET_CURRENT_MEALS,
  SET_CURRENT_EVENTS
} from '../redux/features/budgetSlice'
import { useCallback } from 'react'

export const useBudget = () => {
  const dispatch = useDispatch()
  const budget = useSelector(selectBudget)
  const {
    schedule,
    transfers,
    transfersIn,
    transfersOut,
    hotels,
    hotelName,
    venueName,
    breakdownOpen,
    meetingBreakdownOpen,
    venueBreakdownOpen,
    meetings,
    meals,
    events
  } = budget

  const setBudgetSchedule = (schedule) =>
    dispatch(SET_BUDGET_SCHEDULE(schedule))
  const setHotels = (hotels) => dispatch(SET_HOTELS(hotels))
  const setSelectedHotelName = (hotel_name) =>
    dispatch(SET_SELECTED_HOTEL_NAME(hotel_name))
  const setSelectedVenueName = (venue_name) =>
    dispatch(SET_SELECTED_VENUE_NAME(venue_name))
  const toggleBreakdown = (id) => dispatch(TOGGLE_BREAKDOWN({ id }))
  const toggleMeetingBreakdown = ({ open, date, typeOfMeeting }) =>
    dispatch(TOGGLE_MEETING_BREAKDOWN({ open, date, typeOfMeeting }))
  const toggleVenueBreakdown = ({ open, date, typeOfEvent }) =>
    dispatch(TOGGLE_VENUE_BREAKDOWN({ open, date, typeOfEvent }))
  const updateHotelTotalCost = (hotel, nights) =>
    dispatch(UPDATE_HOTEL_TOTAL_COST({ hotel, nights }))
  const updateMeetingTotalCost = (date, id, nrPax, hotelName) =>
    dispatch(UPDATE_MEETING_TOTAL_COST({ date, id, nrPax, hotelName }))
  const updateEventTotalCost = (date, id, nrPax, eventId) =>
    dispatch(UPDATE_EVENT_TOTAL_COST({ date, id, nrPax, eventId }))
  const setCurrentMeals = useCallback(
    (date, typeOfEvent, id) => {
      dispatch(SET_CURRENT_MEALS({ date, typeOfEvent, id }))
    },
    [dispatch]
  )
  const setCurrentEvents = useCallback(
    (date, typeOfEvent, id) => {
      dispatch(SET_CURRENT_EVENTS({ date, typeOfEvent, id }))
    },
    [dispatch]
  )
  const updateTransfers = (date, id, nrBuses, cost) =>
    dispatch(UPDATE_TRANSFERS({ date, id, nrBuses, cost }))
  const updateTransfersIn = (type, item, itemCost) =>
    dispatch(UPDATE_TRANSFERS_IN({ type, item, itemCost }))
  const updateTransfersOut = (type, item, itemCost) =>
    dispatch(UPDATE_TRANSFERS_OUT({ type, item, itemCost }))

  return {
    schedule,
    hotelName,
    venueName,
    hotels,
    meetings,
    meals,
    events,
    transfers,
    transfersIn,
    transfersOut,
    breakdownOpen,
    meetingBreakdownOpen,
    venueBreakdownOpen,
    setBudgetSchedule,
    setHotels,
    updateHotelTotalCost,
    updateTransfers,
    updateTransfersIn,
    updateTransfersOut,
    setSelectedHotelName,
    setSelectedVenueName,
    toggleBreakdown,
    toggleMeetingBreakdown,
    toggleVenueBreakdown,
    updateMeetingTotalCost,
    updateEventTotalCost,

    setCurrentMeals,
    setCurrentEvents
  }
}
