import { useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'
import { ITransfer } from '../../../../interfaces'

interface MeetGreetRowProps {
  firstItem: ITransfer
  date: string
}

export const MeetGreetRow = ({ firstItem, date }: MeetGreetRowProps) => {
  const { updateTransfersIn } = useBudget()

  if (!firstItem) {
    return null
  }

  const { meetGreet = 0, meetGreetCost = 0 } = firstItem

  useEffect(() => {
    updateTransfersIn('meetGreet', meetGreet, meetGreetCost)
  }, [])

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell></TableCell>
      <TableCell>Meet & Greet @ Airport</TableCell>
      <TableCell>{meetGreet}</TableCell>
      <TableCell>{accounting.formatMoney(meetGreetCost, '€')}</TableCell>
      <TableCell>
        {accounting.formatMoney(meetGreet * meetGreetCost, '€')}
      </TableCell>
    </TableRow>
  )
}
