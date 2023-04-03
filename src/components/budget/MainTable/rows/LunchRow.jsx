import { TableCell, TableRow } from '@mui/material'
import { RenderChoiceCells } from '../multipleOrSingle'

export const LunchRow = ({ items, date, pax }) => {
  const NoLunch = items.length === 0
  if (NoLunch) return null
  const multipleChoice = items.length > 1
  const props = {
    pax,
    date,
    options: items,
    description: 'Lunch Restaurants',
    id: 'lunch'
  }

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <RenderChoiceCells multipleChoice={multipleChoice} props={props} />
    </TableRow>
  )
}
