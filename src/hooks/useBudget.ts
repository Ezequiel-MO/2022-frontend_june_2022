import { useCallback } from 'react'
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
  SET_CURRENT_EVENTS,
  IBudgetState
} from '../redux/features/budgetSlice'
import { IDay, IHotel, ITransfer } from '../interfaces'

export const useBudget = () => {
  const dispatch = useDispatch()
  const budget: IBudgetState = useSelector(selectBudget)
  const {
    schedule,
    transfers,
    transfersIn,
    transfersOut,
    hotels,
    hotelName,
    venueName,
    breakdownOpen,
    meetings,
    meals,
    events
  } = budget

  const setBudgetSchedule = (schedule: IDay[]) =>
    dispatch(SET_BUDGET_SCHEDULE(schedule))
  const setHotels = (hotels: IHotel[]) => dispatch(SET_HOTELS(hotels))
  const setSelectedHotelName = (hotel_name: string) =>
    dispatch(SET_SELECTED_HOTEL_NAME(hotel_name))
  const setSelectedVenueName = (venue_name: string) =>
    dispatch(SET_SELECTED_VENUE_NAME(venue_name))

  const toggleBreakdown = (id: 'hotel' | 'transfer_in') =>
    dispatch(TOGGLE_BREAKDOWN({ id }))

  const toggleMeetingBreakdown = ({
    open,
    date,
    typeOfMeeting
  }: {
    open: boolean
    date: string
    typeOfMeeting: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'
  }) => dispatch(TOGGLE_MEETING_BREAKDOWN({ open, date, typeOfMeeting }))

  const toggleVenueBreakdown = ({
    open,
    date,
    typeOfEvent
  }: {
    open: boolean
    date: string
    typeOfEvent: 'lunch' | 'dinner'
  }) => dispatch(TOGGLE_VENUE_BREAKDOWN({ open, date, typeOfEvent }))

  const updateHotelTotalCost = (hotel: IHotel, nights: number) =>
    dispatch(UPDATE_HOTEL_TOTAL_COST({ hotel, nights }))

  const updateMeetingTotalCost = (
    date: string,
    id: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings',
    nrPax: number,
    hotelName: string
  ) => dispatch(UPDATE_MEETING_TOTAL_COST({ date, id, nrPax, hotelName }))

  const updateEventTotalCost = (
    date: string,
    id: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner',
    nrPax: number,
    eventId: string
  ) => dispatch(UPDATE_EVENT_TOTAL_COST({ date, id, nrPax, eventId }))

  const setCurrentMeals = useCallback(
    (date: string, typeOfEvent: 'lunch' | 'dinner', id: string) => {
      dispatch(SET_CURRENT_MEALS({ date, typeOfEvent, id }))
    },
    [dispatch]
  )
  const setCurrentEvents = useCallback(
    (
      date: string,
      typeOfEvent: 'morningEvents' | 'afternoonEvents',
      id: string
    ) => {
      dispatch(SET_CURRENT_EVENTS({ date, typeOfEvent, id }))
    },
    [dispatch]
  )

  const updateTransfers = (options: ITransfer[]) =>
    dispatch(UPDATE_TRANSFERS({ options }))

  const updateTransfersIn = (
    type: 'meetGreet' | 'assistance',
    item: number,
    itemCost: number
  ) => dispatch(UPDATE_TRANSFERS_IN({ type, item, itemCost }))

  const updateTransfersOut = (
    type: 'meetGreet' | 'assistance',
    item: number,
    itemCost: number
  ) => dispatch(UPDATE_TRANSFERS_OUT({ type, item, itemCost }))

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
