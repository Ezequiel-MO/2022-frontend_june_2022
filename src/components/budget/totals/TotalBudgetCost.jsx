import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useBudgetData } from '../../../hooks'

export const TotalBudgetCost = () => {
  const { totalCost } = useBudgetData()

  return (
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell colSpan={2}>
        <strong>TOTAL BUDGET</strong>
      </TableCell>
      <TableCell>
        <strong>{accounting.formatMoney(totalCost, '€')}</strong>
      </TableCell>
    </TableRow>
  )
}
