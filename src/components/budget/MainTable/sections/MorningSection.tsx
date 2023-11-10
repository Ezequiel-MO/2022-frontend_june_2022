import { useState } from 'react'
import { EventTransferRow } from '../transfers'
import { MeetingSection } from './MeetingSection'
import { MorningEventsRow } from '../rows'
import { IEvent, IMeeting, IRestaurant } from '../../../../interfaces'

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
  const [selectedEvent, setSelectedEvent] = useState<IEvent>(events[0])

  return (
    <>
      <EventTransferRow
        transfer={selectedEvent?.transfer}
        date={date}
        id='transfer_morningEvents'
        selectedEvent={selectedEvent}
      />
      <MorningEventsRow
        items={events}
        date={date}
        pax={pax}
        selectedEvent={selectedEvent}
        setSelectedEvent={
          setSelectedEvent as React.Dispatch<
            React.SetStateAction<IEvent | IRestaurant>
          >
        }
      />
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
