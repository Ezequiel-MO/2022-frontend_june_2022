import { MultipleChoiceCells, SingleChoiceCells } from '../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../interfaces'

interface MorningEventsRowProps {
  items: IEvent[]
  date: string
  pax: number
  selectedEvent: IEvent
  setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const MorningEventsRow = ({
  items,
  date,
  pax,
  selectedEvent,
  setSelectedEvent
}: MorningEventsRowProps) => {
  const NoEvents = items.length === 0
  if (NoEvents) return null

  const multipleChoice = items.length > 1

  const props = {
    pax,
    date,
    options: items,
    description: 'Morning Event',
    id: 'morningEvents' as
      | 'morningEvents'
      | 'afternoonEvents'
      | 'lunch'
      | 'dinner'
  }

  return (
    <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <td>{date}</td>
      {multipleChoice ? (
        <MultipleChoiceCells
          {...props}
          selectedEvent={selectedEvent}
          setSelectedEvent={
            setSelectedEvent as React.Dispatch<
              React.SetStateAction<IEvent | IRestaurant>
            >
          }
        />
      ) : (
        <SingleChoiceCells {...props} />
      )}
    </tr>
  )
}
