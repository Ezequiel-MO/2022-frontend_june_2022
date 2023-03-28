import { DateHeader } from './ScheduleDayDateHeader'
import { ScheduleDayEvents } from './ScheduleDayEvents'
import { ScheduleDayMeals } from './ScheduleDayMeals'
import { ScheduleDayMeetings } from './ScheduleDayMeetings'

export const ScheduleDay = ({ day, index, suplementaryText, arrivalDay }) => {
  return (
    <div className='mb-6'>
      <div className='flex flex-col' id={`${day.date}_id`}>
        <DateHeader date={day.date} index={index} arrivalDay={arrivalDay} />
        <ScheduleDayEvents
          id={`${day.date}-morning-events`}
          title='Morning Events'
          events={day.morningEvents}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayMeetings
          title='Morning Meeting'
          meetings={day.morningMeetings}
          timing='Morning'
          suplementaryText={suplementaryText}
          id={`${day.date}-morning-meetings`}
        />
        <ScheduleDayMeals
          id={`${day.date}-lunch`}
          title='Lunch'
          restaurants={day.lunch}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayEvents
          id={`${day.date}-afternoon-events`}
          title='Afternoon Events'
          events={day.afternoonEvents}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayMeetings
          title='Afternoon Meeting'
          meetings={day.afternoonMeetings}
          timing='Afternoon'
          suplementaryText={suplementaryText}
          id={`${day.date}-afternoon-meetings`}
        />
        <ScheduleDayMeals
          id={`${day.date}-dinner`}
          title='Dinner'
          restaurants={day.dinner}
          suplementaryText={suplementaryText}
        />
      </div>

      <hr className='mt-6' />
    </div>
  )
}
