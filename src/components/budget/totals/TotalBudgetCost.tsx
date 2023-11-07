import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useTranslation } from '../../../translations/translationContext'
import { usePartialCostsData } from '../partial-costs/usePartialCostsData'

export const TotalBudgetCost: React.FC = () => {
  const { totalCostOfItems } = usePartialCostsData()
  const { t } = useTranslation()

  return (
    <tr>
      <td colSpan={3} />
      <td colSpan={2}>
        <strong>{t('TOTAL BUDGET')}</strong>
      </td>
      <td>
        <strong>{accounting.formatMoney(totalCostOfItems, '€')}</strong>
      </td>
    </tr>
  )
}
