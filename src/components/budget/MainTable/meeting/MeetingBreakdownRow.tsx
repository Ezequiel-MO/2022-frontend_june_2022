import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'

interface Props {
  units: number | 0
  title: string
  rate: number | 0
}

export const MeetingBreakdownRow = ({ units, title, rate }: Props) => {
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
