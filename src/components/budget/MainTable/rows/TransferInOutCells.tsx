import { useEffect } from 'react'
import { TableCell } from '@mui/material'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'

const transferIds = ['transfer_in', 'transfer_out', 'assistance', 'meetGreet']

interface Props {
  date: string
  description: string
  options: any
  pax: number
  id: 'meetGreet' | 'assistance' | 'transfer_in' | 'transfer_out'
}

export const TransferInOutCells = ({
  date,
  description,
  options,
  pax,
  id
}: Props) => {
  const { updateTransfers } = useBudget()

  useEffect(() => {
    if (transferIds.includes(id)) {
      updateTransfers(date, id, pax, options[0][id])
    }
  }, [id])

  return (
    <>
      <TableCell>{description}</TableCell>
      <TableCell>{id === 'assistance' && 'On Board Assistance'}</TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>{accounting.formatMoney(options[0][id], '€')}</TableCell>
      <TableCell>{accounting.formatMoney(options[0][id] * pax, '€')}</TableCell>
    </>
  )
}
