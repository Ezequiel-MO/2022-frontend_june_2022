import { useEffect } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { Icon } from '@iconify/react'
import { useBudget, useFindByName } from '../../../../hooks'
import { HotelMultipleChoice, HotelTotalCostContainer } from '../../'

export const HotelSummaryRow = ({ nights }) => {
  const {
    breakdownOpen,
    hotels,
    hotelName,
    toggleBreakdown,
    updateHotelTotalCost
  } = useBudget()

  const { selectedOption: selectedHotel } = useFindByName(hotels, hotelName)

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
        <HotelTotalCostContainer />
      </TableRow>
    </>
  )
}
