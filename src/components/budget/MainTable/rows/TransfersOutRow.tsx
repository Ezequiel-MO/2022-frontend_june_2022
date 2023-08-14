import { useEffect, useMemo } from 'react'
import accounting from 'accounting'
import { TableCell, TableRow } from '@mui/material'
import { useBudget } from '../../../../hooks'
import { ITransfer } from '../../../../interfaces'

interface TransfersOutRowProps {
  items: ITransfer[]
  date: string
}

export const TransfersOutRow = ({ items, date }: TransfersOutRowProps) => {
  const { updateTransfers } = useBudget()
  const NoTransfersOut = items.length === 0
  if (NoTransfersOut) return null

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
        groupedItems[key][0].transfer_out
      )
    })
  }, [groupedItems])

  return (
    <>
      {Object.entries(groupedItems).map(([key, group]) => (
        <TableRow key={key}>
          <TableCell>{date}</TableCell>
          <TableCell>Transfer To Airport</TableCell>
          <TableCell>
            {`${group[0].vehicleCapacity} Seater ${group[0].vehicleType}`}
          </TableCell>
          <TableCell>{group.length}</TableCell>
          <TableCell>
            {accounting.formatMoney(group[0].transfer_out, '€')}
          </TableCell>
          <TableCell>
            {accounting.formatMoney(group[0].transfer_out * group.length, '€')}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
