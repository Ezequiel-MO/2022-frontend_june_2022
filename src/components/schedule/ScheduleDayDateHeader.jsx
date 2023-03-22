import { useCurrentProject } from '../../hooks'
import { useTranslation } from '../../translations/translationContext'
import { convertDate } from './helpers'

export const DateHeader = ({ date, index, arrivalDay }) => {
  const { currentProject } = useCurrentProject()
  const { clientAccManager = [] } = currentProject || {}
  const { quoteLanguage = 'EN' } = clientAccManager[0] || {}
  const { t } = useTranslation()

  const formattedDate = convertDate(index, arrivalDay, quoteLanguage)
  return (
    <h2 className='text-lg md:text-xl my-4 font-extrabold' id={`day_${index}`}>
      {t(date)} - {formattedDate}
    </h2>
  )
}
