import { Icon } from '@iconify/react'
import { IMeeting } from '../../../interfaces'
import { MeetingCard } from '../4-cards/MeetingCard'
import {
  h1Title,
  supplemmentaryText as supplementaryTextStyle
} from '../../../constants/styles/mainsection'
import { ScheduleItemLayout } from './ScheduleItemLayout'

interface Props {
  id: string
  title: string
  meetings: IMeeting[]
  timing: string
  suplementaryText?: boolean
}

export const ScheduleDayMeetings = ({ id, title, meetings, timing }: Props) => {
  if (meetings?.length === 0) return null
  return (
    <ScheduleItemLayout
      id={id}
      icon='healthicons:group-discussion-meetingx3-outline'
      title={`${title} options`}
    >
      {meetings?.map((meeting) => (
        <MeetingCard key={meeting._id} meeting={meeting} timing={timing} />
      ))}
    </ScheduleItemLayout>
  )
}
