import ParagraphText from '../Text'
import { Events } from './Events'

export const ScheduleDayEvents = ({ title, events, suplementaryText }) => {
  if (!events.length) {
    return suplementaryText ? (
      <h3 className='italic m-2'>{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <>
      <ParagraphText text={events[0].introduction} />
      <Events events={events} />
    </>
  )
}
