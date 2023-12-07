import { IDay } from '../../interfaces'
import { DateHeader } from './ScheduleDayDateHeader'
import { ScheduleDayEvents } from './ScheduleDayEvents'
import { ScheduleDayMeals } from './ScheduleDayMeals'
import { ScheduleDayMeetings } from './ScheduleDayMeetings'
import { ScheduleDayOvernight } from './ScheduleDayOvernight'

interface Props {
  day: IDay
  index: number
  suplementaryText: boolean
  arrivalDay: string
}

export const ScheduleDay = ({
  day,
  index,
  suplementaryText,
  arrivalDay
}: Props) => {
  const {
    morningEvents,
    morningMeetings,
    lunch,
    afternoonEvents,
    afternoonMeetings,
    dinner,
    fullDayMeetings,
    overnight
  } = day

  return (
    <div className='mb-6'>
      <div className='flex flex-col' id={`${day.date}_id`}>
        <DateHeader date={day.date} index={index} arrivalDay={arrivalDay} />
        <ScheduleDayEvents
          id={`${day.date}-morning-events`}
          title='Morning Events'
          events={morningEvents.events}
          introduction={morningEvents.intro}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayMeetings
          id={`${day.date}-morning-meetings`}
          title='Morning Meeting'
          meetings={morningMeetings.meetings}
          timing='Morning'
          suplementaryText={suplementaryText}
        />
        <ScheduleDayMeals
          id={`${day.date}-lunch`}
          title='Lunch'
          restaurants={lunch.restaurants}
          introduction={lunch.intro}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayEvents
          id={`${day.date}-afternoon-events`}
          title='Afternoon Events'
          events={afternoonEvents.events}
          introduction={afternoonEvents.intro}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayMeetings
          title='Afternoon Meeting'
          meetings={afternoonMeetings.meetings}
          timing='Afternoon'
          suplementaryText={suplementaryText}
          id={`${day.date}-afternoon-meetings`}
        />
        <ScheduleDayMeals
          id={`${day.date}-dinner`}
          title='Dinner'
          restaurants={dinner.restaurants}
          introduction={dinner.intro}
          suplementaryText={suplementaryText}
        />
        <ScheduleDayMeetings
          id={`${day.date}-fullday-meetings`}
          title='Full Day Meeting'
          meetings={fullDayMeetings.meetings}
          timing='Full Day'
          suplementaryText={suplementaryText}
        />
        <ScheduleDayOvernight
          id={`${day.date}-overnight`}
          introduction={overnight.intro}
          overnight={overnight.hotels}
        />
      </div>

      <hr className='mt-6' />
    </div>
  )
}
