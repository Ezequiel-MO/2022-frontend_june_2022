import { IMeeting } from '../../interfaces'
import { Meetings } from './Meetings'

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
  if (!meetings.length) {
    return suplementaryText ? (
      <h3 className='italic m-2'>{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <div id={id} className='page-break-after'>
      <Meetings meetings={meetings} timing={timing} />
    </div>
  )
}
