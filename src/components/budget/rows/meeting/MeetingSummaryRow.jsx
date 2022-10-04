import { useContext, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { BudgetContext } from '../../context/context'
import { BUDGET_ACTIONS } from '../../context/reducer'
import MeetingMultipleChoice from './MeetingMultipleChoice'

const MeetingSummaryRow = ({ date, typeOfMeeting, options }) => {
  const { budgetValues, dispatch } = useContext(BudgetContext)
  const { meetingBreakdownOpen, selectedMeetingName } = budgetValues

  useEffect(() => {
    console.log(options)
  }, [options])

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
      <TableCell>200</TableCell>
    </TableRow>
  )
}

export default MeetingSummaryRow
