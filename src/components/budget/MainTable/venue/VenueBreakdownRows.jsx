import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { VenueBreakdownRow } from './'
import { useBudget, useFindByName } from '../../../../hooks'

export const VenueBreakdownRows = ({ venues, dateProp, typeOfMeetingProp }) => {
  const { breakdownOpen, venueName } = useBudget()
  const { venueBreakdownOpen } = breakdownOpen
  const { open, date, typeOfEvent } = venueBreakdownOpen

  const { selectedOption: selectedVenue = venues[0] } = useFindByName(
    venues,
    venueName
  )

  const {
    rental,
    cocktail_units,
    cocktail_price,
    catering_units,
    catering_price,
    staff_units,
    staff_menu_price,
    audiovisuals,
    cleaning,
    security,
    entertainment
  } = selectedVenue?.venue_price || {}

  const BreakdownRowsArr = [
    { units: 1, title: 'Rental Fee', rate: rental },
    {
      units: cocktail_units,
      title: 'Pre-dinner Cocktail',
      rate: cocktail_price
    },
    {
      units: catering_units,
      title: 'Full menu w/drinks & cofee',
      rate: catering_price
    },
    { units: staff_units, title: 'Staff Menu', rate: staff_menu_price },
    { units: 1, title: 'AudioVisuals', rate: audiovisuals },
    { units: 1, title: 'Cleaning', rate: cleaning },
    { units: 1, title: 'Security', rate: security },
    { units: 1, title: 'Entertainment', rate: entertainment }
  ]

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse
          in={open && date === dateProp && typeOfEvent === typeOfMeetingProp}
          timeout='auto'
          unmountOnExit
        >
          <Box margin={1}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Nr. Units </TableCell>
                  <TableCell></TableCell>
                  <TableCell>Unit Cost</TableCell>
                  <TableCell>Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {BreakdownRowsArr.map(({ units, title, rate }) => {
                  return (
                    rate && (
                      <TableRow key={title}>
                        <VenueBreakdownRow
                          units={units}
                          title={title}
                          rate={rate}
                        />
                      </TableRow>
                    )
                  )
                })}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}
