import { createSlice } from '@reduxjs/toolkit'

export const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    hotelName: '',
    breakdownOpen: {
      hotel: true,
      transfer_in: false,
      meetingBreakdownOpen: {
        open: false,
        date: '',
        typeOfMeeting: ''
      }
    },
    hotels: JSON.parse(localStorage.getItem('hotels')) || [],
    schedule: JSON.parse(localStorage.getItem('schedule')) || [],
    meetings: {},
    meals: {},
    events: {},
    transfers: {}
  },
  reducers: {
    SET_BUDGET_SCHEDULE: (state, action) => {
      state.schedule = action.payload
    },
    SET_HOTELS: (state, action) => {
      state.hotels = action.payload
    },
    UPDATE_BUDGET_SCHEDULE: (state, action) => {
      const { date, id, selectedOption } = action.payload
      return {
        ...state,
        schedule: state.schedule.map((item) => {
          if (item.date === date) {
            return {
              ...item,
              [id]: [selectedOption]
            }
          }
          return item
        })
      }
    },
    SET_SELECTED_HOTEL_NAME: (state, action) => {
      state.hotelName = action.payload
    },
    TOGGLE_BREAKDOWN: (state, action) => {
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
    UPDATE_HOTEL_TOTAL_COST: (state, action) => {
      const { hotel, nights } = action.payload
      const { price, _id } = hotel
      const {
        DUInr,
        DUIprice,
        DoubleRoomNr,
        DoubleRoomPrice,
        breakfast,
        DailyTax
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
    UPDATE_MEETING_TOTAL_COST: (state, action) => {
      const { date, id, nrPax, hotelName } = action.payload

      return {
        ...state,
        schedule: state.schedule.map((day) => {
          if (day.date === date) {
            return {
              ...day,
              [id]: day[id].map((meeting) => {
                const hotel = state.hotels.find(
                  (hotel) => hotel.name === hotelName
                )
                const hotelId = meeting.hotel[0]
                if (hotelId === hotel._id) {
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
                }
                return meeting
              })
            }
          }
          return day
        })
      }
    },
    UPDATE_EVENT_TOTAL_COST: (state, action) => {
      const { date, id, nrPax, eventId } = action.payload
      return {
        ...state,
        schedule: state.schedule.map((day) => {
          if (day.date === date) {
            return {
              ...day,
              [id]: day[id].map((event) => {
                if (event._id === eventId) {
                  if (id === 'morningEvents' || id === 'afternoonEvents') {
                    const { price, pricePerPerson = true } = event

                    const eventTotal =
                      pricePerPerson === true ? price * nrPax : price
                    console.log(eventTotal)
                    return {
                      ...event,
                      totalCost: eventTotal
                    }
                  }
                  if (id === 'lunch' || id === 'dinner') {
                    const eventTotal = event.price * nrPax
                    return {
                      ...event,
                      totalCost: eventTotal
                    }
                  }
                }
                return event
              })
            }
          }
          return day
        })
      }
    },
    /*    UPDATE_TRANSFER_TOTAL_COST: (state, action) => {}, */

    SET_CURRENT_MEETINGS: (state, action) => {
      const { date, typeOfEvent, id } = action.payload
      const selectedMeeting = state.schedule
        .find((item) => item.date === date)
        [typeOfEvent]?.find((item) => item._id === id)
      return {
        ...state,
        meetings: {
          ...state.meetings,
          [date]: {
            ...state.meetings[date],
            [typeOfEvent]: selectedMeeting
          }
        }
      }
    },
    SET_CURRENT_MEALS: (state, action) => {
      const { date, typeOfEvent, id } = action.payload
      const selectedMeal = state.schedule
        .find((item) => item.date === date)
        [typeOfEvent]?.find((item) => item._id === id)
      return {
        ...state,
        meals: {
          ...state.meals,
          [date]: {
            ...state.meals[date],
            [typeOfEvent]: selectedMeal
          }
        }
      }
    },
    SET_CURRENT_EVENTS: (state, action) => {
      const { date, typeOfEvent, id } = action.payload
      const selectedEvent = state.schedule
        .find((item) => item.date === date)
        [typeOfEvent]?.find((item) => item._id === id)
      return {
        ...state,
        events: {
          ...state.events,
          [date]: {
            ...state.events[date],
            [typeOfEvent]: selectedEvent
          }
        }
      }
    }
  }
})

export const {
  budget,
  SET_BUDGET_SCHEDULE,
  SET_HOTELS,
  UPDATE_BUDGET_SCHEDULE,
  SET_SELECTED_HOTEL_NAME,
  TOGGLE_BREAKDOWN,
  TOGGLE_MEETING_BREAKDOWN,
  UPDATE_HOTEL_TOTAL_COST,
  UPDATE_MEETING_TOTAL_COST,
  UPDATE_EVENT_TOTAL_COST,
  SET_CURRENT_MEETINGS,
  SET_CURRENT_MEALS,
  SET_CURRENT_EVENTS
} = budgetSlice.actions

export const selectBudget = (state) => state.budget

export default budgetSlice.reducer
