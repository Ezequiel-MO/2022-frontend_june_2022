import { useEffect } from 'react'
import { MultipleChoiceCells, SingleChoiceCells } from '../../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../../interfaces'
import { useContextBudget } from '../../../context/BudgetContext'
import { UPDATE_PROGRAM_MEALS_COST } from '../../../context/budgetReducer'
import {
  tableCellClasses,
  tableRowClasses
} from '../../../../../constants/styles'

interface DinnerRowProps {
  items: IRestaurant[]
  date: string
  pax: number
  selectedEvent: IRestaurant
  setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const DinnerRow = ({
  items,
  date,
  pax,
  selectedEvent,
  setSelectedEvent
}: DinnerRowProps) => {
  const { dispatch } = useContextBudget()
  const NoDinner = items.length === 0

  useEffect(() => {
    dispatch({
      type: UPDATE_PROGRAM_MEALS_COST,
      payload: {
        date,
        restaurant: selectedEvent ? selectedEvent : null,
        pax,
        type: 'dinner'
      }
    })
  }, [dispatch, NoDinner, date, selectedEvent])

  if (NoDinner) return null
  const multipleChoice = items.length > 1
  const props = {
    pax,
    date,
    options: items,
    description: 'Dinner Restaurants',
    id: 'dinner' as 'dinner'
  }

  return (
    <tr className={tableRowClasses}>
      <td className={tableCellClasses}>{date}</td>
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
