import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useTranslation } from '../../../translations/translationContext'
import { usePartialCostsData } from '../partial-costs/usePartialCostsData'

export const TotalBudgetCost = () => {
  const { totalCostOfItems } = usePartialCostsData()
  const { t } = useTranslation()

  return (
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell colSpan={2}>
        <strong>{t('TOTAL BUDGET')}</strong>
      </TableCell>
      <TableCell>
        <strong>{accounting.formatMoney(totalCostOfItems, '€')}</strong>
      </TableCell>
    </TableRow>
  )
}
