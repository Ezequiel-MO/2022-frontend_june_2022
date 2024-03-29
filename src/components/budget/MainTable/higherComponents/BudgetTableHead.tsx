import { useCurrentProject } from '../../../../hooks'
import { useTranslation } from '../../../../translations/translationContext'
import { HeaderCell } from '../../../atoms'
import { IClientCompany, IProject } from '../../../../interfaces'
import { tableCellClasses } from '../../../../constants/styles/table'

export const BudgetTableHead: React.FC = () => {
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { clientCompany } = currentProject as {
    clientCompany: IClientCompany[]
  }
  const { colorPalette = [] } = clientCompany[0] || {}

  const textColorClass =
    colorPalette.length > 0 ? `text-[${colorPalette[0]}]` : 'text-secondary'
  const backgroundColorClass =
    colorPalette.length > 1
      ? `dark:!bg-[${colorPalette[1]}]`
      : 'dark:!bg-brown-100'

  const { t } = useTranslation()

  return (
    <thead className='bg-primary text-black-50 font-bold uppercase'>
      <tr>
        <HeaderCell
          width='10%'
          className={`${backgroundColorClass} text-left`}
        />
        <HeaderCell
          width='20%'
          className={`${backgroundColorClass} ${textColorClass} text-left`}
        >
          {t('Event Type')}
        </HeaderCell>
        <HeaderCell
          width='35%'
          className={`${backgroundColorClass} ${textColorClass} text-left`}
        >
          {t('Service')}
        </HeaderCell>
        <HeaderCell
          width='5%'
          className={`${backgroundColorClass} ${textColorClass} text-left`}
        >
          {t('Pax/units')}
        </HeaderCell>
        <HeaderCell
          width='15%'
          className={`${backgroundColorClass} ${textColorClass} text-left`}
        >
          {t('Unit cost w/VAT')}
        </HeaderCell>
        <HeaderCell
          width='15%'
          className={`${backgroundColorClass} ${textColorClass} text-left`}
        >
          {t('Total cost w/VAT')}
        </HeaderCell>
      </tr>
    </thead>
  )
}
