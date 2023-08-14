import { useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'
import { ITransfer } from '../../../../interfaces'

interface DispatchRowProps {
  firstItem: ITransfer
  date: string
}

export const DispatchRow = ({ firstItem, date }: DispatchRowProps) => {
  const { updateTransfersOut } = useBudget()

  if (!firstItem) {
    return null
  }

  const { meetGreet = 0, meetGreetCost = 0 } = firstItem

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
