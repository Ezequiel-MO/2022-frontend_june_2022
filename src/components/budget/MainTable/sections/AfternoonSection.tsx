import { useState } from 'react'
import { AfternoonEventsRow } from '../rows'
import { EventTransferRow } from '../transfers'
import { MeetingSection } from '.'
import { IEvent, IMeeting, IRestaurant } from '../../../../interfaces'

interface AfternoonSectionProps {
  events: IEvent[]
  meetings: IMeeting[]
  fullDayMeetings: IMeeting[]
  date: string
  pax: number
}

export const AfternoonSection = ({
  events,
  meetings,
  fullDayMeetings,
  date,
  pax
}: AfternoonSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent>(events[0])
  return (
    <>
      <EventTransferRow
        transfer={selectedEvent?.transfer}
        date={date}
        id='transfer_afternoonEvents'
        selectedEvent={selectedEvent}
      />
      <AfternoonEventsRow
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
}
