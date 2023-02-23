import { TableCell, TableRow } from '@mui/material'
import { MultipleChoiceCells } from '../../cells/MultipleChoiceCells'
import { SingleChoiceCells } from '../../cells/SingleChoiceCells'

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
      {multipleChoice === true ? (
        <MultipleChoiceCells {...props} />
      ) : (
        <SingleChoiceCells {...props} />
      )}
    </TableRow>
  )
}
