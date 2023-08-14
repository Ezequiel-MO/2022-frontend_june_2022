import { useEffect, useMemo } from 'react'
import accounting from 'accounting'
import { TableCell, TableRow } from '@mui/material'
import { ITransfer } from '../../../../interfaces'
import { useBudget } from '../../../../hooks'

interface TransfersInRowProps {
  items: ITransfer[]
  date: string
}

export const TransfersInRow = ({ items, date }: TransfersInRowProps) => {
  const { updateTransfers } = useBudget()
  const NoTransfersIn = items.length === 0
  if (NoTransfersIn) return null

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: ITransfer[] } = {}

    items.forEach((item) => {
      const { _id } = item
      if (!groups[_id]) groups[_id] = []
      groups[_id].push(item)
    })
    return groups
  }, [items])

  useEffect(() => {
    Object.keys(groupedItems).forEach((key) => {
      updateTransfers(
        date,
        key,
        groupedItems[key].length,
        groupedItems[key][0].transfer_in
      )
    })
  }, [groupedItems])

  return (
    <>
      {Object.entries(groupedItems).map(([key, group]) => (
        <TableRow key={key}>
          <TableCell>{date}</TableCell>
          <TableCell>Transfer from Airport</TableCell>
          <TableCell>
            {`${group[0].vehicleCapacity} Seater ${group[0].vehicleType}`}
          </TableCell>
          <TableCell>{group.length}</TableCell>
          <TableCell>
            {accounting.formatMoney(group[0].transfer_in, '€')}
          </TableCell>
          <TableCell>
            {accounting.formatMoney(group[0].transfer_in * group.length, '€')}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
