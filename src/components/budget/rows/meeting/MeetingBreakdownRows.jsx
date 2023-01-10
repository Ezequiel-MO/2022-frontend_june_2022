import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { MeetingBreakdownRow } from '../../'
import {
  useBudget,
  useFindHotelByName,
  useFindMeetingByHotel
} from '../../../../hooks'

export const MeetingBreakdownRows = ({
  pax,
  dateProp,
  typeOfMeetingProp,
  meetings
}) => {
  const { breakdownOpen, hotelName, hotels } = useBudget()
  const { meetingBreakdownOpen } = breakdownOpen
  const { open, date, typeOfMeeting } = meetingBreakdownOpen

  const { selectedHotel } = useFindHotelByName(hotelName, hotels)
  const { meeting } = useFindMeetingByHotel(meetings, selectedHotel)

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse
          in={open && date === dateProp && typeOfMeeting === typeOfMeetingProp}
          timeout='auto'
          unmountOnExit
        >
          <Box margin={1}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Nr. Units </TableCell>
                  <TableCell></TableCell>
                  <TableCell>Unit Cost</TableCell>
                  <TableCell>Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {typeOfMeetingProp === 'Full Day Meeting' ? (
                  <>
                    <MeetingBreakdownRow
                      units={1}
                      title='Full Day Rental Rate'
                      rate={meeting?.FDRate}
                    />
                    <MeetingBreakdownRow
                      units={pax}
                      title='Full Day Delegate Rate'
                      rate={meeting?.FDDDR}
                    />
                  </>
                ) : (
                  <>
                    <MeetingBreakdownRow
                      units={1}
                      title='Half Day Rental Rate'
                      rate={meeting?.HDRate}
                    />
                    <MeetingBreakdownRow
                      units={pax}
                      title='Half Day Delegate Rate'
                      rate={meeting?.HDDDR}
                    />
                  </>
                )}

                <MeetingBreakdownRow
                  units={meeting?.coffeeBreakUnits}
                  title='Coffee Breaks'
                  rate={meeting?.coffeeBreakPrice}
                />
                <MeetingBreakdownRow
                  units={meeting?.workingLunchUnits}
                  title='Working Lunch'
                  rate={meeting?.workingLunchPrice}
                />
                <MeetingBreakdownRow
                  units={meeting?.hotelDinnerUnits}
                  title='Dinner @ Hotel'
                  rate={meeting?.hotelDinnerPrice}
                />
                <MeetingBreakdownRow
                  units={1}
                  title='Audio Visuals Package'
                  rate={meeting?.aavvPackage}
                />
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}
