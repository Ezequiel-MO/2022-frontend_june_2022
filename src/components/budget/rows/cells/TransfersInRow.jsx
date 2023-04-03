import { useEffect } from 'react'
import accounting from 'accounting'
import { TableCell, TableRow } from '@mui/material'
import { useBudget } from '../../../../hooks'

export const TransfersInRow = ({ items, date }) => {
  //this component needs to expand to accommodate multiple transfers
  const { updateTransfers } = useBudget()

  const NoTransfersIn = items.length === 0
  if (NoTransfersIn) return null

  useEffect(() => {
    updateTransfers(
      date,
      'transfer_in',
      items[0]?.nrVehicles ?? 1,
      items[0]['transfer_in']
    )
  }, [])
  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>Arrival Transfer</TableCell>
      <TableCell>{`${items[0].vehicleCapacity} seater ${items[0].vehicleType}`}</TableCell>
      <TableCell>{items[0]?.nrVehicles}</TableCell>{' '}
      <TableCell>
        {accounting.formatMoney(items[0].transfer_in ?? 0, '€')}
      </TableCell>
      <TableCell>
        {accounting.formatMoney(
          items[0]?.transfer_in * items[0]?.nrVehicles,
          '€'
        )}
      </TableCell>
    </TableRow>
  )
}
