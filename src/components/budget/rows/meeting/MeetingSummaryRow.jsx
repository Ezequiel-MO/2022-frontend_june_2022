import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useBudget } from '../../../../hooks/useBudget'
import useFindHotelByName from '../../../../hooks/useFindHotelByName'
import useFindMeetingByHotel from '../../../../hooks/useFindMeetingByHotel'

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
    updateMeetingTotalCost,
    setCurrentMeetings
  } = useBudget()
  const { meetingBreakdownOpen } = breakdownOpen
  const { open, date, typeOfMeeting } = meetingBreakdownOpen

  const { selectedHotel } = useFindHotelByName(hotelName, hotels)
  const { meeting } = useFindMeetingByHotel(meetings, selectedHotel)

  useEffect(() => {
    setCurrentMeetings(dateProp, id, meeting._id)
  }, [meeting])

  useEffect(() => {
    updateMeetingTotalCost(dateProp, id, pax, hotelName || selectedHotel.name)
  }, [dateProp, typeOfMeetingProp, hotelName])

  return (
    <TableRow>
      <TableCell>{dateProp}</TableCell>
      <TableCell>
        <IconButton
          onClick={() =>
            toggleMeetingBreakdown({
              open: !open,
              date: dateProp,
              typeOfMeeting: typeOfMeetingProp
            })
          }
        >
          {open && date === dateProp && typeOfMeeting === typeOfMeetingProp ? (
            <Icon icon='bx:up-arrow' color='#ea5933' />
          ) : (
            <Icon icon='bx:down-arrow' color='#ea5933' />
          )}
        </IconButton>
      </TableCell>
      <TableCell>{`${typeOfMeetingProp}  @ ${selectedHotel.name}`}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>{accounting.formatMoney(meeting.totalCost, '€')}</TableCell>
    </TableRow>
  )
}
