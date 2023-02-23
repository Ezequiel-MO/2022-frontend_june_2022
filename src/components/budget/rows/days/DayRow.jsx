import { TableCell, TableRow } from '@mui/material'
import { TransferCells, TransferInOutCells } from '../../'

export const DayRow = ({ pax, date, options, description, id }) => {
  const props = {
    pax,
    description,
    options,
    id,
    date
  }

  if (id === 'meetGreet' || id === 'assistance') {
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        <TransferInOutCells
          date={date}
          description={description}
          options={options}
          pax={pax}
          id={id}
        />
      </TableRow>
    )
  }

  if (
    id.startsWith('transfer') &&
    id !== 'transfer_in' &&
    id !== 'transfer_out'
  ) {
    if (
      options[0]?.selectedService === '' ||
      options[0]?.selectedService === undefined
    ) {
      return null
    }
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        <TransferCells {...props} />
      </TableRow>
    )
  }

  return <div></div>
}
