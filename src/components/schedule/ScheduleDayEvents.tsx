import { IEvent } from '../../interfaces'
import { RichParagraph } from '../atoms/RichParagraph'
import { Events } from './Events'

interface Props {
  id: string
  title: string
  events: IEvent[]
  suplementaryText: boolean
  introduction: string
}

export const ScheduleDayEvents = ({
  id,
  title,
  events,
  suplementaryText,
  introduction
}: Props) => {
  if (!events.length) {
    return suplementaryText ? (
      <h3 className='italic m-2'>{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <div id={id} className='page-break-after'>
      <RichParagraph text={introduction} />
      <Events events={events} />
    </div>
  )
}
