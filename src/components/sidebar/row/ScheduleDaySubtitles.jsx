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
  return (
    <div
      key={day._id}
      className={`${
        menuOpen ? 'flex flex-col' : 'hidden'
      } bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 space-y-4 p-4 ml-4 hover:shadow-lg`}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <div className='flex flex-col'>
        {day.morningEvents?.length > 0 ? (
          <span className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'>
            Morning Events
          </span>
        ) : null}
        {day.morningMeetings?.length > 0 ? (
          <span className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'>
            Morning Meetings
          </span>
        ) : null}
        {day.lunch?.length > 0 ? (
          <span className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'>
            Lunch
          </span>
        ) : null}
        {day.afternoonEvents?.length > 0 ? (
          <span className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'>
            Afternoon Events
          </span>
        ) : null}
        {day.afternoonMeetings?.length > 0 ? (
          <span className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'>
            Afternoon Meetings
          </span>
        ) : null}
        {day.dinner?.length > 0 ? (
          <span className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'>
            Dinner
          </span>
        ) : null}
        {day.fulldayMeetings?.length > 0 ? (
          <span className='text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm'>
            Full Day Meetings
          </span>
        ) : null}
      </div>
    </div>
  )
}
