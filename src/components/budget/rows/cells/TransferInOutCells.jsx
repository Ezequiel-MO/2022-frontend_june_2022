import { useEffect } from 'react'
import { TableCell } from '@mui/material'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'

const transferIds = ['transfer_in', 'transfer_out', 'assistance', 'meetGreet']

export const TransferInOutCells = ({ date, options, description, id }) => {
  const { updateTransfers } = useBudget()

  useEffect(() => {
    if (transferIds.includes(id)) {
      updateTransfers(date, id, pax, options[0][id])
    }
  }, [id])

  return (
    <>
      <TableCell>{description}</TableCell>
      <TableCell>
        {id === 'transfer_in' || id === 'transfer_out'
          ? `${options[0].vehicleCapacity} seater Bus `
          : null}
      </TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>{accounting.formatMoney(options[0][id], '€')}</TableCell>
      <TableCell>{accounting.formatMoney(options[0][id] * pax, '€')}</TableCell>
    </>
  )
}
