import { Icon } from '@iconify/react'
import { IMeeting } from '../../../interfaces'
import { MeetingCard } from '../4-cards/MeetingCard'
import {
  h1Title,
  supplemmentaryText as supplementaryTextStyle
} from '../../../constants/styles/mainsection'

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
      <h3
        className={supplementaryTextStyle}
      >{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <div id={id} className='page-break-after'>
      <div className='flex items-center'>
        <Icon
          icon='healthicons:group-discussion-meetingx3-outline'
          className='text-2xl mr-2'
        />
        <h1 className={h1Title}>{title}</h1>
      </div>
      {meetings?.map((meeting) => (
        <MeetingCard key={meeting._id} meeting={meeting} timing={timing} />
      ))}
    </div>
  )
}
