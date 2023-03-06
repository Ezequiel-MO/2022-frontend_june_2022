import { TableCell, TableRow } from '@mui/material'
import { RenderChoiceCells } from '../../cells'

export const DinnerRow = ({ items, date, pax }) => {
  const NoDinner = items.length === 0
  if (NoDinner) return null
  const multipleChoice = items.length > 1
  const props = {
    pax,
    date,
    options: items,
    description: 'Dinner Restaurants',
    id: 'dinner'
  }

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <RenderChoiceCells multipleChoice={multipleChoice} props={props} />
    </TableRow>
  )
}
