import { TableCell } from '@mui/material'
import accounting from 'accounting'

interface Props {
  units: number
  title: string
  rate: number
}
export const VenueBreakdownRow = ({ units, title, rate }: Props) => {
  if (units === 0) return null
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
