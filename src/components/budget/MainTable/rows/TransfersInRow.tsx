import { useEffect, useMemo } from 'react'
import accounting from 'accounting'
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
        <tr key={key}>
          <td>{date}</td>
          <td>Transfer from Airport</td>
          <td>
            {`${group[0].vehicleCapacity} Seater ${group[0].vehicleType}`}
          </td>
          <td>{group.length}</td>
          <td>{accounting.formatMoney(group[0].transfer_in, '€')}</td>
          <td>
            {accounting.formatMoney(group[0].transfer_in * group.length, '€')}
          </td>
        </tr>
      ))}
    </>
  )
}
