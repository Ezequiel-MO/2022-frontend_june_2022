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
    <TableRow>
      <TableCell>{date}</TableCell>
      <TransferCells
        pax={pax}
        description={description}
        options={options}
        id={id}
        date={date}
      />
    </TableRow>
  )
}
