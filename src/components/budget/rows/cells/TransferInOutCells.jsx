import { TableCell } from '@mui/material'
import accounting from 'accounting'

const TransferInOutCells = ({ description, options, pax, id }) => {
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
