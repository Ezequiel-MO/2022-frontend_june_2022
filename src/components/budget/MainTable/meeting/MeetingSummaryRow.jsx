import { useEffect } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import {
  useBudget,
  useFindByName,
  useFindMeetingByHotel
} from '../../../../hooks'
import { ArrowIcon } from '../../../atoms'

export const MeetingSummaryRow = ({
  pax,
  dateProp,
  typeOfMeetingProp,
  meetings,
  id
}) => {
  const {
    toggleMeetingBreakdown,
    breakdownOpen,
    hotelName,
    hotels,
    updateMeetingTotalCost
  } = useBudget()

  const { meetingBreakdownOpen } = breakdownOpen
  const { open, date, typeOfMeeting } = meetingBreakdownOpen

  const { selectedOption: selectedHotel } = useFindByName(hotels, hotelName)
  const { meeting } = useFindMeetingByHotel(meetings, selectedHotel._id)

  useEffect(() => {
    updateMeetingTotalCost(dateProp, id, pax, hotelName || selectedHotel.name)
  }, [dateProp, typeOfMeetingProp, hotelName])

  const handleToggleMeetingBreakdown = () => {
    toggleMeetingBreakdown({
      open: !open,
      date: dateProp,
      typeOfMeeting: typeOfMeetingProp
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
      <TableCell>{accounting.formatMoney(meeting.totalCost, '€')}</TableCell>
    </TableRow>
  )
}
