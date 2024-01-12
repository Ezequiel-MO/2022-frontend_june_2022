import accounting from 'accounting'
import { useTranslation } from '../../../translations/translationContext'
import { usePartialCostsData } from '../partial-costs/usePartialCostsData'
import {
  totalTableRowClasses,
  totaltableCellClasses
} from '../../../constants/styles/table'

export const TotalBudgetCost: React.FC = () => {
  const { totalCostOfItems } = usePartialCostsData()
  const { t } = useTranslation()

  return (
    <tr className={totalTableRowClasses}>
      <td colSpan={3} className={`${totaltableCellClasses}`} />
      <td colSpan={2}>
        <strong>{t('TOTAL BUDGET')}</strong>
      </td>
      <td>
        <strong>{accounting.formatMoney(totalCostOfItems, '€')}</strong>
      </td>
    </tr>
  )
}
