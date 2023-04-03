import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useEffect } from 'react'
import { useBudget } from '../../../../hooks'

export const TransfersInAssistanceRow = ({ items, date }) => {
  const { updateTransfersIn } = useBudget()
  const assistanceObj = items.find((item) => item.assistance > 0)

  if (!assistanceObj) {
    return null
  }

  const { assistance, assistanceCost } = assistanceObj

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
