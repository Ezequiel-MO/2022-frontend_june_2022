import { TableCell } from '@mui/material'
import accounting from 'accounting'

const TransferInOutCells = ({ description, options, pax, id }) => {
  const lineTotal =
    id === 'transfer_in' ? options[0].transfer_in : options[0].transfer_out
  return (
    <>
      <TableCell>{description}</TableCell>
      <TableCell>{`${options[0].vehicleCapacity} seater Bus `}</TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>{accounting.formatMoney(lineTotal, '€')}</TableCell>
      <TableCell>{accounting.formatMoney(lineTotal * pax, '€')}</TableCell>
    </>
  )
}

export default TransferInOutCells
