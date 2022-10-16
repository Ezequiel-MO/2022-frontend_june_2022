import { useContext, useEffect, useState } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { Icon } from '@iconify/react'
import { accounting } from 'accounting'
import { BudgetContext } from '../../context/context'
import { BUDGET_ACTIONS } from '../../context/reducer'
import HotelMultipleChoice from './HotelMultipleChoice'
import { getHotelTotal } from '../../totals/compute-totals-functions'
import { useBudget } from '../../../../hooks/useBudget'

const HotelSummaryRow = ({ hotels, nights }) => {
  const { setSelectedHotel } = useBudget()
  const { budgetValues, dispatch } = useContext(BudgetContext)
  const { hotelBreakdownOpen, selectedHotelName } = budgetValues
  const [selectedHotelState, setSelectedHotelState] = useState(hotels[0])

  useEffect(() => {
    setSelectedHotel(selectedHotelState)
  }, [selectedHotelState])

  useEffect(() => {
    if (selectedHotelName) {
      const selectedHotel = hotels?.find(
        (hotel) => hotel.name === selectedHotelName
      )
      setSelectedHotelState(selectedHotel)
    }
  }, [selectedHotelName, hotels])

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            onClick={() =>
              dispatch({
                type: BUDGET_ACTIONS.TOGGLE_HOTEL_BREAKDOWN,
                payload: !hotelBreakdownOpen
              })
            }
          >
            {hotelBreakdownOpen ? (
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
        <TableCell>
          {accounting.formatMoney(
            getHotelTotal(selectedHotelState.price[0], nights),
            '€'
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

export default HotelSummaryRow
