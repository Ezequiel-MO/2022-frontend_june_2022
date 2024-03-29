import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  SET_BUDGET_SCHEDULE,
  SET_HOTELS,
  SET_GIFTS,
  UPDATE_CURRENT_GIFT,
  SET_SELECTED_HOTEL_NAME,
  SET_SELECTED_VENUE_NAME,
  selectBudget,
  TOGGLE_BREAKDOWN,
  TOGGLE_VENUE_BREAKDOWN,
  UPDATE_HOTEL_TOTAL_COST,
  UPDATE_MEETING_TOTAL_COST,
  UPDATE_EVENT_TOTAL_COST,
  UPDATE_TRANSFERS,
  SET_CURRENT_MEALS,
  SET_CURRENT_SHOWS,
  SET_CURRENT_VENUES,
  SET_CURRENT_EVENTS,
  IBudgetState
} from '../redux/features/budgetSlice'
import { IDay, IGift, IHotel, IHotelPrice, ITransfer } from '../interfaces'

export const useBudget = () => {
  const dispatch = useDispatch()
  const budget: IBudgetState = useSelector(selectBudget)
  const {
    schedule,
    transfers,
    hotels,
    gifts,
    currentGift,
    hotelName,
    venueName,
    breakdownOpen,
    meetings,
    meals,
    shows,
    venues,
    events
  } = budget

  const setBudgetSchedule = (schedule: IDay[]) =>
    dispatch(SET_BUDGET_SCHEDULE(schedule))
  const setHotels = (hotels: IHotel[]) => dispatch(SET_HOTELS(hotels))
  const setGifts = (gifts: IGift[]) => dispatch(SET_GIFTS(gifts))
  const updateCurrentGift = (gift: IGift) => dispatch(UPDATE_CURRENT_GIFT(gift))
  const setSelectedHotelName = (hotel_name: string) =>
    dispatch(SET_SELECTED_HOTEL_NAME(hotel_name))
  const setSelectedVenueName = (venue_name: string) =>
    dispatch(SET_SELECTED_VENUE_NAME(venue_name))

  const toggleBreakdown = (id: 'hotel' | 'transfer_in') =>
    dispatch(TOGGLE_BREAKDOWN({ id }))

  const toggleVenueBreakdown = ({
    open,
    date,
    typeOfEvent
  }: {
    open: boolean
    date: string
    typeOfEvent: 'lunch' | 'dinner'
  }) => dispatch(TOGGLE_VENUE_BREAKDOWN({ open, date, typeOfEvent }))

  const updateHotelTotalCost = (
    price: IHotelPrice[],
    _id: string,
    nights: number
  ) => dispatch(UPDATE_HOTEL_TOTAL_COST({ price, _id, nights }))

  const updateMeetingTotalCost = (
    dateProp: string,
    id: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings',
    pax: number,
    hotelName: string
  ) => dispatch(UPDATE_MEETING_TOTAL_COST({ dateProp, id, pax, hotelName }))

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

  const setCurrentVenues = useCallback(
    (date: string, typeOfEvent: 'lunch' | 'dinner', id: string) => {
      dispatch(SET_CURRENT_VENUES({ date, typeOfEvent, id }))
    },
    [dispatch]
  )
  const setCurrentShows = useCallback(
    (
      date: string,
      typeOfEvent: 'lunch' | 'dinner',
      venueId: string,
      showId: string
    ) => {
      dispatch(SET_CURRENT_SHOWS({ date, typeOfEvent, venueId, showId }))
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

  return {
    schedule,
    hotelName,
    venueName,
    hotels,
    gifts,
    currentGift,
    meetings,
    meals,
    venues,
    shows,
    events,
    transfers,
    breakdownOpen,
    setBudgetSchedule,
    setHotels,
    setGifts,
    updateCurrentGift,
    updateHotelTotalCost,
    updateTransfers,
    setSelectedHotelName,
    setSelectedVenueName,
    toggleBreakdown,
    toggleVenueBreakdown,
    updateMeetingTotalCost,
    updateEventTotalCost,
    setCurrentMeals,
    setCurrentVenues,
    setCurrentShows,
    setCurrentEvents
  }
}
