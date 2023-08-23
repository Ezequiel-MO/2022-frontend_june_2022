import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { MeetingBreakdownRow, mapTypeOfMeeting } from '.'
import { useBudget, useFindMeetingByHotel } from '../../../../hooks'
import { IMeeting } from '../../../../interfaces'

interface Props {
  pax: number
  dateProp: string
  typeOfMeetingProp:
    | 'Morning Meeting'
    | 'Afternoon Meeting'
    | 'Full Day Meeting'
  meetings: IMeeting[]
}

export const MeetingBreakdownRows = ({
  pax,
  dateProp,
  typeOfMeetingProp,
  meetings
}: Props) => {
  const { breakdownOpen, hotelName } = useBudget()
  const { meetingBreakdownOpen } = breakdownOpen
  const { open, date, typeOfMeeting } = meetingBreakdownOpen

  const { meeting } = useFindMeetingByHotel(meetings, hotelName)

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse
          in={
            open &&
            date === dateProp &&
            typeOfMeeting === mapTypeOfMeeting(typeOfMeetingProp)
          }
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
                      rate={meeting?.FDRate || 0}
                    />
                    <MeetingBreakdownRow
                      units={pax}
                      title='Full Day Delegate Rate'
                      rate={meeting?.FDDDR || 0}
                    />
                  </>
                ) : (
                  <>
                    <MeetingBreakdownRow
                      units={1}
                      title='Half Day Rental Rate'
                      rate={meeting?.HDRate || 0}
                    />
                    <MeetingBreakdownRow
                      units={pax}
                      title='Half Day Delegate Rate'
                      rate={meeting?.HDDDR || 0}
                    />
                  </>
                )}

                <MeetingBreakdownRow
                  units={meeting?.coffeeBreakUnits || 0}
                  title='Coffee Breaks'
                  rate={meeting?.coffeeBreakPrice || 0}
                />
                <MeetingBreakdownRow
                  units={meeting?.workingLunchUnits || 0}
                  title='Working Lunch'
                  rate={meeting?.workingLunchPrice || 0}
                />
                <MeetingBreakdownRow
                  units={meeting?.hotelDinnerUnits || 0}
                  title='Dinner @ Hotel'
                  rate={meeting?.hotelDinnerPrice || 0}
                />
                <MeetingBreakdownRow
                  units={1}
                  title='Audio Visuals Package'
                  rate={meeting?.aavvPackage || 0}
                />
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}
