import { TableCell, TableRow } from '@mui/material'
import { TransferCells } from './TransferCells'

export const TransferRow = ({ pax, date, options, description, id }) => {
  if (
    options[0]?.selectedService === '' ||
    options[0]?.selectedService === undefined
  ) {
    return null
  }

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TransferCells
        pax={pax}
        description={description}
        options={options}
        id={id}
        date={date}
      />
    </TableRow>
  )
}
