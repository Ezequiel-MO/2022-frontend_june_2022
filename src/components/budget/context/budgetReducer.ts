import { IHotel } from '../../../interfaces'
import { BudgetActions, BudgetState } from './interfaces'

export const SET_BUDGET = 'SET_BUDGET'
export const SET_SELECTED_HOTEL = 'SET_SELECTED_HOTEL'
export const SET_SELECTED_HOTEL_COST = 'SET_SELECTED_HOTEL_COST'
export const UPDATE_TRANSFERS_IN_COST = 'UPDATE_TRANSFERS_IN_COST'
export const UPDATE_TRANSFERS_OUT_COST = 'UPDATE_TRANSFERS_OUT_COST'
export const UPDATE_ITINERARY_TRANSFERS_COST = 'UPDATE_ITINERARY_TRANSFERS_COST'
export const UPDATE_PROGRAM_TRANSFERS_COST = 'UPDATE_PROGRAM_TRANSFERS_COST'
export const UPDATE_PROGRAM_MEALS_COST = 'UPDATE_PROGRAM_MEALS_COST'
export const UPDATE_PROGRAM_ACTIVITIES_COST = 'UPDATE_PROGRAM_ACTIVITIES_COST'
export const UPDATE_PROGRAM_MEETINGS_COST = 'UPDATE_PROGRAM_MEETINGS_COST'
export const UPDATE_PROGRAM_SHOWS_COST = 'UPDATE_PROGRAM_SHOWS_COST'
export const UPDATE_OVERNIGHT_COST = 'UPDATE_OVERNIGHT_COST'
export const UPDATE_GIFTS_COST = 'UPDATE_GIFTS_COST'

interface TransferEntry {
  transferCost: number
  assistanceCost: number
}

const calculateHotelCost = (hotel: IHotel, nights: number) => {
  const firstPrice = hotel && hotel?.price[0]

  const hotelCost =
    nights *
    ((firstPrice.DUInr ?? 0) * (firstPrice.DUIprice ?? 0) +
      (firstPrice.DoubleRoomNr ?? 0) * (firstPrice.DoubleRoomPrice ?? 0) +
      (firstPrice.breakfast ?? 0) * (firstPrice.DUInr ?? 0) +
      (firstPrice.breakfast ?? 0) * (firstPrice.DoubleRoomNr ?? 0) * 2 +
      (firstPrice.DailyTax ?? 0) * (firstPrice.DUInr ?? 0) +
      (firstPrice.DailyTax ?? 0) * (firstPrice.DoubleRoomNr ?? 0) * 2)

  return hotelCost
}

export const budgetReducer = (
  state: BudgetState,
  action: BudgetActions
): BudgetState => {
  switch (action.type) {
    case SET_SELECTED_HOTEL: {
      return {
        ...state,
        selectedHotel: action.payload.selectedHotel
      }
    }
    case SET_SELECTED_HOTEL_COST: {
      let cost
      const { nights, selectedHotel } = action.payload
      const { price = [] } = selectedHotel
      if (price.length === 0) {
        return {
          ...state,
          selectedHotelCost: 0
        }
      }
      cost = calculateHotelCost(selectedHotel, nights)

      return {
        ...state,
        selectedHotelCost: cost
      }
    }
    case UPDATE_TRANSFERS_IN_COST: {
      let cost = 0
      const { transfer_in } = action.payload
      cost = transfer_in?.reduce(
        (acc, item) => acc + (item.transfer_in || 0),
        0
      )
      if (transfer_in?.length > 0) {
        const firstItem = transfer_in[0]
        cost +=
          (firstItem.assistance || 0) * (firstItem.assistanceCost || 0) +
          (firstItem.meetGreet || 0) * (firstItem.meetGreetCost || 0)
      }

      return {
        ...state,
        transfersInCost: cost
      }
    }
    case UPDATE_TRANSFERS_OUT_COST: {
      let cost = 0
      const { transfer_out } = action.payload
      cost = transfer_out?.reduce(
        (acc, item) => acc + (item.transfer_out || 0),
        0
      )
      if (transfer_out?.length > 0) {
        const firstItem = transfer_out[0]
        cost +=
          (firstItem.assistance || 0) * (firstItem.assistanceCost || 0) +
          (firstItem.meetGreet || 0) * (firstItem.meetGreetCost || 0)
      }

      return {
        ...state,
        transfersOutCost: cost
      }
    }
    case UPDATE_PROGRAM_TRANSFERS_COST: {
      const { date, transfer, count, type } = action.payload

      let totalServiceCost = 0
      let totalAssistanceCost = 0

      if (transfer) {
        const serviceKey = transfer.selectedService as keyof typeof transfer
        const serviceCost = transfer[serviceKey]

        if (typeof serviceCost === 'number') {
          totalServiceCost = serviceCost * count
        } else {
          console.error(
            `The service cost for the service '${serviceKey}' is not a number.`
          )
        }

        totalAssistanceCost =
          (transfer.assistance || 0) * (transfer.assistanceCost || 0)
      }

      const updatedTypeTransfers: TransferEntry = {
        transferCost: totalServiceCost,
        assistanceCost: totalAssistanceCost
      }

      if (
        type === 'transfer_morningItinerary' ||
        type === 'transfer_afternoonItinerary'
      ) {
        const updatedItineraryTransfers = {
          ...state.itineraryTransfers,
          [date]: {
            ...(state.itineraryTransfers[date] || {}),
            [type]: updatedTypeTransfers
          }
        }
        let newItineraryTransfersCost = 0

        Object.values(updatedItineraryTransfers).forEach((dateTransfers) => {
          Object.values(dateTransfers).forEach((transferType) => {
            newItineraryTransfersCost +=
              transferType.transferCost + totalAssistanceCost
          })
        })
        return {
          ...state,
          itineraryTransfers: updatedItineraryTransfers,
          itineraryTransfersCost: newItineraryTransfersCost
        }
      } else {
        const updatedProgramTransfers = {
          ...state.programTransfers,
          [date]: {
            ...state.programTransfers[date],
            [type]: updatedTypeTransfers
          }
        }

        let newProgramTransfersCost = 0
        Object.values(updatedProgramTransfers).forEach((dateTransfers) => {
          Object.values(dateTransfers).forEach((transferType) => {
            if ('assistanceCost' in transferType) {
              newProgramTransfersCost +=
                transferType.transferCost + (transferType.assistanceCost || 0)
            } else {
              newProgramTransfersCost += transferType.transferCost
            }
          })
        })

        return {
          ...state,
          programTransfers: updatedProgramTransfers,
          programTransfersCost: newProgramTransfersCost
        }
      }
    }
    case UPDATE_PROGRAM_MEALS_COST: {
      const { date, restaurant, pax, type } = action.payload

      let totalMealsCost = 0
      let totalVenuesCost = 0

      const updatedMeals = {
        ...state.meals,
        [date]: {
          ...state.meals?.[date],
          [type]: restaurant
        }
      }

      if (restaurant && restaurant?.isVenue) {
        const {
          rental = 0,
          cocktail_units = 0,
          cocktail_price = 0,
          catering_units = 0,
          catering_price = 0,
          staff_units = 0,
          staff_menu_price = 0,
          audiovisuals = 0,
          cleaning = 0,
          security = 0,
          entertainment = 0
        } = restaurant?.venue_price || {}

        totalVenuesCost = Number(
          rental +
            cocktail_units * cocktail_price +
            catering_units * catering_price +
            staff_units * staff_menu_price +
            audiovisuals +
            cleaning +
            security +
            entertainment
        )
        console.log('total venues cost', totalVenuesCost)
      } else {
        totalMealsCost =
          Object.values(updatedMeals).reduce((acc, day) => {
            let cost = 0
            if (day.lunch && !day.lunch.isVenue) {
              cost += day.lunch.price
            }
            if (day.dinner && !day.dinner.isVenue) {
              cost += day.dinner.price
            }
            return acc + cost
          }, 0) * pax
      }

      return {
        ...state,
        meals: {
          ...state.meals,
          [date]: {
            ...state.meals?.[date],
            [type]: restaurant
          }
        },
        mealsCost: restaurant?.isVenue ? totalVenuesCost : totalMealsCost
      }
    }

    case UPDATE_PROGRAM_ACTIVITIES_COST: {
      const { date, activity, pax, type } = action.payload

      const nrPax = activity?.pricePerPerson ? pax : 1
      let totalActivitiesCost = 0

      const updatedActivities = {
        ...state.activities,
        [date]: {
          ...state.activities?.[date],
          [type]: activity
        }
      }

      totalActivitiesCost = Object.values(updatedActivities).reduce(
        (acc, day) => {
          let cost = 0
          if (day.morning) {
            cost += (day.morning.price || 0) * nrPax
          }
          if (day.afternoon) {
            cost += (day.afternoon?.price ?? 0) * nrPax
          }
          return acc + cost
        },
        0
      )

      return {
        ...state,
        activities: updatedActivities,
        activitiesCost: totalActivitiesCost
      }
    }
    case UPDATE_PROGRAM_MEETINGS_COST: {
      const { date, meeting, type, pax } = action.payload

      if (!meeting) return state

      const updatedMeetings = {
        ...state.meetings,
        [date]: {
          ...state.meetings?.[date],
          [type]: meeting
        }
      }

      let totalMeetingsCost = 0

      Object.values(updatedMeetings).forEach((day) => {
        if (day) {
          Object.entries(day).forEach(([meetingType, meetingDetails]) => {
            if (meetingDetails) {
              const {
                FDRate = 0,
                HDRate = 0,
                HDDDR = 0,
                FDDDR = 0,
                coffeeBreakUnits = 0,
                coffeeBreakPrice = 0,
                workingLunchUnits = 0,
                workingLunchPrice = 0,
                hotelDinnerUnits = 0,
                hotelDinnerPrice = 0,
                aavvPackage = 0
              } = meetingDetails

              const dddrCost = meetingType === 'full_day' ? FDDDR : HDDDR
              const meetingCost =
                FDRate +
                HDRate +
                dddrCost * pax +
                coffeeBreakUnits * coffeeBreakPrice +
                workingLunchUnits * workingLunchPrice +
                hotelDinnerUnits * hotelDinnerPrice +
                aavvPackage
              totalMeetingsCost += meetingCost
            }
          })
        }
      })

      return {
        ...state,
        meetings: updatedMeetings,
        meetingsCost: totalMeetingsCost
      }
    }
    case UPDATE_PROGRAM_SHOWS_COST: {
      const { date, show, type } = action.payload

      const updatedShows = {
        ...state.shows,
        [date]: {
          ...state.shows[date],
          [type]: show
        }
      }
      let cost = 0

      Object.values(updatedShows).forEach((day) => {
        if (day) {
          Object.values(day).forEach((show) => {
            if (show && show?.price) {
              const {
                aavv = 0,
                artistsFee = 0,
                lighting = 0,
                mealAllowance = 0,
                travelAllowance = 0
              } = show?.price
              let showCost =
                aavv + artistsFee + lighting + mealAllowance + travelAllowance
              cost += showCost
            }
          })
        }
      })

      return {
        ...state,
        shows: updatedShows,
        showsCost: cost
      }
    }
    case UPDATE_OVERNIGHT_COST: {
      const { date, hotel } = action.payload
      const hotelCost = hotel ? calculateHotelCost(hotel, 1) : 0

      const updatedOvernight = {
        ...state.overnight,
        [date]: {
          ...state.overnight[date],
          hotel,
          hotelCost
        }
      }

      const totalCost = Object.values(updatedOvernight).reduce(
        (acc, day) => acc + day.hotelCost,
        0
      )

      return {
        ...state,
        overnight: updatedOvernight,
        overnightCost: totalCost
      }
    }
    case UPDATE_GIFTS_COST: {
      const { gift } = action.payload
      const cost = (gift && gift?.qty * gift?.price) || 0
      if (!cost) return state
      return {
        ...state,
        giftsCost: cost
      }
    }

    default:
      return state
  }
}
