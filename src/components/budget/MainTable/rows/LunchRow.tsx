import { useEffect } from 'react'
import { MultipleChoiceCells, SingleChoiceCells } from '../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { UPDATE_PROGRAM_MEALS_COST } from '../../context/budgetReducer'
import { useContextBudget } from '../../context/BudgetContext'

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
  const { dispatch } = useContextBudget()
  const NoLunch = items.length === 0

  useEffect(() => {
    dispatch({
      type: UPDATE_PROGRAM_MEALS_COST,
      payload: {
        date,
        restaurant: selectedEvent ? selectedEvent : null,
        pax,
        type: 'lunch'
      }
    })
  }, [dispatch, NoLunch, date, selectedEvent])

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
