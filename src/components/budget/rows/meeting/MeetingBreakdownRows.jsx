import { useContext } from 'react'
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { Box } from '@mui/system'
import { BudgetContext } from '../../context/context'
import MeetingBreakdownRow from './MeetingBreakdownRow'

const MeetingBreakdownRows = ({ pax }) => {
  const { budgetValues } = useContext(BudgetContext)
  const { meetingBreakdownOpen, selectedMeeting } = budgetValues
  console.log('selected meeting', selectedMeeting)

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={meetingBreakdownOpen} timeout='auto' unmountOnExit>
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
                <MeetingBreakdownRow
                  units={1}
                  title='Half Day Rental Rate'
                  rate={selectedMeeting.HDRate}
                />
                <MeetingBreakdownRow
                  units={pax}
                  title='Half Day Delegate Rate'
                  rate={selectedMeeting.HDDDR}
                />
                <MeetingBreakdownRow
                  units={selectedMeeting.coffeeBreakUnits}
                  title='Coffee Breaks'
                  rate={selectedMeeting.coffeeBreakPrice}
                />
                <MeetingBreakdownRow
                  units={selectedMeeting.workingLunchUnits}
                  title='Working Lunch'
                  rate={selectedMeeting.workingLunchPrice}
                />
                <MeetingBreakdownRow
                  units={selectedMeeting.hotelDinnerUnits}
                  title='Dinner @ Hotel'
                  rate={selectedMeeting.hotelDinnerPrice}
                />
                <MeetingBreakdownRow
                  units={1}
                  title='Audio Visuals Package'
                  rate={selectedMeeting.aavvPackage}
                />
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default MeetingBreakdownRows
