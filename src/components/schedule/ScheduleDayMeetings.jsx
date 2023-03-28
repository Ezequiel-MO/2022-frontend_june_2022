import { Meetings } from './Meetings'

export const ScheduleDayMeetings = ({
  title,
  meetings,
  timing,
  suplementaryText,
  id
}) => {
  if (!meetings.length) {
    return suplementaryText ? (
      <h3 className='italic m-2'>{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <div id={id}>
      <Meetings meetings={meetings} timing={timing} />
    </div>
  )
}
