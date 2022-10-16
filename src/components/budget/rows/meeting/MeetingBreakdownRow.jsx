import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'

const MeetingBreakdownRow = ({ units, title, rate }) => {
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {title}
      </TableCell>
      <TableCell>{units}</TableCell>
      <TableCell></TableCell>
      <TableCell>{accounting.formatMoney(rate, '€')}</TableCell>
      <TableCell>{accounting.formatMoney(rate * units, '€')}</TableCell>
    </TableRow>
  )
}

export default MeetingBreakdownRow
