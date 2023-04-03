import { AfternoonEventsRow } from '../../cells/AfternoonEventsRow'
import { AssistanceEventTransferRow, EventTransferRow } from '../transfers'
import { MeetingSection } from './MeetingSection'

export const AfternoonSection = ({
  events,
  meetings,
  fullDayMeetings,
  date,
  pax
}) => (
  <>
    {events.length > 0 && events[0]?.transfer.length > 0 && (
      <>
        <AssistanceEventTransferRow transfer={events[0].transfer} date={date} />
        <EventTransferRow
          transfer={events[0]?.transfer}
          date={date}
          description='Transfer'
          id='transfer_afternoonEvents'
        />
      </>
    )}
    <AfternoonEventsRow items={events} date={date} pax={pax} />
    <MeetingSection
      meetings={meetings}
      date={date}
      pax={pax}
      typeOfMeetingProp='Afternoon Meeting'
      id='afternoonMeetings'
    />
    <MeetingSection
      meetings={fullDayMeetings}
      date={date}
      pax={pax}
      typeOfMeetingProp='Full Day Meeting'
      id='fullDayMeetings'
    />
  </>
)
