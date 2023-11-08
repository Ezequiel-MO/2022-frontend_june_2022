import React from 'react'
import { TransferCells } from './TransferCells'
import { ITransfer } from '../../../../interfaces/transfer'

interface TransferRowProps {
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

export const TransferRow: React.FC<TransferRowProps> = ({
  date,
  options,
  description
}) => {
  const groupedOptions = options.reduce((acc, option) => {
    const service = option.selectedService

    if (service) {
      if (acc[service]) {
        acc[service].count += 1
      } else {
        acc[service] = {
          ...option,
          count: 1
        }
      }
    }
    return acc
  }, {} as { [key: string]: ITransfer & { count: number } })

  const groupedOptionsArray = Object.values(groupedOptions)

  return (
    <>
      {groupedOptionsArray.map((group) => (
        <tr
          key={group.selectedService}
          className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'
        >
          <td>{date}</td>
          <TransferCells
            description={description}
            option={group}
            count={group.count}
          />
        </tr>
      ))}
    </>
  )
}
