import { useState, useEffect } from 'react'
import accounting from 'accounting'
import { IEntertainment } from '../../../../../interfaces'
import { EntertainmentMultipleChoice } from './EntertainmentMultipleChoice'
import { ToggleTableRowIcon } from '../../../../atoms'
import { useContextBudget } from '../../../context/BudgetContext'
import { UPDATE_PROGRAM_SHOWS_COST } from '../../../context/budgetReducer'

interface Props {
  date: string
  entertainment: IEntertainment[]
  typeOfEvent: 'dinner' | 'lunch'
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EntertainmentSummaryRow: React.FC<Props> = ({
  date,
  entertainment,
  typeOfEvent,
  isOpen,
  setIsOpen
}) => {
  const { state, dispatch } = useContextBudget()

  const [selectedEntertainment, setSelectedEntertainment] =
    useState<IEntertainment>(entertainment[0])

  const handleEntertainmentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedEntertainment = entertainment.find(
      (entertainment) => entertainment.name === e.target.value
    ) as IEntertainment

    setSelectedEntertainment(selectedEntertainment)
  }

  useEffect(() => {
    dispatch({
      type: UPDATE_PROGRAM_SHOWS_COST,
      payload: {
        date,
        show: selectedEntertainment,
        type: typeOfEvent
      }
    })
  }, [selectedEntertainment, dispatch])

  const multipleShows = entertainment.length > 1

  const toggleBreakdown = () => {
    setIsOpen((prevState: boolean) => !prevState)
  }

  return (
    <>
      <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
        <ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
        <td>Entertainment</td>
        <td>
          {multipleShows ? (
            <EntertainmentMultipleChoice
              date={date}
              options={entertainment}
              option={selectedEntertainment}
              handleChange={handleEntertainmentChange}
              typeOfEvent={typeOfEvent}
            />
          ) : (
            <>{entertainment[0].name}</>
          )}
        </td>

        <td></td>
        <td></td>
        <td>{accounting.formatMoney(state.showsCost || 0, '€')}</td>
      </tr>
    </>
  )
}
