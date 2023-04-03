import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useEffect } from 'react'
import { useBudget } from '../../../../hooks'

export const MeetGreetRow = ({ items, date }) => {
  const { updateTransfersIn } = useBudget()
  const meetGreetObj = items.find((item) => item.meetGreet > 0)

  if (!meetGreetObj) {
    return null
  }

  const { meetGreet, meetGreetCost } = meetGreetObj

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
