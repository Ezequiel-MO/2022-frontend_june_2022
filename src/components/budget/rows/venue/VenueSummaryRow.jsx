import { useState, useEffect, useContext } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { Icon } from '@iconify/react'
import { getVenueTotal } from '../../totals/compute-totals-functions'
import VenueMultipleChoice from './VenueMultipleChoice'
import { BudgetContext } from '../../context/context'
import { BUDGET_ACTIONS } from '../../context/reducer'

const VenueSummaryRow = ({ options, pax }) => {
  const { budgetValues, dispatch } = useContext(BudgetContext)
  const [selectedVenue, setSelectedVenue] = useState(options[0])
  const { venueBreakdownOpen, selectedVenueName } = budgetValues

  useEffect(() => {
    const totalAmount = getVenueTotal(selectedVenue.venue_price[0])
    dispatch({
      type: BUDGET_ACTIONS.SET_SELECTED_VENUE_TOTAL_COST,
      payload: totalAmount
    })
  }, [selectedVenue])

  useEffect(() => {
    if (selectedVenueName) {
      setSelectedVenue(
        options?.find((venue) => venue.name === selectedVenueName)
      )
    }
  }, [selectedVenueName, options])

  const { venue_price } = selectedVenue
  const { catering_units } = venue_price[0]
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            onClick={() =>
              dispatch({
                type: BUDGET_ACTIONS.TOGGLE_VENUE_BREAKDOWN,
                payload: !venueBreakdownOpen
              })
            }
          >
            {budgetValues.venueBreakdownOpen ? (
              <Icon icon='bx:up-arrow' color='#ea5933' />
            ) : (
              <Icon icon='bx:down-arrow' color='#ea5933' />
            )}
          </IconButton>
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <VenueMultipleChoice options={options} />
        </TableCell>
        <TableCell>{catering_units}</TableCell>
        <TableCell></TableCell>
        <TableCell>
          {accounting.formatMoney(getVenueTotal(venue_price[0]), '€')}
        </TableCell>
      </TableRow>
    </>
  )
}

export default VenueSummaryRow
