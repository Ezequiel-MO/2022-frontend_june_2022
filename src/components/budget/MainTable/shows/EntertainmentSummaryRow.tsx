import { IEntertainment, IRestaurant } from '../../../../interfaces'
import { EntertainmentMultipleChoice } from './EntertainmentMultipleChoice'
import { EntertainmentSingleChoice } from './EntertainmentSingleChoice'
import { useState } from 'react'
import { EntertainmentBreakdownRows } from './EntertainmentBreakdownRows'
import { Icon } from '@iconify/react'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'

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
      <tr className='dark:bg-[#a9ba9d] dark:text-black-50'>
        <td
          onClick={toggleBreakdown}
          className='cursor-pointer flex justify-center py-4'
        >
          <Icon
            icon={isOpen ? 'typcn:minus' : 'typcn:plus'}
            width='30'
            height='30'
          />
        </td>
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
      {selectedEntertainment && (
        <EntertainmentBreakdownRows
          selectedEntertainment={selectedEntertainment}
        />
      )}
    </>
  )
}
