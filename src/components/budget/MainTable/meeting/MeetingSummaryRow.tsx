import { useEffect } from 'react'
import accounting from 'accounting'
import { useBudget, useFindMeetingByHotel } from '../../../../hooks'
import { IMeeting } from '../../../../interfaces'
import React from 'react'
import { ToggleTableRowIcon } from '../../../atoms'

interface MeetingSummaryRowProps {
  pax: number
  dateProp: string
  typeOfMeetingProp:
    | 'Morning Meeting'
    | 'Afternoon Meeting'
    | 'Full Day Meeting'
  meetings: IMeeting[]
  id: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const mapTypeOfMeeting = (
  type: string
): 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings' => {
  switch (type) {
    case 'Morning Meeting':
      return 'morningMeetings'
    case 'Afternoon Meeting':
      return 'afternoonMeetings'
    case 'Full Day Meeting':
      return 'fullDayMeetings'
    default:
      throw new Error(`Unknown typeOfMeetingProp: ${type}`)
  }
}

export const MeetingSummaryRow = ({
  pax,
  dateProp,
  typeOfMeetingProp,
  meetings,
  id,
  isOpen,
  setIsOpen
}: MeetingSummaryRowProps) => {
  const { hotelName, updateMeetingTotalCost } = useBudget()

  const { meeting } = useFindMeetingByHotel(meetings, hotelName)

  useEffect(() => {
    updateMeetingTotalCost(dateProp, id, pax, hotelName)
  }, [dateProp, typeOfMeetingProp, hotelName])

  if (!meeting) return null

  const toggleBreakdown = () => {
    setIsOpen((prevState: boolean) => !prevState)
  }

  return (
    <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
      <td></td>
      <td
        className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]'
        title={`${typeOfMeetingProp} @ ${hotelName}`}
      >{`${typeOfMeetingProp} @ ${hotelName}`}</td>
      <td></td>
      <td></td>
      <td>{accounting.formatMoney(meeting?.totalCost || 0, '€')}</td>
    </tr>
  )
}
