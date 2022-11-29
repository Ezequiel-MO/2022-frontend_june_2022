import { useEffect } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { Icon } from '@iconify/react'
import HotelMultipleChoice from './HotelMultipleChoice'
import { useBudget } from '../../../../hooks/useBudget'
import HotelTotalCost from './HotelTotalCost'
import useFindHotelByName from '../../../../hooks/useFindHotelByName'

const HotelSummaryRow = ({ nights }) => {
  const {
    breakdownOpen,
    hotels,
    hotelName,
    toggleBreakdown,
    updateHotelTotalCost
  } = useBudget()

  const { selectedHotel } = useFindHotelByName(hotelName, hotels)

  useEffect(() => {
    if (hotels?.length > 0) {
      updateHotelTotalCost(selectedHotel, nights)
    }
  }, [hotels, nights, updateHotelTotalCost])

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => toggleBreakdown('hotel')}>
            {breakdownOpen['hotel'] ? (
              <Icon icon='bx:up-arrow' color='#ea5933' />
            ) : (
              <Icon icon='bx:down-arrow' color='#ea5933' />
            )}
          </IconButton>
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <HotelMultipleChoice options={hotels} />
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <HotelTotalCost />
      </TableRow>
    </>
  )
}

export default HotelSummaryRow
