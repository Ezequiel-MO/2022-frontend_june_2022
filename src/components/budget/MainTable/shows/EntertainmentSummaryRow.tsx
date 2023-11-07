import { useState } from 'react'
import { IEntertainment, IRestaurant } from '../../../../interfaces'
import { EntertainmentMultipleChoice } from './EntertainmentMultipleChoice'
import { EntertainmentSingleChoice } from './EntertainmentSingleChoice'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'
import { ToggleTableRowIcon } from '../../../atoms'

interface Props {
  date: string
  entertainment: IEntertainment[]
  selectedRestaurant: IRestaurant
  title: string
  typeOfEvent: 'dinner' | 'lunch'
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EntertainmentSummaryRow: React.FC<Props> = ({
  date,
  entertainment,
  selectedRestaurant,
  title,
  typeOfEvent,
  isOpen,
  setIsOpen
}) => {
  if (!entertainment || entertainment.length === 0) return null
  const { shows } = useBudget()
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
            <EntertainmentSingleChoice
              options={entertainment}
              selectedRestaurant={selectedRestaurant}
              date={date}
              id='dinner'
            />
          )}
        </td>

        <td></td>
        <td></td>
        <td>
          {accounting.formatMoney(
            shows[date]?.[typeOfEvent]?.showCost || 0,
            '€'
          )}
        </td>
      </tr>
    </>
  )
}
