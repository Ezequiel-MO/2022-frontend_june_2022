import { TableCell, TableRow } from '@mui/material'
import { RenderChoiceCells } from '../../cells'

export const AfternoonEventsRow = ({ items, date, pax }) => {
  const NoEvents = items.length === 0
  if (NoEvents) return null
  const multipleChoice = items.length > 1
  const props = {
    pax,
    date,
    options: items,
    description: 'Afternoon Event',
    id: 'afternoonEvents'
  }

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <RenderChoiceCells multipleChoice={multipleChoice} props={props} />
    </TableRow>
  )
}
