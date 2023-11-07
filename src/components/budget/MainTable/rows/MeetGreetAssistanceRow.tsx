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
  <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
    <td>{date}</td>
    <TransferInOutCells
      date={date}
      description={description}
      options={options}
      pax={pax}
      id={id}
    />
  </tr>
)
