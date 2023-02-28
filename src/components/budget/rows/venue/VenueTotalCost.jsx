import { TableCell } from '@mui/material'
import accounting from 'accounting'
import { useBudget, useFindByName } from '../../../../hooks'

export const VenueTotalCost = ({ venues }) => {
  const { venueName } = useBudget()
  const { selectedOption: selectedVenue = venues[0] } = useFindByName(
    venues,
    venueName
  )
  return (
    <TableCell>
      {accounting.formatMoney(selectedVenue?.totalCost, '€')}
    </TableCell>
  )
}
