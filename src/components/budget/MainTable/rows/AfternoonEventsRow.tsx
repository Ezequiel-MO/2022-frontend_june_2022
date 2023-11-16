import { useEffect } from 'react'
import { MultipleChoiceCells, SingleChoiceCells } from '../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { useContextBudget } from '../../context/BudgetContext'
import { UPDATE_PROGRAM_ACTIVITIES_COST } from '../../context/budgetReducer'

interface Props {
  items: IEvent[]
  date: string
  pax: number
  selectedEvent: IEvent
  setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const AfternoonEventsRow = ({
  items,
  date,
  pax,
  selectedEvent,
  setSelectedEvent
}: Props) => {
  const { dispatch } = useContextBudget()
  const NoEvents = items.length === 0

  useEffect(() => {
    dispatch({
      type: UPDATE_PROGRAM_ACTIVITIES_COST,
      payload: {
        date,
        activity: selectedEvent ? selectedEvent : null,
        pax,
        type: 'afternoon'
      }
    })
  }, [dispatch, date, selectedEvent])
  if (NoEvents) return null
  const multipleChoice = items.length > 1
  const props = {
    pax,
    date,
    options: items,
    description: 'Afternoon Event',
    id: 'afternoonEvents' as 'afternoonEvents'
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
