import { useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { useBudget, useFindByName } from '../../../../hooks'
import { HotelTotalCostContainer } from './'
import { BudgetToggleIcon } from '../../ui/'
import { OptionSelect } from '../multipleOrSingle'

export const HotelSummaryRow = ({ nights }) => {
  const {
    breakdownOpen,
    hotels,
    hotelName,
    toggleBreakdown,
    updateHotelTotalCost,
    setSelectedHotelName
  } = useBudget()

  const { selectedOption: selectedHotel } = useFindByName(hotels, hotelName)

  useEffect(() => {
    if (hotels?.length > 0) {
      updateHotelTotalCost(selectedHotel, nights)
    }
  }, [hotels, nights, updateHotelTotalCost])

  const handleChange = (e) => {
    setSelectedHotelName(e.target.value)
  }

  return (
    <>
      <TableRow>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>
          <OptionSelect
            options={hotels}
            value={hotelName || hotels[0].name}
            handleChange={handleChange}
          />
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <HotelTotalCostContainer />
      </TableRow>
    </>
  )
}
