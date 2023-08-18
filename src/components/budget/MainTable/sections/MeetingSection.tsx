import { IMeeting } from '../../../../interfaces'
import { MeetingSummaryRow, MeetingBreakdownRows } from '../meeting'

interface MeetingSectionProps {
  meetings: IMeeting[]
  date: string
  pax: number
  typeOfMeetingProp:
    | 'Morning Meeting'
    | 'Afternoon Meeting'
    | 'Full Day Meeting'
  id: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'
}

export const MeetingSection = ({
  meetings,
  date,
  pax,
  typeOfMeetingProp,
  id
}: MeetingSectionProps) =>
  meetings?.length > 0 && (
    <>
      <MeetingSummaryRow
        pax={pax}
        dateProp={date}
        typeOfMeetingProp={typeOfMeetingProp}
        meetings={meetings}
        id={id}
      />
      <MeetingBreakdownRows
        pax={pax}
        dateProp={date}
        typeOfMeetingProp={typeOfMeetingProp}
        meetings={meetings}
      />
    </>
  )
