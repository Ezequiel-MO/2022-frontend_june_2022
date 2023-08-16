import { TableCell, TableRow } from '@mui/material'
import { TransferInOutCells } from '.'
import { ITransfer } from '../../../../interfaces'

interface Props {
  pax: number
  date: string
  description: string
  options: ITransfer[]
  id: 'meetGreet' | 'assistance'
}

export const MeetGreetAssistanceRow = ({
  pax,
  date,
  description,
  options,
  id
}: Props) => (
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
