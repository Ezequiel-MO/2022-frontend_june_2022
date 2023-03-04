import { createSlice } from '@reduxjs/toolkit'

export const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
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
        typeOfMeeting: ''
      }
    },
    hotels: JSON.parse(localStorage.getItem('hotels')) || [],
    schedule: JSON.parse(localStorage.getItem('schedule')) || [],
    meetings: {},
    meals: {},
    events: {},
    transfers: {},
    transfersIn: {
      assistance: 0,
      assistanceCost: 0,
      meetGreet: 0,
      meetGreetCost: 0
    }
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
      state.schedule = state.schedule.map((item) => {
        if (item.date === date) {
          return {
            ...item,
            [id]: [selectedOption]
          }
        }
        return item
      })
    },
    SET_SELECTED_HOTEL_NAME: (state, action) => {
      state.hotelName = action.payload
    },
    SET_SELECTED_VENUE_NAME: (state, action) => {
      state.venueName = action.payload
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
    TOGGLE_VENUE_BREAKDOWN: (state, action) => {
      const { open, date, typeOfEvent } = action.payload
      state.breakdownOpen.venueBreakdownOpen = {
        open,
        date,
        typeOfEvent
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
      const selectedHotel = state.hotels.find(
        (hotel) => hotel.name === hotelName
      )

      const updatedSchedule = state.schedule.map((day) => {
        if (day.date !== date) {
          return day
        }

        const updatedMeetings = day[id].map((meeting) => {
          const { hotel } = meeting
          if (hotel[0] !== selectedHotel._id) {
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
                    if (event.venue_price.length === 0) {
                      const eventTotal = event.price * nrPax
                      return {
                        ...event,
                        totalCost: eventTotal
                      }
                    }
                    if (event.venue_price.length > 0) {
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

                      return {
                        ...event,
                        totalCost: eventTotal
                      }
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
    UPDATE_TRANSFERS: (state, action) => {
      const { date, id, nrBuses, cost } = action.payload
      const day_id = `${date}_${id}`
      state.transfers[day_id] = nrBuses * cost
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
  SET_SELECTED_VENUE_NAME,
  TOGGLE_BREAKDOWN,
  TOGGLE_MEETING_BREAKDOWN,
  TOGGLE_VENUE_BREAKDOWN,
  UPDATE_HOTEL_TOTAL_COST,
  UPDATE_MEETING_TOTAL_COST,
  UPDATE_EVENT_TOTAL_COST,
  UPDATE_TRANSFERS,
  UPDATE_TRANSFERS_IN,
  SET_CURRENT_MEETINGS,
  SET_CURRENT_MEALS,
  SET_CURRENT_EVENTS
} = budgetSlice.actions

export const selectBudget = (state) => state.budget

export default budgetSlice.reducer
