import accounting from 'accounting'
import { TableCell } from '@mui/material'

export const HotelTotalCost = ({ selectedHotel }) => {
  return (
    <TableCell>
      {accounting.formatMoney(selectedHotel?.totalCost, '€')}
    </TableCell>
  )
}
