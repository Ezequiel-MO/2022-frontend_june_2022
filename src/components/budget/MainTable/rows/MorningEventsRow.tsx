import { TableCell, TableRow } from '@mui/material'
import { RenderChoiceCells } from '../multipleOrSingle'
import { IEvent } from '../../../../interfaces'

interface MorningEventsRowProps {
  items: IEvent[]
  date: string
  pax: number
}

export const MorningEventsRow = ({
  items,
  date,
  pax
}: MorningEventsRowProps) => {
  const NoEvents = items.length === 0
  if (NoEvents) return null

  const multipleChoice = items.length > 1

  const props = {
    pax,
    date,
    options: items,
    description: 'Morning Event',
    id: 'morningEvents'
  }

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <RenderChoiceCells multipleChoice={multipleChoice} props={props} />
    </TableRow>
  )
}
