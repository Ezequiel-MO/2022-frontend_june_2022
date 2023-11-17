import { useMemo } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'

interface TransfersOutRowProps {
  items: ITransfer[]
  date: string
}

export const TransfersOutRow = ({ items, date }: TransfersOutRowProps) => {
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

  return (
    <>
      {Object.entries(groupedItems).map(([key, group]) => (
        <tr
          key={key}
          className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'
        >
          <td
            className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]'
            title={date}
          >
            {date}
          </td>
          <td>Transfer To Airport</td>
          <td>
            {`${group[0].vehicleCapacity} Seater ${group[0].vehicleType}`}
          </td>
          <td>{group.length}</td>
          <td>{accounting.formatMoney(group[0].transfer_out, '€')}</td>
          <td>
            {accounting.formatMoney(group[0].transfer_out * group.length, '€')}
          </td>
        </tr>
      ))}
    </>
  )
}
