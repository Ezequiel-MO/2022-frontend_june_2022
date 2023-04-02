import { MeetingBreakdownRows } from '../../meeting/MeetingBreakdownRows'
import { MeetingSummaryRow } from '../../meeting/MeetingSummaryRow'
import { DayRow } from '../DayRow'
import { AfternoonEventsRow } from '../events/AfternoonEventsRow'

export const AfternoonSection = ({
  events,
  meetings,
  fullDayMeetings,
  date,
  pax
}) => (
  <>
    <AfternoonEventsRow items={events} date={date} pax={pax} />
    {events.length > 0 && (
      <>
        {events[0]?.transfer[0]?.withAssistance === true ? (
          <DayRow
            pax={events[0].transfer.length}
            date={date}
            options={events[0].transfer}
            description='Assistance on Bus'
            id='assistance'
          />
        ) : null}
        <DayRow
          pax={events[0].transfer.length}
          date={date}
          options={events[0].transfer}
          description='Transfer'
          id='transfer_afternoonEvents'
        />
      </>
    )}
    {meetings.length > 0 && (
      <>
        <MeetingSummaryRow
          pax={pax}
          dateProp={date}
          typeOfMeetingProp='Afternoon Meeting'
          meetings={meetings}
          id='afternoonMeetings'
        />
        <MeetingBreakdownRows
          pax={pax}
          dateProp={date}
          typeOfMeetingProp='Afternoon Meeting'
          meetings={meetings}
        />
      </>
    )}
    {fullDayMeetings.length > 0 && (
      <>
        <MeetingSummaryRow
          pax={pax}
          dateProp={date}
          typeOfMeetingProp='Full Day Meeting'
          meetings={fullDayMeetings}
          id='fullDayMeetings'
        />
        <MeetingBreakdownRows
          pax={pax}
          dateProp={date}
          typeOfMeetingProp='Full Day Meeting'
          meetings={fullDayMeetings}
        />
      </>
    )}
  </>
)
