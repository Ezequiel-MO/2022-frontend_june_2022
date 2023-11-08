import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IDay,
  IEntertainment,
  IEvent,
  IGift,
  IHotel,
  IHotelPrice,
  IRestaurant,
  ITransfer
} from '../../interfaces'

interface IBreakdownOpen {
  hotel: boolean
  transfer_in: boolean
  venueBreakdownOpen: {
    open: boolean
    date: string
    typeOfEvent: string
  }
}

interface ITransfers {
  [key: string]: number
}

interface IShowDetails {
  selectedVenue: IRestaurant // Replace with the actual type for a venue
  selectedShow: IEntertainment
  showCost: number
}

export interface IBudgetState {
  hotelName: string
  venueName: string
  breakdownOpen: IBreakdownOpen
  hotels: IHotel[]
  gifts: IGift[]
  currentGift: IGift
  schedule: IDay[]
  meetings: Record<string, MeetingType>
  meals: Record<string, { [key: string]: IRestaurant }>
  shows: Record<string, Record<'lunch' | 'dinner', IShowDetails>>
  venues: Record<string, { [key: string]: IRestaurant }>
  events: Record<string, { [key: string]: IEvent }>
  transfers: ITransfers
  transfersIn: {
    assistance: number
    assistanceCost: number
    meetGreet: number
    meetGreetCost: number
  }
  transfersOut: {
    assistance: number
    assistanceCost: number
    meetGreet: number
    meetGreetCost: number
  }
}

type BreakdownKeys = 'hotel' | 'transfer_in'
type MeetingType = 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'
type MealType = 'lunch' | 'dinner'
type EventType = 'morningEvents' | 'afternoonEvents'

const initialState: IBudgetState = {
  hotelName: '',
  venueName: '',
  breakdownOpen: {
    hotel: true,
    transfer_in: false,
    venueBreakdownOpen: {
      open: false,
      date: '',
      typeOfEvent: ''
    }
  },
  hotels: JSON.parse(localStorage.getItem('hotels') || '[]'),
  gifts: [],
  schedule: JSON.parse(localStorage.getItem('schedule') || '[]'),
  currentGift: {} as IGift,
  meetings: {},
  meals: {},
  shows: {},
  venues: {},
  events: {},
  transfers: {},
  transfersIn: {
    assistance: 0,
    assistanceCost: 0,
    meetGreet: 0,
    meetGreetCost: 0
  },
  transfersOut: {
    assistance: 0,
    assistanceCost: 0,
    meetGreet: 0,
    meetGreetCost: 0
  }
}

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    SET_BUDGET_SCHEDULE: (state, action: PayloadAction<IDay[]>) => {
      state.schedule = action.payload
    },
    SET_HOTELS: (state, action: PayloadAction<IHotel[]>) => {
      state.hotels = action.payload
    },
    SET_GIFTS: (state, action: PayloadAction<IGift[]>) => {
      state.gifts = action.payload
    },
    SET_SELECTED_HOTEL_NAME: (state, action) => {
      state.hotelName = action.payload
    },
    SET_SELECTED_VENUE_NAME: (state, action) => {
      state.venueName = action.payload
    },
    TOGGLE_BREAKDOWN: (state, action: PayloadAction<{ id: BreakdownKeys }>) => {
      const { id } = action.payload
      state.breakdownOpen[id] = !state.breakdownOpen[id]
    },
    TOGGLE_VENUE_BREAKDOWN: (
      state,
      action: PayloadAction<{
        open: boolean
        date: string
        typeOfEvent: string
      }>
    ) => {
      const { open, date, typeOfEvent } = action.payload
      state.breakdownOpen.venueBreakdownOpen = {
        open,
        date,
        typeOfEvent
      }
    },
    UPDATE_HOTEL_TOTAL_COST: (
      state,
      action: PayloadAction<{
        price: IHotelPrice[]
        _id: string
        nights: number
      }>
    ) => {
      const { price, _id, nights } = action.payload
      if (!price[0]) return
      const {
        DUInr = 0,
        DUIprice = 0,
        DoubleRoomNr = 0,
        DoubleRoomPrice = 0,
        breakfast = 0,
        DailyTax = 0
      } = price[0]

      const hotelTotal =
        nights *
        (DUInr * DUIprice +
          DoubleRoomNr * DoubleRoomPrice +
          breakfast * DUInr +
          breakfast * DoubleRoomNr * 2 +
          DailyTax * DUInr +
          DailyTax * DoubleRoomNr * 2)
      const index = state.hotels.findIndex((hotel) => hotel._id === _id)
      state.hotels[index].totalCost = hotelTotal
    },
    UPDATE_MEETING_TOTAL_COST: (
      state,
      action: PayloadAction<{
        dateProp: string
        id: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'
        pax: number
        hotelName: string
      }>
    ) => {
      const { dateProp, id, pax, hotelName } = action.payload

      const updatedSchedule = state.schedule.map((day) => {
        if (day.date !== dateProp) {
          return day
        }

        const updatedMeetings = day[id]?.meetings?.map((meeting) => {
          if (meeting.hotelName !== hotelName) {
            return meeting
          }

          const {
            FDDDR = 0,
            FDRate = 0,
            HDDDR = 0,
            HDRate = 0,
            aavvPackage = 0,
            coffeeBreakUnits = 0,
            coffeeBreakPrice = 0,
            hotelDinnerUnits = 0,
            hotelDinnerPrice = 0,
            workingLunchUnits = 0,
            workingLunchPrice = 0
          } = meeting

          const meetingTotal =
            FDDDR * pax +
            FDRate +
            HDDDR * pax +
            HDRate +
            aavvPackage +
            coffeeBreakUnits * coffeeBreakPrice +
            hotelDinnerUnits * hotelDinnerPrice +
            workingLunchUnits * workingLunchPrice

          return {
            ...meeting,
            totalCost: meetingTotal
          }
        })

        return {
          ...day,
          [id]: {
            ...day[id],
            meetings: updatedMeetings
          }
        }
      })

      return {
        ...state,
        schedule: updatedSchedule
      }
    },
    UPDATE_EVENT_TOTAL_COST: (
      state,
      action: PayloadAction<{
        date: string
        id: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
        nrPax: number
        eventId: string
      }>
    ) => {
      const { date, id, nrPax = 1, eventId } = action.payload

      const updatedSchedule = state.schedule.map((day) => {
        if (day.date !== date) {
          return day
        }

        let updatedEvents = []

        if (id === 'morningEvents' || id === 'afternoonEvents') {
          updatedEvents = day[id].events.map((event) => {
            if (event._id !== eventId) {
              return event
            }

            const { price = 0, pricePerPerson = true } = event
            const eventTotal = pricePerPerson ? price * nrPax : price
            return { ...event, totalCost: eventTotal }
          })
        }

        return day
      })

      return {
        ...state,
        schedule: updatedSchedule
      }
    },
    UPDATE_TRANSFERS: (
      state,
      action: PayloadAction<{ options: ITransfer[] }>
    ) => {
      const { options } = action.payload
    },

    UPDATE_CURRENT_GIFT: (state, action: PayloadAction<IGift>) => {
      state.currentGift = action.payload
    },
    SET_CURRENT_MEALS: (
      state,
      action: PayloadAction<{
        date: string
        typeOfEvent: MealType
        id: string
      }>
    ) => {
      const { date, typeOfEvent, id } = action.payload
      const day = state.schedule.find((item) => item.date === date)
      const selectedMeal = day
        ? day[typeOfEvent]?.restaurants?.find((item) => item._id === id)
        : undefined

      const currentMealsForDate = state.meals[date] || {}

      if (selectedMeal) {
        currentMealsForDate[typeOfEvent] = selectedMeal
        state.meals[date] = currentMealsForDate
      }

      if (state.venues[date] && state.venues[date][typeOfEvent]) {
        delete state.venues[date][typeOfEvent]
      }
    },
    SET_CURRENT_VENUES: (
      state,
      action: PayloadAction<{
        date: string
        typeOfEvent: MealType
        id: string
      }>
    ) => {
      const { date, typeOfEvent, id } = action.payload
      const day = state.schedule.find((item) => item.date === date)
      const selectedVenue = day
        ? day[typeOfEvent]?.restaurants?.find((item) => item._id === id)
        : undefined

      const currentVenuesForDate = state.venues[date] || {}

      if (selectedVenue) {
        currentVenuesForDate[typeOfEvent] = selectedVenue
        state.venues[date] = currentVenuesForDate
      }

      if (state.meals[date] && state.meals[date][typeOfEvent]) {
        delete state.meals[date][typeOfEvent]
      }
    },
    SET_CURRENT_EVENTS: (
      state,
      action: PayloadAction<{
        date: string
        typeOfEvent: EventType
        id: string
      }>
    ) => {
      const { date, typeOfEvent, id } = action.payload
      const day = state.schedule.find((item) => item.date === date)
      const selectedEvent = day
        ? day[typeOfEvent]?.events?.find((item) => item._id === id)
        : undefined
      const currentEventsForDate = state.events[date] || {}
      if (selectedEvent) {
        currentEventsForDate[typeOfEvent] = selectedEvent
        state.events[date] = currentEventsForDate
      }
    },
    SET_CURRENT_SHOWS: (
      state,
      action: PayloadAction<{
        date: string
        typeOfEvent: MealType
        venueId: string
        showId: string
      }>
    ) => {
      const { date, typeOfEvent, venueId, showId } = action.payload
      const day = state.schedule.find((item) => item.date === date)
      const selectedVenue = day
        ? day[typeOfEvent]?.restaurants?.find((item) => item._id === venueId)
        : undefined
      const selectedShow = selectedVenue?.entertainment?.find(
        (show) => show._id === showId
      )
      const showCost = selectedShow?.price
        ? selectedShow.price.artistsFee +
          selectedShow.price.aavv +
          selectedShow.price.lighting +
          selectedShow.price.travelAllowance +
          selectedShow.price.mealAllowance
        : 0

      if (!state.shows[date]) {
        state.shows[date] = {} as Record<'lunch' | 'dinner', IShowDetails>
      }

      state.shows[date][typeOfEvent] = {
        selectedVenue: selectedVenue!,
        selectedShow: selectedShow!,
        showCost
      }
    }
  }
})

export const {
  SET_BUDGET_SCHEDULE,
  SET_HOTELS,
  SET_GIFTS,
  SET_SELECTED_HOTEL_NAME,
  SET_SELECTED_VENUE_NAME,
  TOGGLE_BREAKDOWN,
  TOGGLE_VENUE_BREAKDOWN,
  UPDATE_CURRENT_GIFT,
  UPDATE_HOTEL_TOTAL_COST,
  UPDATE_MEETING_TOTAL_COST,
  UPDATE_EVENT_TOTAL_COST,
  UPDATE_TRANSFERS,
  SET_CURRENT_MEALS,
  SET_CURRENT_VENUES,
  SET_CURRENT_EVENTS,
  SET_CURRENT_SHOWS
} = budgetSlice.actions

export const selectBudget = (state: { budget: IBudgetState }) => state.budget

export default budgetSlice.reducer
