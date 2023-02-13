import { useCurrentProject } from '../../hooks'
import ParagraphText from '../Text'
import { Meals, Events } from './'

export const Schedule = () => {
  const { currentProject } = useCurrentProject()
  const { schedule, suplementaryText, arrivalDay } = currentProject

  const convertDate = (index) => {
    const date = new Date(arrivalDay)
    const day = date.getDay()
    const dayOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ][day]
    const month = date.getMonth()
    const monthOfYear = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ][month]

    if (index === 0) {
      return `${dayOfWeek}, ${monthOfYear} ${date.getDate()}  `
    }
    const newDate = new Date(date.setDate(date.getDate() + index))
    const newDay = newDate.getDay()
    const newDayOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ][newDay]
    const newMonth = newDate.getMonth()
    const newMonthOfYear = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ][newMonth]

    return `${newDayOfWeek}, ${newDate.getDate()} de ${newMonthOfYear}`
  }

  const renderSchedule = schedule?.map((day, index) => {
    return (
      <div key={day._id} className='mb-6'>
        <div className='flex flex-col' id={`${day.date}_id`}>
          <h2
            className='text-lg md:text-xl mb-4 font-extrabold'
            id={`day_${index}`}
          >
            {day.date} - {convertDate(index)}
          </h2>
          {day.morningEvents.length > 0 ? (
            <>
              <ParagraphText text={day.morningEvents[0].introduction} />
              <Events events={day.morningEvents} />
            </>
          ) : suplementaryText === true ? (
            <h3 className='italic m-2 hidden'>
              No tours planned in the morning
            </h3>
          ) : null}
          {/* {day.morningMeetings.length > 0 ? (
            <>
              <p className='text-black-50 dark:text-white-50'>
                {day.morningMeetings[0].introduction}
              </p>
              <Meetings meetings={day.morningMeetings} timing='Morning' />
            </>
          ) : (
            <h3 className='italic m-2 hidden'>
              No events planned in the morning
            </h3>
          )} */}
          {day.lunch.length > 0 ? (
            <>
              <ParagraphText text={day.lunch[0].introduction} />
              <Meals restaurants={day.lunch} />
            </>
          ) : suplementaryText === true ? (
            <h3 className='italic m-2'>No meals planned for lunch</h3>
          ) : null}
          {day.afternoonEvents.length > 0 ? (
            <>
              <ParagraphText text={day.afternoonEvents[0].introduction} />
              <Events events={day.afternoonEvents} />
            </>
          ) : suplementaryText === true ? (
            <h3 className='italic m-2'>No events planned in the afternoon</h3>
          ) : null}
          {day.dinner.length > 0 ? (
            <>
              <ParagraphText text={day.dinner[0].introduction} />
              <Meals restaurants={day.dinner} />
            </>
          ) : suplementaryText === true ? (
            <h3 className='italic m-2'>No events planned for dinner</h3>
          ) : null}
        </div>

        <hr className='mt-6' />
      </div>
    )
  })

  return <div>{renderSchedule}</div>
}
