import { useState } from 'react'
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
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <HotelSummaryRow nights={nights} isOpen={isOpen} setIsOpen={setIsOpen} />
      <HotelBreakdownRows hotels={hotels} nights={nights} isOpen={isOpen} />
    </>
  )
}
