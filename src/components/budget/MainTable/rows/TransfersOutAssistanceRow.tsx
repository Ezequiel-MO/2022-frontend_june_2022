import { useEffect } from 'react'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks'
import { ITransfer } from '../../../../interfaces'

interface TransfersOutAssistanceRowProps {
  firstItem: ITransfer
  date: string
}

export const TransfersOutAssistanceRow = ({
  firstItem,
  date
}: TransfersOutAssistanceRowProps) => {
  const { updateTransfersOut } = useBudget()

  if (!firstItem) {
    return null
  }

  const { assistance = 0, assistanceCost = 0 } = firstItem

  useEffect(() => {
    updateTransfersOut('assistance', assistance, assistanceCost)
  }, [])

  return (
    <tr>
      <td
        className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]'
        title={date}
      >
        {date}
      </td>
      <td></td>
      <td>On-board Assistance @ Buses</td>
      <td>{assistance}</td>
      <td>{accounting.formatMoney(assistanceCost, '€')}</td>
      <td>{accounting.formatMoney(assistance * assistanceCost, '€')}</td>
    </tr>
  )
}
