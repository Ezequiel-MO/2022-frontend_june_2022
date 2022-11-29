import { TableCell } from '@mui/material'
import accounting from 'accounting'

const VenueBreakdownRow = ({ units, title, rate }) => {
  return (
    <>
      <TableCell component='th' scope='row'>
        {title}
      </TableCell>
      <TableCell>{units}</TableCell>
      <TableCell></TableCell>
      <TableCell>{accounting.formatMoney(rate, '€')}</TableCell>
      <TableCell>{accounting.formatMoney(rate * units, '€')}</TableCell>
    </>
  )
}

export default VenueBreakdownRow
