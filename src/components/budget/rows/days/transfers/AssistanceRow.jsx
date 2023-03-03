import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useEffect } from 'react'
import { useBudget } from '../../../../../hooks'

export const AssistanceRow = ({ items, date }) => {
  const { updateTransfersIn } = useBudget()
  const assistanceObj = items.find((item) => item.assistance > 0)

  if (!assistanceObj) {
    return null
  }

  const { assistance, assistanceCost } = assistanceObj

  useEffect(() => {
    updateTransfersIn({ assistance, assistanceCost })
  }, [])

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell></TableCell>
      <TableCell>Assistance on Board Buses</TableCell>
      <TableCell>{assistance}</TableCell>
      <TableCell>{accounting.formatMoney(assistanceCost, '€')}</TableCell>
      <TableCell>
        {accounting.formatMoney(assistance * assistanceCost, '€')}
      </TableCell>
    </TableRow>
  )
}
