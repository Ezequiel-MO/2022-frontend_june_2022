import { IMeeting } from '../../interfaces'
import { MeetingCards } from './MeetingCards'

interface Props {
  id: string
  title: string
  meetings: IMeeting[]
  timing: string
  suplementaryText: boolean
}

export const ScheduleDayMeetings = ({
  id,
  title,
  meetings,
  timing,
  suplementaryText
}: Props) => {
  if (meetings?.length === 0) {
    return suplementaryText ? (
      <h3 className='italic m-2'>{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <div id={id} className='page-break-after'>
      {meetings?.map((meeting) => (
        <MeetingCards key={meeting._id} meeting={meeting} timing={timing} />
      ))}
    </div>
  )
}
