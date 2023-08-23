import { useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useBudget, useFindMeetingByHotel } from '../../../../hooks'
import { IMeeting } from '../../../../interfaces'

interface MeetingSummaryRowProps {
  pax: number
  dateProp: string
  typeOfMeetingProp:
    | 'Morning Meeting'
    | 'Afternoon Meeting'
    | 'Full Day Meeting'
  meetings: IMeeting[]
  id: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'
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
  id
}: MeetingSummaryRowProps) => {
  const { hotelName, updateMeetingTotalCost } = useBudget()

  const { meeting } = useFindMeetingByHotel(meetings, hotelName)

  useEffect(() => {
    updateMeetingTotalCost(dateProp, id, pax, hotelName)
  }, [dateProp, typeOfMeetingProp, hotelName])

  if (!meeting) return null

  return (
    <TableRow className='dark:bg-[#a9ba9d]'>
      <TableCell>{dateProp}</TableCell>
      <TableCell></TableCell>
      <TableCell>{`${typeOfMeetingProp} @ ${hotelName}`}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        {accounting.formatMoney(meeting?.totalCost || 0, '€')}
      </TableCell>
    </TableRow>
  )
}
