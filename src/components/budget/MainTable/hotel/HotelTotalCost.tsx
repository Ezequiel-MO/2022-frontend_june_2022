import accounting from 'accounting'
import { TableCell } from '@mui/material'
import { IHotel } from '../../../../interfaces'

interface Props {
  selectedHotel: IHotel
}

export const HotelTotalCost = ({ selectedHotel }: Props) => {
  return (
    <TableCell>
      {accounting.formatMoney(selectedHotel.totalCost || 0, '€')}
    </TableCell>
  )
}
