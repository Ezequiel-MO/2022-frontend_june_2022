import accounting from 'accounting'
import { TableCell } from '@mui/material'

export const TotalRow = ({ option }) => {
  return (
    <>
      <TableCell>{accounting.formatMoney(option.price, '€')}</TableCell>
      <TableCell>{accounting.formatMoney(option.totalCost, '€')}</TableCell>
    </>
  )
}
