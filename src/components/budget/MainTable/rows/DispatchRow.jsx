import { useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'

export const DispatchRow = ({ items, date }) => {
  const { updateTransfersOut } = useBudget()
  const meetGreetObj = items.find((item) => item.meetGreet > 0)

  if (!meetGreetObj) {
    return null
  }

  const { meetGreet, meetGreetCost } = meetGreetObj

  useEffect(() => {
    updateTransfersOut('meetGreet', meetGreet, meetGreetCost)
  }, [])

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell></TableCell>
      <TableCell>Bus Dispatcher</TableCell>
      <TableCell>{meetGreet}</TableCell>
      <TableCell>{accounting.formatMoney(meetGreetCost, '€')}</TableCell>
      <TableCell>
        {accounting.formatMoney(meetGreet * meetGreetCost, '€')}
      </TableCell>
    </TableRow>
  )
}
