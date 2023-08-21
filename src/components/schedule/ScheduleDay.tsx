import { IActivity, IDay, IMeal, IMeetingDetails } from '../../interfaces'
import { DateHeader } from './ScheduleDayDateHeader'
import { ScheduleDayEvents } from './ScheduleDayEvents'
import { ScheduleDayMeals } from './ScheduleDayMeals'
import { ScheduleDayMeetings } from './ScheduleDayMeetings'

interface Props {
  day: IDay
  index: number
  suplementaryText: boolean
  arrivalDay: string
}

type Data = IActivity | IMeal | IMeetingDetails

export const ScheduleDay = ({
  day,
  index,
  suplementaryText,
  arrivalDay
}: Props) => {
  const extractData = (data: Data) => {
    const { intro, ...rest } = data
    return { introduction: intro, data: Object.values(rest)[0] }
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
        <ScheduleDayMeetings
          title='Full Day Meeting'
          meetings={afternoonMeetings.data}
          timing='Full Day'
          suplementaryText={suplementaryText}
          id={`${day.date}-fullday-meetings`}
        />
      </div>

      <hr className='mt-6' />
    </div>
  )
}
