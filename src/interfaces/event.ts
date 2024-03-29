import { ITransfer } from './transfer'

export interface IEvent {
  _id: string
  name: string
  city?: string
  textContent?: string
  imageContentUrl?: string[]
  pricePerPerson?: boolean
  price: number
  coordsActive: boolean
  location?: {
    type: string
    coordinates: number[]
    address: string
    description: string
  }
  introduction?: string[]
  transfer: ITransfer[]
  totalCost?: number
}
