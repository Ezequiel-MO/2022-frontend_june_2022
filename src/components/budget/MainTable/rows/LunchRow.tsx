import { MultipleChoiceCells, SingleChoiceCells } from '../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../interfaces'

interface LunchRowProps {
  items: IRestaurant[]
  date: string
  pax: number
  selectedEvent: IRestaurant
  setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const LunchRow = ({
  items,
  date,
  pax,
  selectedEvent,
  setSelectedEvent
}: LunchRowProps) => {
  const NoLunch = items.length === 0
  if (NoLunch) return null
  const multipleChoice = items.length > 1
  const props = {
    pax,
    date,
    options: items,
    description: 'Lunch Restaurants',
    id: 'lunch' as 'lunch'
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
