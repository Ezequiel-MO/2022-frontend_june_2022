import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { TransferCells as RawTransferCells } from './TransferCells'
import { ITransfer } from '../../../../interfaces/transfer'

const TransferCells = React.memo(RawTransferCells)

interface Props {
  pax: number
  date: string
  options: ITransfer[]
  description: string
  id:
    | 'transfer_morningEvents'
    | 'transfer_afternoonEvents'
    | 'transfer_lunch'
    | 'transfer_dinner'
}

export const TransferRow = ({ pax, date, options, description, id }: Props) => {
  if (
    options[0]?.selectedService === '' ||
    options[0]?.selectedService === undefined
  ) {
    return null
  }

  return (
    <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <td>{date}</td>
      <TransferCells
        pax={pax}
        description={description}
        options={options}
        id={id}
        date={date}
      />
    </tr>
  )
}
