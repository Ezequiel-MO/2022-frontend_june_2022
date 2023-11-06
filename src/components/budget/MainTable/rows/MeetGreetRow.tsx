import { useEffect } from 'react'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'
import { ITransfer } from '../../../../interfaces'

interface MeetGreetRowProps {
  firstItem: ITransfer
  date: string
}

export const MeetGreetRow = ({ firstItem, date }: MeetGreetRowProps) => {
  const { updateTransfersIn } = useBudget()

  if (!firstItem) {
    return null
  }

  const { meetGreet = 0, meetGreetCost = 0 } = firstItem

  if (meetGreet === 0) {
    return null
  }

  useEffect(() => {
    updateTransfersIn('meetGreet', meetGreet, meetGreetCost)
  }, [])

  return (
    <tr>
      <td>{date}</td>
      <td></td>
      <td>Meet & Greet @ Airport</td>
      <td>{meetGreet}</td>
      <td>{accounting.formatMoney(meetGreetCost, '€')}</td>
      <td>{accounting.formatMoney(meetGreet * meetGreetCost, '€')}</td>
    </tr>
  )
}
