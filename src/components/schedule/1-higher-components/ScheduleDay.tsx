import {
  IActivity,
  IDay,
  IItinerary,
  IMeal,
  IMeetingDetails,
  IOvernight
} from '../../../interfaces'
import { DateHeader } from './ScheduleDayDateHeader'
import { ScheduleDayEvents } from '../2-sections/ScheduleDayEvents'
import { ScheduleDayMeals } from '../2-sections/ScheduleDayMeals'
import { ScheduleDayMeetings } from '../2-sections/ScheduleDayMeetings'
import { ScheduleDayOvernight } from '../2-sections/ScheduleDayOvernight'
import * as styles from '../../../constants/styles/mainsection'
import { useScheduleFilter } from '../useScheduleFilter'
import { ScheduleDayItinerary } from '../2-sections/ScheduleDayItinerary'

interface Props {
  day: IDay
  index: number
  suplementaryText: boolean
  arrivalDay: string
}

export type RenderedItem = {
  id: string
  title: string
  events: IMeal | IActivity | IOvernight | IMeetingDetails | IItinerary
  timing?: 'Morning' | 'Afternoon' | 'Full Day'
}

export const ScheduleDay = ({
  day,
  index,
  suplementaryText,
  arrivalDay
}: Props) => {
  const renderItem = (item: RenderedItem) => {
    switch (item.title) {
      case 'Morning Events':
      case 'Afternoon Events':
        return (
          <ScheduleDayEvents
            key={item.id}
            id={item.id}
            title={item.title}
            events={(item.events as IActivity).events}
            introduction={(item.events as IActivity).intro}
            suplementaryText={suplementaryText}
          />
        )
      case 'Morning Meeting':
      case 'Afternoon Meeting':
      case 'Full Day Meeting':
        return (
          <ScheduleDayMeetings
            key={item.id}
            id={item.id}
            title={item.title}
            meetings={(item.events as IMeetingDetails).meetings}
            suplementaryText={suplementaryText}
            timing={item.timing || ''}
          />
        )
      case 'Lunch':
      case 'Dinner':
        return (
          <ScheduleDayMeals
            key={item.id}
            id={item.id}
            title={item.title}
            restaurants={(item.events as IMeal).restaurants}
            introduction={(item.events as IMeal).intro}
            suplementaryText={suplementaryText}
          />
        )
      case 'Overnight':
        return (
          <ScheduleDayOvernight
            key={item.id}
            id={item.id}
            overnight={(item.events as IOvernight).hotels}
            introduction={(item.events as IOvernight).intro}
          />
        )
      case 'Itinerary':
        return (
          <ScheduleDayItinerary
            key={item.id}
            id={item.id}
            introduction={day.itinerary.intro}
          />
        )
    }
  }

  const itemsToRender = useScheduleFilter(day)

  return (
    <div className='mb-8 last:mb-0'>
      <div className={styles.dayPage} id={`${day.date}_id`}>
        <DateHeader date={day.date} index={index} arrivalDay={arrivalDay} />
        {itemsToRender.map(renderItem)}
      </div>

      <hr className={styles.pageBottomBorder} />
    </div>
  )
}
