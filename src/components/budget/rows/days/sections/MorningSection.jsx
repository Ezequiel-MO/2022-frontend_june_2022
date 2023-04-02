import { MeetingBreakdownRows } from '../../meeting/MeetingBreakdownRows'
import { MeetingSummaryRow } from '../../meeting/MeetingSummaryRow'
import { DayRow } from '../DayRow'
import { MorningEventsRow } from '../events/MorningEventsRow'

export const MorningSection = ({ events, meetings, date, pax }) => (
  <>
    <MorningEventsRow items={events} date={date} pax={pax} />
    {events.length > 0 && (
      <>
        {events[0]?.transfer.length > 0 && (
          <>
            {events[0].transfer[0]?.withAssistance === true ? (
              <DayRow
                pax={events[0].transfer.length}
                date={date}
                options={events[0].transfer}
                description='Assistance on Bus'
                id='assistance'
              />
            ) : null}
            <DayRow
              pax={events[0]?.transfer.length}
              date={date}
              options={events[0]?.transfer}
              description='Transfer'
              id='transfer_morningEvents'
            />
          </>
        )}
      </>
    )}
    {meetings.length > 0 && (
      <>
        <MeetingSummaryRow
          pax={pax}
          dateProp={date}
          typeOfMeetingProp='Morning Meeting'
          meetings={meetings}
          id='morningMeetings'
        />
        <MeetingBreakdownRows
          pax={pax}
          dateProp={date}
          typeOfMeetingProp='Morning Meeting'
          meetings={meetings}
        />
      </>
    )}
  </>
)
