import { TableCell, TableRow } from '@mui/material'
import { IEntertainment, IRestaurant } from '../../../../interfaces'
import { EntertainmentMultipleChoice } from './EntertainmentMultipleChoice'
import { EntertainmentSingleChoice } from './EntertainmentSingleChoice'
import { useState } from 'react'
import { EntertainmentBreakdownRows } from './EntertainmentBreakdownRows'

interface Props {
  date: string
  entertainment: IEntertainment[]
  selectedRestaurant: IRestaurant
  title: string
  typeOfEvent: 'dinner' | 'lunch'
}

export const EntertainmentSummaryRow: React.FC<Props> = ({
  date,
  entertainment,
  selectedRestaurant,
  title,
  typeOfEvent
}) => {
  if (!entertainment || entertainment.length === 0) return null
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

  return (
    <>
      <TableRow className='dark:bg-[#a9ba9d]'>
        <TableCell>{date}</TableCell>
        <TableCell>{`${title}`}</TableCell>
        <TableCell>
          {multipleShows ? (
            <EntertainmentMultipleChoice
              date={date}
              options={entertainment}
              option={selectedEntertainment}
              handleChange={handleEntertainmentChange}
              typeOfEvent={typeOfEvent}
            />
          ) : (
            <EntertainmentSingleChoice />
          )}
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
      {selectedEntertainment && (
        <EntertainmentBreakdownRows
          selectedEntertainment={selectedEntertainment}
        />
      )}
    </>
  )
}
