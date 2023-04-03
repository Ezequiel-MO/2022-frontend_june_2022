import { TableCell, TableRow } from '@mui/material'
import { TransferInOutCells } from './'

export const MeetGreetAssistanceRow = ({
  pax,
  date,
  description,
  options,
  id
}) => (
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
