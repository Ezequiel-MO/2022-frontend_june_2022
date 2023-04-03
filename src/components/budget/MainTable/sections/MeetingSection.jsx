import { MeetingSummaryRow, MeetingBreakdownRows } from '../meeting'

export const MeetingSection = ({
  meetings,
  date,
  pax,
  typeOfMeetingProp,
  id
}) =>
  meetings.length > 0 && (
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
