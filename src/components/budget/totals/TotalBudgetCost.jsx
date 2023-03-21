import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { usePartialCostsData } from '../partial-costs/usePartialCostsData'

export const TotalBudgetCost = () => {
  const { totalCostOfItems } = usePartialCostsData()

  return (
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell colSpan={2}>
        <strong>TOTAL BUDGET</strong>
      </TableCell>
      <TableCell>
        <strong>{accounting.formatMoney(totalCostOfItems, '€')}</strong>
      </TableCell>
    </TableRow>
  )
}
