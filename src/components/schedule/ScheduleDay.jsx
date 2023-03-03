import { DateHeader } from './ScheduleDayDateHeader'
import { ScheduleDayEvents } from './ScheduleDayEvents'
import { ScheduleDayMeals } from './ScheduleDayMeals'

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
