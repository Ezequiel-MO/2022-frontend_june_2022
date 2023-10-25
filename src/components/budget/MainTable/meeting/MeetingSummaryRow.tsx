import { useEffect } from 'react'
import accounting from 'accounting'
import { useBudget, useFindMeetingByHotel } from '../../../../hooks'
import { IMeeting } from '../../../../interfaces'
import React from 'react'
import { Icon } from '@iconify/react'

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

  if (!meeting) return null
  useEffect(() => {
    updateMeetingTotalCost(dateProp, id, pax, hotelName)
  }, [dateProp, typeOfMeetingProp, hotelName])

  const toggleBreakdown = () => {
    setIsOpen((prevState: boolean) => !prevState)
  }

  const toggleBreakdown = () => {
    setIsOpen((prevState: boolean) => !prevState)
  }

  return (
    <tr className='dark:bg-[#a9ba9d] dark:text-black-50'>
      <td
        onClick={toggleBreakdown}
        className='cursor-pointer flex justify-center py-4'
      >
        <Icon
          icon={isOpen ? 'typcn:minus' : 'typcn:plus'}
          width='30'
          height='30'
        />
      </td>
      <td></td>
      <td>{`${typeOfMeetingProp} @ ${hotelName}`}</td>
      <td></td>
      <td></td>
      <td>{accounting.formatMoney(meeting?.totalCost || 0, '€')}</td>
    </tr>
  )
}
