import { RichParagraph } from '../atoms/RichParagraph'
import { Events } from './Events'

export const ScheduleDayEvents = ({
  title,
  events,
  suplementaryText,
  id,
  introduction
}) => {
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
