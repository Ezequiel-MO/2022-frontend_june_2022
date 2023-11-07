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

  if (assistance === 0) {
    return null
  }

  useEffect(() => {
    updateTransfersIn('assistance', assistance, assistanceCost)
  }, [])

  return (
    <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <td>{date}</td>
      <td></td>
      <td>On-board Assistance @ Buses</td>
      <td>{assistance}</td>
      <td>{accounting.formatMoney(assistanceCost, '€')}</td>
      <td>{accounting.formatMoney(assistance * assistanceCost, '€')}</td>
    </tr>
  )
}
