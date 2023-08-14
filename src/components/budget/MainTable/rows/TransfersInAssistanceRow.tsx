import { useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'
import { ITransfer } from '../../../../interfaces'

interface TransfersInAssistanceRowProps {
  firstItem: ITransfer
  date: string
}

export const TransfersInAssistanceRow = ({
  firstItem,
  date
}: TransfersInAssistanceRowProps) => {
  const { updateTransfersIn } = useBudget()

  if (!firstItem) {
    return null
  }

  const { assistance = 0, assistanceCost = 0 } = firstItem

  useEffect(() => {
    updateTransfersIn('assistance', assistance, assistanceCost)
  }, [])

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell></TableCell>
      <TableCell>On-board Assistance @ Buses</TableCell>
      <TableCell>{assistance}</TableCell>
      <TableCell>{accounting.formatMoney(assistanceCost, '€')}</TableCell>
      <TableCell>
        {accounting.formatMoney(assistance * assistanceCost, '€')}
      </TableCell>
    </TableRow>
  )
}
