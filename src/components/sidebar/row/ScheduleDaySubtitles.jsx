import { Link } from 'react-scroll'
import { useTranslation } from '../../../translations/translationContext'

export const ScheduleDaySubtitles = ({ day, menuOpen, setMenuOpen }) => {
  if (
    !day.morningEvents?.length &&
    !day.morningMeetings?.length &&
    !day.lunch?.length &&
    !day.afternoonEvents?.length &&
    !day.afternoonMeetings?.length &&
    !day.dinner?.length &&
    !day.fulldayMeetings?.length
  ) {
    return null
  }
  const { t } = useTranslation()
  return (
    <div
      key={day._id}
      className={`${
        menuOpen ? 'flex flex-col' : 'hidden'
      } dark:bg-green-50 dark:bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 space-y-4 p-4 ml-4 hover:shadow-lg`}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <div className='flex flex-col'>
        {day.morningEvents?.length > 0 ? (
          <Link
            className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'
            to={`${day.date}-morning-events`}
            smooth={true}
            offset={-100}
          >
            {t('Morning Events')}
          </Link>
        ) : null}
        {day.morningMeetings?.length > 0 ? (
          <Link
            className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'
            to={`${day.date}-morning-meetings`}
            smooth={true}
            offset={-100}
          >
            Morning Meetings
          </Link>
        ) : null}
        {day.lunch?.length > 0 ? (
          <Link
            className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'
            to={`${day.date}-lunch`}
            smooth={true}
            offset={-100}
          >
            {t('Lunch')}
          </Link>
        ) : null}
        {day.afternoonEvents?.length > 0 ? (
          <Link
            className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'
            to={`${day.date}-afternoon-events`}
            smooth={true}
            offset={-100}
          >
            {t('Afternoon Events')}
          </Link>
        ) : null}
        {day.afternoonMeetings?.length > 0 ? (
          <Link
            className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'
            to={`${day.date}-afternoon-meetings`}
            smooth={true}
            offset={-100}
          >
            Afternoon Meetings
          </Link>
        ) : null}
        {day.dinner?.length > 0 ? (
          <Link
            className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'
            to={`${day.date}-dinner`}
            smooth={true}
            offset={-100}
          >
            {t('Dinner')}
          </Link>
        ) : null}
        {day.fulldayMeetings?.length > 0 ? (
          <Link
            className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'
            to={`${day.date}-fullday-meetings`}
            smooth={true}
          >
            Full Day Meetings
          </Link>
        ) : null}
      </div>
    </div>
  )
}
