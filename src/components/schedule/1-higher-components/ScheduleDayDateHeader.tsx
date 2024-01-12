import { convertDate } from '../../../helpers/dates/date-formatters-converters'
import { useCurrentProject } from '../../../hooks'
import { IProject } from '../../../interfaces'
import { TranslationKeys } from '../../../interfaces/translations'
import { useTranslation } from '../../../translations/translationContext'
import * as styles from '../../../constants/styles/mainsection'

interface Props {
  date: string
  index: number
  arrivalDay: string
}

export const DateHeader = ({ date, index, arrivalDay }: Props) => {
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { clientAccManager = [] } = currentProject || {}
  const { quoteLanguage = 'EN' } = clientAccManager[0] || {}
  const { t } = useTranslation()

  const formattedDate = convertDate(index, arrivalDay, quoteLanguage)

  return (
    <h2 className={styles.pageDateHeader} id={`day_${index}`}>
      {t(date as TranslationKeys)} - {formattedDate}
    </h2>
  )
}
