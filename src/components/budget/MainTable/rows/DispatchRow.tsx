import { useEffect } from 'react'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'
import { ITransfer } from '../../../../interfaces'

interface DispatchRowProps {
  firstItem: ITransfer
  date: string
}

export const DispatchRow = ({ firstItem, date }: DispatchRowProps) => {
  const { updateTransfersOut } = useBudget()

  const { meetGreet = 0, meetGreetCost = 0 } = firstItem || {}

  if (!firstItem || meetGreet === 0 || meetGreetCost === 0) {
    return null
  }

  useEffect(() => {
    updateTransfersOut('meetGreet', meetGreet, meetGreetCost)
  }, [])

  return (
    <tr className='bg-gray-800 dark:border-gray-700 dark:text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <td>{date}</td>
      <td></td>
      <td>Bus Dispatcher</td>
      <td>{meetGreet}</td>
      <td>{accounting.formatMoney(meetGreetCost, '€')}</td>
      <td>{accounting.formatMoney(meetGreet * meetGreetCost, '€')}</td>
    </tr>
  )
}
