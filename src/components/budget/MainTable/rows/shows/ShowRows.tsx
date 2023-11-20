import { useState } from 'react'
import { EntertainmentSummaryRow } from './EntertainmentSummaryRow'
import { IEntertainment } from '../../../../../interfaces'
import { EntertainmentBreakdownRows } from './EntertainmentBreakdownRows'

interface Props {
  date: string
  entertainment: IEntertainment[]
  typeOfEvent: 'lunch' | 'dinner'
}

export const ShowRows = ({ date, entertainment, typeOfEvent }: Props) => {
  if (!entertainment) return
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <EntertainmentSummaryRow
        date={date}
        entertainment={entertainment}
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
