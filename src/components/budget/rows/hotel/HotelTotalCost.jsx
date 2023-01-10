import { useEffect } from 'react'
import accounting from 'accounting'
import { TableCell } from '@mui/material'
import {
  useBudget,
  useCurrentProject,
  useFindHotelByName
} from '../../../../hooks'

export const HotelTotalCost = () => {
  const { hotelName, hotels } = useBudget()
  const { setCurrentHotel } = useCurrentProject()

  const hotel_name = hotelName || hotels[0].name

  const { selectedHotel } = useFindHotelByName(hotel_name, hotels)

  useEffect(() => {
    setCurrentHotel(selectedHotel)
  }, [selectedHotel])

  return (
    <TableCell>
      {accounting.formatMoney(selectedHotel?.totalCost, '€')}
    </TableCell>
  )
}
