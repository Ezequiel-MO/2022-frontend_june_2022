import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'

interface DispatchRowProps {
  lastItem: ITransfer
  date: string
}

export const DispatchRow = ({ lastItem, date }: DispatchRowProps) => {
  const { meetGreet = 0, meetGreetCost = 0 } = lastItem || {}

  if (!lastItem || meetGreet === 0 || meetGreetCost === 0) {
    return null
  }

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
