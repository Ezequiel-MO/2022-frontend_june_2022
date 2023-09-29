import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { IEntertainment } from '../../../../interfaces'

interface Props {
  entertainment: IEntertainment[]
}

export const EntertainmentSummaryRow: React.FC<Props> = ({ entertainment }) => {
  if (!entertainment || entertainment.length === 0) return null

  return (
    <TableRow>
      <TableCell>{`${entertainment[0].name} goes here`}</TableCell>
    </TableRow>
  )
}
