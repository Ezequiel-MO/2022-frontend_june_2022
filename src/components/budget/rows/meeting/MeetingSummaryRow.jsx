import { useState, useContext, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { BudgetContext } from '../../context/context'
import { BUDGET_ACTIONS } from '../../context/reducer'
import MeetingMultipleChoice from './MeetingMultipleChoice'
import { getMeetingTotal } from '../../totals/compute-totals-functions'

const MeetingSummaryRow = ({ pax, date, typeOfMeeting, options }) => {
  const [selectedMeeting, setSelectedMeeting] = useState(options[0])
  const { budgetValues, dispatch } = useContext(BudgetContext)
  const {
    meetingBreakdownOpen,
    selectedMeetingHotelId,
    selectedMeetingTotalCost
  } = budgetValues

  useEffect(() => {
    const totalAmount = getMeetingTotal(selectedMeeting, pax)
    dispatch({
      type: BUDGET_ACTIONS.SET_SELECTED_MEETING_TOTAL_COST,
      payload: totalAmount
    })
  }, [selectedMeeting])

  useEffect(() => {
    if (selectedMeetingHotelId) {
      setSelectedMeeting(
        options?.find((meeting) => meeting.hotel[0] === selectedMeetingHotelId)
      )
    }
  }, [selectedMeetingHotelId, options])

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>
        <IconButton
          onClick={() =>
            dispatch({
              type: BUDGET_ACTIONS.TOGGLE_MEETING_BREAKDOWN,
              payload: !meetingBreakdownOpen
            })
          }
        >
          {budgetValues.meetingBreakdownOpen ? (
            <Icon icon='bx:up-arrow' color='#ea5933' />
          ) : (
            <Icon icon='bx:down-arrow' color='#ea5933' />
          )}
        </IconButton>
      </TableCell>
      <TableCell>
        <MeetingMultipleChoice
          options={options}
          typeOfMeeting={typeOfMeeting}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        {accounting.formatMoney(selectedMeetingTotalCost, '€')}
      </TableCell>
    </TableRow>
  )
}

export default MeetingSummaryRow
