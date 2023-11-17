import React from 'react'
import accounting from 'accounting'
import { ToggleTableRowIcon } from '../../../../atoms'
import { useContextBudget } from '../../../context/BudgetContext'

interface MeetingSummaryRowProps {
  type: 'morning' | 'afternoon' | 'full_day'
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MeetingSummaryRow = ({
  type,
  isOpen,
  setIsOpen
}: MeetingSummaryRowProps) => {
  const { state } = useContextBudget()

  const toggleBreakdown = () => {
    setIsOpen((prevState: boolean) => !prevState)
  }

  return (
    <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
      <td></td>
      <td
        className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]'
        title={`Select another hotel above to get prices for other hotel`}
      >{`${type} Meeting @ ${state.selectedHotel?.name}`}</td>
      <td></td>
      <td></td>
      <td>{accounting.formatMoney(state.meetingsCost || 0, '€')}</td>
    </tr>
  )
}
