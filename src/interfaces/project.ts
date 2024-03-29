import {
  IEvent,
  IMeeting,
  IRestaurant,
  ITransfer,
  IAccManager,
  IHotel,
  IClient,
  IClientCompany,
  IGift
} from './'

export interface IItinerary {
  intro: string
  itinerary: ITransfer[]
  morningActivity: IActivity
  afternoonActivity: IActivity
  nightActivity: IActivity
  lunch: IMeal
  dinner: IMeal
  starts: 'morning' | 'afternoon' | 'night' | ''
  ends: 'morning' | 'afternoon' | 'night' | ''
}

export interface IOvernight {
  intro: string
  hotels: IHotel[]
}

export interface IMeal {
  intro: string
  restaurants: IRestaurant[]
}

export interface IActivity {
  intro: string
  events: IEvent[]
}

export interface IMeetingDetails {
  intro: string
  meetings: IMeeting[]
}

export interface IDay {
  _id: string
  date: string
  fullDayMeetings: IMeetingDetails
  morningMeetings: IMeetingDetails
  morningEvents: IActivity
  afternoonMeetings: IMeetingDetails
  afternoonEvents: IActivity
  itinerary: IItinerary
  lunch: IMeal
  dinner: IMeal
  overnight: IOvernight
  transfer_in: ITransfer[]
  transfer_out: ITransfer[]
}

export interface IProject {
  _id?: string
  code: string
  accountManager: IAccManager[]
  groupName: string
  groupLocation: string
  arrivalDay: string
  departureDay: string
  nrPax: number
  projectIntro: string[]
  multiDestination: boolean
  hideDates: boolean
  suplementaryText: boolean
  hotels: IHotel[]
  status: 'Received' | 'Sent' | 'Confirmed' | 'Cancelled' | 'Invoiced'
  estimate: number
  budget: 'budget' | 'noBudget' | 'budgetAsPdf'
  imageContentUrl: string[]
  hasSideMenu: boolean
  hasExternalCorporateImage: boolean
  clientAccManager: IClient[]
  clientCompany: IClientCompany[]
  schedule: IDay[]
  gifts: IGift[]
}
