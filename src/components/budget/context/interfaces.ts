import {
  IDay,
  IEntertainment,
  IEvent,
  IGift,
  IHotel,
  IMeeting,
  IRestaurant,
  ITransfer
} from '../../../interfaces'
import {
  UPDATE_PROGRAM_ACTIVITIES_COST,
  UPDATE_PROGRAM_MEALS_COST,
  UPDATE_PROGRAM_MEETINGS_COST,
  UPDATE_PROGRAM_TRANSFERS_COST,
  SET_SELECTED_HOTEL,
  SET_SELECTED_HOTEL_COST,
  UPDATE_TRANSFERS_IN_COST,
  UPDATE_TRANSFERS_OUT_COST,
  UPDATE_PROGRAM_SHOWS_COST,
  UPDATE_OVERNIGHT_COST,
  UPDATE_GIFTS_COST
} from './budgetReducer'

export interface BudgetState {
  hotels: IHotel[]
  selectedHotel: IHotel | null
  selectedHotelCost: number
  schedule: IDay[]
  activities: {
    [key: string]: {
      morning?: IEvent
      afternoon?: IEvent
    }
  }
  activitiesCost: number
  meals: {
    [key: string]: {
      lunch?: IRestaurant
      dinner?: IRestaurant
    }
  }
  mealsCost: number
  meetings: {
    [key: string]: {
      morning?: IMeeting
      afternoon?: IMeeting
      fullDay?: IMeeting
    }
  }
  meetingsCost: number
  overnight: {
    [key: string]: {
      hotel: IHotel | null
      hotelCost: number
    }
  }
  overnightCost: number
  shows: {
    [key: string]: {
      lunch?: IEntertainment
      dinner?: IEntertainment
    }
  }
  showsCost: number
  programTransfers: {
    [date: string]: {
      [type: string]: {
        transferCost: number
      }
    }
  }
  programTransfersCost: number
  transfersInCost: number
  transfersOutCost: number
  itineraryTransfers: {
    [date: string]: {
      [type: string]: {
        transferCost: number
      }
    }
  }
  itineraryTransfersCost: number
  giftsCost: number
  nrPax: number
}

export type SetSelectedHotelAction = {
  type: typeof SET_SELECTED_HOTEL
  payload: {
    selectedHotel: IHotel
  }
}

export type SetSelectedHotelCostAction = {
  type: typeof SET_SELECTED_HOTEL_COST
  payload: {
    nights: number
    selectedHotel: IHotel
  }
}

export type UpdateTransfersInCost = {
  type: typeof UPDATE_TRANSFERS_IN_COST
  payload: {
    transfer_in: ITransfer[]
  }
}

export type UpdateTransfersOutCost = {
  type: typeof UPDATE_TRANSFERS_OUT_COST
  payload: {
    transfer_out: ITransfer[]
  }
}

export type UpdateProgramTransfersCost = {
  type: typeof UPDATE_PROGRAM_TRANSFERS_COST
  payload: {
    date: string
    transfer: ITransfer | null
    count: number
    type:
      | 'transfer_morningEvents'
      | 'transfer_afternoonEvents'
      | 'transfer_lunch'
      | 'transfer_dinner'
      | 'meetGreet'
      | 'assistance'
      | 'transfer_morningItinerary'
      | 'transfer_afternoonItinerary'
  }
}

export type UpdateProgramMealsCost = {
  type: typeof UPDATE_PROGRAM_MEALS_COST
  payload: {
    date: string
    restaurant: IRestaurant | null
    pax: number
    type: 'lunch' | 'dinner'
  }
}

export type UpdateActivitiesCost = {
  type: typeof UPDATE_PROGRAM_ACTIVITIES_COST
  payload: {
    date: string
    activity: IEvent | null
    pax: number
    type: 'morning' | 'afternoon'
  }
}

export type UpdateMeetingsCost = {
  type: typeof UPDATE_PROGRAM_MEETINGS_COST
  payload: {
    date: string
    meeting: IMeeting | null
    type: 'morning' | 'afternoon' | 'full_day'
    pax: number
  }
}

export type UpdateShowsCost = {
  type: typeof UPDATE_PROGRAM_SHOWS_COST
  payload: {
    date: string
    show: IEntertainment | null
    type: 'lunch' | 'dinner'
  }
}

export type UpdateOvernightCost = {
  type: typeof UPDATE_OVERNIGHT_COST
  payload: {
    date: string
    hotel: IHotel | null
  }
}

export type UpdateGiftsCost = {
  type: typeof UPDATE_GIFTS_COST
  payload: {
    gift: IGift | null
  }
}

export type BudgetActions =
  | SetSelectedHotelAction
  | SetSelectedHotelCostAction
  | UpdateTransfersInCost
  | UpdateTransfersOutCost
  | UpdateProgramTransfersCost
  | UpdateProgramMealsCost
  | UpdateActivitiesCost
  | UpdateMeetingsCost
  | UpdateShowsCost
  | UpdateOvernightCost
  | UpdateGiftsCost
