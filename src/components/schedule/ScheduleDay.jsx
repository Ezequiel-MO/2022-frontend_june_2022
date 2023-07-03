import { DateHeader } from './ScheduleDayDateHeader'
import { ScheduleDayEvents } from './ScheduleDayEvents'
import { ScheduleDayMeals } from './ScheduleDayMeals'
import { ScheduleDayMeetings } from './ScheduleDayMeetings'

export const ScheduleDay = ({ day, index, suplementaryText, arrivalDay }) => {
  const extractData = (data) => {
    if (Array.isArray(data)) {
      return { introduction: data[0]?.introduction, data }
    } else if (typeof data === 'object') {
      const { intro, ...rest } = data
      return { introduction: intro, data: Object.values(rest)[0] }
    }
    return { introduction: null, data: [] }
  }
  const morningEvents = extractData(day.morningEvents)
  const morningMeetings = extractData(day.morningMeetings)
  const lunch = extractData(day.lunch)
  const afternoonEvents = extractData(day.afternoonEvents)
  const afternoonMeetings = extractData(day.afternoonMeetings)
  const dinner = extractData(day.dinner)

  return (
    <div className='mb-6'>
      <div className='flex flex-col' id={`${day.date}_id`}>
        <DateHeader date={day.date} index={index} arrivalDay={arrivalDay} />
        <ScheduleDayEvents
          id={`${day.date}-morning-events`}
          title='Morning Events'
          events={morningEvents.data}
          introduction={morningEvents.introduction}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayMeetings
          title='Morning Meeting'
          meetings={morningMeetings.data}
          introduction={morningMeetings.introduction}
          timing='Morning'
          suplementaryText={suplementaryText}
          id={`${day.date}-morning-meetings`}
        />
        <ScheduleDayMeals
          id={`${day.date}-lunch`}
          title='Lunch'
          restaurants={lunch.data}
          introduction={lunch.introduction}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayEvents
          id={`${day.date}-afternoon-events`}
          title='Afternoon Events'
          events={afternoonEvents.data}
          introduction={afternoonEvents.introduction}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayMeetings
          title='Afternoon Meeting'
          meetings={afternoonMeetings.data}
          introduction={afternoonMeetings.introduction}
          timing='Afternoon'
          suplementaryText={suplementaryText}
          id={`${day.date}-afternoon-meetings`}
        />
        <ScheduleDayMeals
          id={`${day.date}-dinner`}
          title='Dinner'
          restaurants={dinner.data}
          introduction={dinner.introduction}
          suplementaryText={suplementaryText}
        />
      </div>

      <hr className='mt-6' />
    </div>
  )
}
