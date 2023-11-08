import accounting from 'accounting'
import { ITransfer } from '../../../../interfaces'

interface MeetGreetRowProps {
  firstItem: ITransfer
  date: string
}

export const MeetGreetRow = ({ firstItem, date }: MeetGreetRowProps) => {
  if (!firstItem) {
    return null
  }

  const { meetGreet = 0, meetGreetCost = 0 } = firstItem

  if (meetGreet === 0) {
    return null
  }

  return (
    <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <td>{date}</td>
      <td></td>
      <td>Meet & Greet @ Airport</td>
      <td>{meetGreet}</td>
      <td>{accounting.formatMoney(meetGreetCost, '€')}</td>
      <td>{accounting.formatMoney(meetGreet * meetGreetCost, '€')}</td>
    </tr>
  )
}
