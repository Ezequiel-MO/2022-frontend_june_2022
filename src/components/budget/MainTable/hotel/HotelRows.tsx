import { HotelSummaryRow, HotelBreakdownRows } from '.'
import { IHotel } from '../../../../interfaces'

interface HotelRowsProps {
  hotels?: IHotel[]
  nights: number
}

export const HotelRows = ({ hotels, nights }: HotelRowsProps) => {
  if (!hotels || hotels.length === 0) {
    return null
  }
  return (
    <>
      <HotelSummaryRow nights={nights} />
      <HotelBreakdownRows hotels={hotels} nights={nights} />
    </>
  )
}
