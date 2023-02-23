import { TableCell, TableRow } from '@mui/material'
import { MultipleChoiceCells } from '../../cells/MultipleChoiceCells'
import { SingleChoiceCells } from '../../cells/SingleChoiceCells'

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
      {multipleChoice === true ? (
        <MultipleChoiceCells {...props} />
      ) : (
        <SingleChoiceCells {...props} />
      )}
    </TableRow>
  )
}
