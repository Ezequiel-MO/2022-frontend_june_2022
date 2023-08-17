import { TableHead, TableRow } from '@mui/material'
import { useCurrentProject } from '../../../../hooks'
import { useTranslation } from '../../../../translations/translationContext'
import { HeaderCell } from '../../../atoms'
import { IClientCompany, IProject } from '../../../../interfaces'

export const BudgetTableHead: React.FC = () => {
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { clientCompany } = currentProject as {
    clientCompany: IClientCompany[]
  }
  const { colorPalette = [] } = clientCompany[0] || {}

  const textColorClass =
    colorPalette.length > 0 ? `text-[${colorPalette[0]}]` : 'text-orange-50'
  const backgroundColorClass =
    colorPalette.length > 1
      ? `dark:!bg-[${colorPalette[1]}]`
      : 'dark:!bg-brown-100'

  const { t } = useTranslation()

  return (
    <TableHead>
      <TableRow>
        <HeaderCell width='10%' className={backgroundColorClass} />
        <HeaderCell
          width='20%'
          className={`${backgroundColorClass} ${textColorClass}`}
        >
          {t('Event Type')}
        </HeaderCell>
        <HeaderCell
          width='35%'
          className={`${backgroundColorClass} ${textColorClass}`}
        >
          {t('Service')}
        </HeaderCell>
        <HeaderCell
          width='5%'
          className={`${backgroundColorClass} ${textColorClass}`}
        >
          {t('Pax/units')}
        </HeaderCell>
        <HeaderCell
          width='15%'
          className={`${backgroundColorClass} ${textColorClass}`}
        >
          {t('Unit cost w/VAT')}
        </HeaderCell>
        <HeaderCell
          width='15%'
          className={`${backgroundColorClass} ${textColorClass}`}
        >
          {t('Total cost w/VAT')}
        </HeaderCell>
      </TableRow>
    </TableHead>
  )
}
