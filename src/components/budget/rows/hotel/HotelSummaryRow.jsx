import { useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { useBudget, useFindByName } from '../../../../hooks'
import { HotelMultipleChoice, HotelTotalCostContainer } from '../../'
import { BudgetToggleIcon } from '../../ui/'

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
          <BudgetToggleIcon
            isOpen={breakdownOpen['hotel']}
            onClick={() => toggleBreakdown('hotel')}
          />
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
