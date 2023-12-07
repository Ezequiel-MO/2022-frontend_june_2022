import { useCurrentProject } from '../../hooks'
import { IProject } from '../../interfaces'
import { TranslationKeys } from '../../interfaces/translations'
import { useTranslation } from '../../translations/translationContext'
import { convertDate } from './helpers'

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
    <h2 className='text-lg md:text-xl my-4 font-extrabold' id={`day_${index}`}>
      {t(date as TranslationKeys)} - {formattedDate}
    </h2>
  )
}
