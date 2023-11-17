import { useState } from 'react'
import { EntertainmentSummaryRow } from './EntertainmentSummaryRow'
import { IEntertainment, IRestaurant } from '../../../../../interfaces'
import { EntertainmentBreakdownRows } from './EntertainmentBreakdownRows'

interface Props {
  date: string
  entertainment: IEntertainment[]
  selectedRestaurant: IRestaurant
  title: string
  typeOfEvent: 'lunch' | 'dinner'
}

export const ShowRows = ({
  date,
  entertainment,
  selectedRestaurant,
  title,
  typeOfEvent
}: Props) => {
  if (!entertainment) return
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <EntertainmentSummaryRow
        date={date}
        entertainment={entertainment}
        selectedRestaurant={selectedRestaurant}
        title={title}
        typeOfEvent={typeOfEvent}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <EntertainmentBreakdownRows
        entertainment={entertainment}
        isOpen={isOpen}
      />
    </>
  )
}
