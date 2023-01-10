import { TableCell } from '@mui/material'
import accounting from 'accounting'
import { useBudget, useFindVenueByName } from '../../../../hooks'

export const VenueTotalCost = ({ venues }) => {
  const { venueName } = useBudget()
  const { selectedVenue = venues[0] } = useFindVenueByName(venues, venueName)
  return (
    <TableCell>
      {accounting.formatMoney(selectedVenue?.totalCost, '€')}
    </TableCell>
  )
}
