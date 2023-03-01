import { useEffect } from 'react'
import accounting from 'accounting'
import { TableCell, TableRow } from '@mui/material'
import { useBudget } from '../../../../../hooks'

export const TransfersOutRow = ({ items, date }) => {
  //this component needs to expand to accommodate multiple transfers
  const { updateTransfers } = useBudget()
  const NoTransfersOut = items.length === 0
  if (NoTransfersOut) return null

  useEffect(() => {
    updateTransfers(
      date,
      'transfer_out',
      items[0]?.nrVehicles ?? 1,
      items[0]['transfer_out']
    )
  }, [])

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>Departure Transfer</TableCell>
      <TableCell>{`${items[0].vehicleCapacity} seater ${items[0].vehicleType}`}</TableCell>
      <TableCell>{items[0]?.nrVehicles}</TableCell>{' '}
      <TableCell>
        {accounting.formatMoney(items[0].transfer_out ?? 0, '€')}
      </TableCell>
      <TableCell>
        {accounting.formatMoney(
          items[0]?.transfer_out * items[0]?.nrVehicles,
          '€'
        )}
      </TableCell>
    </TableRow>
  )
}
