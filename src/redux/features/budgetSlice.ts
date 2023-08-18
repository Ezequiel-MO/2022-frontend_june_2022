import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IDay,
  IEvent,
  IHotel,
  IHotelPrice,
  IRestaurant,
  ITransfer
} from '../../interfaces'

interface IBreakdownOpen {
  hotel: boolean
  transfer_in: boolean
  meetingBreakdownOpen: {
    open: boolean
    date: string
    typeOfMeeting: string
  }
  venueBreakdownOpen: {
    open: boolean
    date: string
    typeOfEvent: string
  }
}

interface ITransfers {
  [key: string]: number
}

export interface IBudgetState {
  hotelName: string
  venueName: string
  breakdownOpen: IBreakdownOpen
  hotels: IHotel[]
  schedule: IDay[]
  meetings: Record<string, MeetingType>
  meals: Record<string, { [key: string]: IRestaurant }>
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
    meetingBreakdownOpen: {
      open: false,
      date: '',
      typeOfMeeting: ''
    },
    venueBreakdownOpen: {
      open: false,
      date: '',
      typeOfEvent: ''
    }
  },
  hotels: JSON.parse(localStorage.getItem('hotels') || '[]'),
  schedule: JSON.parse(localStorage.getItem('schedule') || '[]'),
  meetings: {},
  meals: {},
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
    TOGGLE_MEETING_BREAKDOWN: (state, action) => {
      const { open, date, typeOfMeeting } = action.payload
      state.breakdownOpen.meetingBreakdownOpen = {
        open,
        date,
        typeOfMeeting
      }
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
        date: string
        id: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'
        nrPax: number
        hotelName: string
      }>
    ) => {
      const { date, id, nrPax, hotelName } = action.payload
      const selectedHotel = state.hotels.find(
        (hotel) => hotel.name === hotelName
      ) as IHotel

      const updatedSchedule = state.schedule.map((day) => {
        if (day.date !== date) {
          return day
        }

        const updatedMeetings = day[id].meetings?.map((meeting) => {
          const { hotel } = meeting
          if (hotel[0]._id !== selectedHotel?._id) {
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
            FDDDR * nrPax +
            FDRate +
            HDDDR * nrPax +
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
          [id]: updatedMeetings
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
      const { date, id, nrPax, eventId } = action.payload

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

        if (id === 'lunch' || id === 'dinner') {
          updatedEvents = day[id].restaurants.map((event) => {
            if (event._id !== eventId) {
              return event
            }

            if (event?.venue_price?.length === 0) {
              const eventTotal = event.price * nrPax
              return { ...event, totalCost: eventTotal }
            }

            const { venue_price } = event
            const {
              rental,
              cocktail_units,
              cocktail_price,
              catering_units,
              catering_price,
              staff_units,
              staff_menu_price,
              audiovisuals,
              cleaning,
              security,
              entertainment
            } = venue_price[0]

            const eventTotal =
              rental +
              cocktail_units * cocktail_price +
              catering_units * catering_price +
              staff_units * staff_menu_price +
              audiovisuals +
              cleaning +
              security +
              entertainment

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
    UPDATE_TRANSFERS_IN: (state, action) => {
      const { type, item, itemCost } = action.payload
      return {
        ...state,
        transfersIn: {
          ...state.transfersIn,
          [type]: item,
          [`${type}Cost`]: itemCost
        }
      }
    },
    UPDATE_TRANSFERS_OUT: (state, action) => {
      const { type, item, itemCost } = action.payload
      return {
        ...state,
        transfersOut: {
          ...state.transfersOut,
          [type]: item,
          [`${type}Cost`]: itemCost
        }
      }
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
    }
  }
})

export const {
  SET_BUDGET_SCHEDULE,
  SET_HOTELS,
  SET_SELECTED_HOTEL_NAME,
  SET_SELECTED_VENUE_NAME,
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
} = budgetSlice.actions

export const selectBudget = (state: { budget: IBudgetState }) => state.budget

export default budgetSlice.reducer
