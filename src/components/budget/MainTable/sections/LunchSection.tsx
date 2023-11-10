import { useState } from 'react'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { LunchRow } from '../rows'
import { EventTransferRow } from '../transfers'

interface LunchSectionProps {
  lunch: IRestaurant[]
  date: string
  pax: number
}

export const LunchSection = ({ lunch, date, pax }: LunchSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<IRestaurant>(lunch[0])
  return (
    <>
      <EventTransferRow
        transfer={selectedEvent?.transfer || []}
        date={date}
        id='transfer_lunch'
        selectedEvent={selectedEvent}
      />
      <LunchRow
        items={lunch}
        date={date}
        pax={pax}
        selectedEvent={selectedEvent}
        setSelectedEvent={
          setSelectedEvent as React.Dispatch<
            React.SetStateAction<IEvent | IRestaurant>
          >
        }
      />
    </>
  )
}
