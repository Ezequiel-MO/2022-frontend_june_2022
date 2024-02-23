import { EventCard } from '..'
import { IEvent } from '../../../interfaces'
import TabbedContent from '../../molecules/tabs/TabbedContent'

interface Props {
  events: IEvent[] | []
}

export const Events = ({ events }: Props) => {
  return (
    <div className='flex flex-wrap'>
      <TabbedContent
        items={events}
        renderItem={(event) => <EventCard event={event} />}
        type='event'
      />
    </div>
  )
}
