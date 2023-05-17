import { useEffect } from 'react'
import accounting from 'accounting'
import { TableCell, TableRow } from '@mui/material'
import { useBudget } from '../../../../hooks'

export const TransfersInRow = ({ items, date }) => {
  const { updateTransfers } = useBudget()

  const NoTransfersIn = items.length === 0
  if (NoTransfersIn) return null

  const transferInItem = items.find((item) => item.transfer_in)
  const transferInValue = transferInItem?.transfer_in ?? 0

  useEffect(() => {
    updateTransfers(
      date,
      'transfer_in',
      transferInItem?.nrVehicles ?? 1,
      transferInValue
    )
  }, [])

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>Arrival Transfer</TableCell>
      <TableCell>{`${transferInItem.vehicleCapacity} seater ${transferInItem.vehicleType}`}</TableCell>
      <TableCell>{transferInItem?.nrVehicles}</TableCell>{' '}
      <TableCell>
        {accounting.formatMoney(
          transferInValue / transferInItem?.nrVehicles,
          '€'
        )}
      </TableCell>
      <TableCell>{accounting.formatMoney(transferInValue, '€')}</TableCell>
    </TableRow>
  )
}
