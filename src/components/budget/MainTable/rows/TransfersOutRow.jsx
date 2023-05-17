import { useEffect } from 'react'
import accounting from 'accounting'
import { TableCell, TableRow } from '@mui/material'
import { useBudget } from '../../../../hooks'
export const TransfersOutRow = ({ items, date }) => {
  const { updateTransfersOut } = useBudget()
  const NoTransfersOut = items.length === 0
  if (NoTransfersOut) return null
  const transferOutItem = items.find((item) => item.transfer_out)
  const transferOutValue = transferOutItem?.transfer_out ?? 0

  console.log('transferOutItem', transferOutItem)

  useEffect(() => {
    updateTransfersOut(
      'transfer_out',
      transferOutItem?.nrVehicles ?? 1,
      transferOutValue
    )
  }, [])

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>Departure Transfer</TableCell>
      <TableCell>{`${transferOutItem.vehicleCapacity} seater ${transferOutItem.vehicleType}`}</TableCell>
      <TableCell>{transferOutItem?.nrVehicles}</TableCell>{' '}
      <TableCell>
        {accounting.formatMoney(
          transferOutItem.transfer_out / transferOutItem?.nrVehicles ?? 0,
          '€'
        )}
      </TableCell>
      <TableCell>{accounting.formatMoney(transferOutValue, '€')}</TableCell>
    </TableRow>
  )
}
