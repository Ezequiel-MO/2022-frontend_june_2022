import { AssistanceEventTransferRow, EventTransferRow } from '../transfers'
import { MeetingSection } from './MeetingSection'
import { MorningEventsRow } from '../rows'
import { IEvent, IMeeting } from '../../../../interfaces'

interface MorningSectionProps {
  events: IEvent[]
  meetings: IMeeting[]
  date: string
  pax: number
}

export const MorningSection = ({
  events,
  meetings,
  date,
  pax
}: MorningSectionProps) => {
  const transferIsNeeded = events.length > 0 && events[0]?.transfer.length > 0
  return (
    <>
      {transferIsNeeded && (
        <>
          <AssistanceEventTransferRow
            transfer={events[0].transfer}
            date={date}
          />
          <EventTransferRow
            transfer={events[0]?.transfer}
            date={date}
            description='Transfer'
            id='transfer_morningEvents'
          />
        </>
      )}
      <MorningEventsRow items={events} date={date} pax={pax} />
      <MeetingSection
        meetings={meetings}
        date={date}
        pax={pax}
        typeOfMeetingProp='Morning Meeting'
        id='morningMeetings'
      />
    </>
  )
}
