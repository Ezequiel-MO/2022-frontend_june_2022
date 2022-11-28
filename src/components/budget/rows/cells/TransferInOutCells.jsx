import { useEffect } from 'react'
import { TableCell } from '@mui/material'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks/useBudget'

const TransferInOutCells = ({ description, options, pax, id }) => {
  const { updateTransferInTotalCost, updateTransferOutTotalCost } = useBudget()

  useEffect(() => {
    if (id === 'transfer_in') {
      updateTransferInTotalCost(pax, options[0].transfer_in)
    }
    if (id === 'transfer_out') {
      updateTransferOutTotalCost(pax, options[0].transfer_out)
    }
  }, [id])

  const lineTotal =
    id === 'transfer_in'
      ? options[0].transfer_in
      : id === 'transfer_out'
      ? options[0].transfer_out
      : id === 'meet_greet'
      ? options[0].meetGreet
      : options[0].assistance
  return (
    <>
      <TableCell>{description}</TableCell>
      <TableCell>
        {id === 'transfer_in' || id === 'transfer_out'
          ? `${options[0].vehicleCapacity} seater Bus `
          : null}
      </TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>{accounting.formatMoney(lineTotal, '€')}</TableCell>
      <TableCell>{accounting.formatMoney(lineTotal * pax, '€')}</TableCell>
    </>
  )
}

export default TransferInOutCells
