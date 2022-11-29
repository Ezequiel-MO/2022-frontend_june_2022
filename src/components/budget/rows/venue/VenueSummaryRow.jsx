import { useEffect } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { Icon } from '@iconify/react'
import VenueMultipleChoice from './VenueMultipleChoice'
import { useBudget } from '../../../../hooks/useBudget'
import VenueSingleChoiceCells from './VenueSingleChoiceCells'
import useFindVenueByName from '../../../../hooks/useFindVenueByName'
import VenueTotalCost from './VenueTotalCost'

const VenueSummaryRow = ({ venues, id, pax, dateProp, typeOfMeetingProp }) => {
  const {
    toggleVenueBreakdown,
    breakdownOpen,
    updateEventTotalCost,
    setCurrentMeals,
    venueName
  } = useBudget()
  const { venueBreakdownOpen } = breakdownOpen
  const { open, date, typeOfEvent } = venueBreakdownOpen

  const { selectedVenue = venues[0] } = useFindVenueByName(venues, venueName)

  useEffect(() => {
    updateEventTotalCost(dateProp, id, pax, selectedVenue?._id)
  }, [venueName])

  useEffect(() => {
    setCurrentMeals(dateProp, id, selectedVenue?._id)
  }, [selectedVenue])

  return (
    <>
      <TableRow>
        <TableCell>{dateProp}</TableCell>
        <TableCell>
          <IconButton
            onClick={() =>
              toggleVenueBreakdown({
                open: !open,
                date: dateProp,
                typeOfEvent: typeOfMeetingProp
              })
            }
          >
            {open && date === dateProp && typeOfEvent === typeOfMeetingProp ? (
              <Icon icon='bx:up-arrow' color='#ea5933' />
            ) : (
              <Icon icon='bx:down-arrow' color='#ea5933' />
            )}
          </IconButton>
        </TableCell>
        <TableCell>
          {venues.length === 1 ? (
            <VenueSingleChoiceCells
              pax={pax}
              options={venues}
              description={typeOfEvent}
              date={date}
              id={id}
            />
          ) : (
            <VenueMultipleChoice options={venues} />
          )}
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <VenueTotalCost venues={venues} />
      </TableRow>
    </>
  )
}

export default VenueSummaryRow
