import accounting from 'accounting'
import { ITransfer } from '../../../../interfaces'

interface Props {
  firstItem: ITransfer
  date: string
  description: 'On Board Assistance'
  id: string
}

export const AssistanceRow = ({ firstItem, date, description }: Props) => {
  if (!firstItem) {
    return null
  }

  const { assistance = 0, assistanceCost = 0 } = firstItem

  if (assistance === 0) {
    return null
  }

  return (
    <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <td>{date}</td>
      <td></td>
      <td>{description}</td>
      <td>{assistance}</td>
      <td>{accounting.formatMoney(assistanceCost, '€')}</td>
      <td>{accounting.formatMoney(assistance * assistanceCost, '€')}</td>
    </tr>
  )
}
