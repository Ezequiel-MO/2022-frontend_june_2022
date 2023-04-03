import { HotelSummaryRow, HotelBreakdownRows } from './'

export const HotelRows = ({ hotels, nights }) => {
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
