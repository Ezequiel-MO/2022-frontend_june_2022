import { useEffect } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import {
  useBudget,
  useFindByName,
  useFindMeetingByHotel
} from '../../../../hooks'
import { ArrowIcon } from '../../../atoms'
import { IHotel, IMeeting } from '../../../../interfaces'

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

const mapTypeOfMeeting = (
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
  const {
    toggleMeetingBreakdown,
    breakdownOpen,
    hotelName,
    hotels,
    updateMeetingTotalCost
  } = useBudget()

  const { meetingBreakdownOpen } = breakdownOpen
  const { open, date, typeOfMeeting } = meetingBreakdownOpen

  const { selectedOption: selectedHotel } = useFindByName(
    hotels,
    hotelName
  ) as {
    selectedOption: IHotel
  }
  const { meeting } = useFindMeetingByHotel(meetings, selectedHotel._id)

  useEffect(() => {
    updateMeetingTotalCost(dateProp, id, pax, selectedHotel._id)
  }, [dateProp, typeOfMeetingProp, selectedHotel])

  const handleToggleMeetingBreakdown = () => {
    toggleMeetingBreakdown({
      open: !open,
      date: dateProp,
      typeOfMeeting: mapTypeOfMeeting(typeOfMeetingProp)
    })
  }

  return (
    <TableRow>
      <TableCell>{dateProp}</TableCell>
      <TableCell>
        <IconButton onClick={handleToggleMeetingBreakdown}>
          <ArrowIcon
            open={open}
            date={date}
            dateProp={dateProp}
            typeOfMeeting={typeOfMeeting}
            typeOfMeetingProp={typeOfMeetingProp}
          />
        </IconButton>
      </TableCell>
      <TableCell>{`${typeOfMeetingProp} @ ${selectedHotel.name}`}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        {accounting.formatMoney(meeting?.totalCost || 0, '€')}
      </TableCell>
    </TableRow>
  )
}
