import React, { useContext } from 'react'
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { BudgetContext } from '../../context/context'
import useGetHotel from '../../../../hooks/useGetHotel'
import { BUDGET_ACTIONS } from '../../context/reducer'

const MeetingMultipleChoice = ({ options, typeOfMeeting }) => {
  const { budgetValues, dispatch } = useContext(BudgetContext)

  const { hotel } = useGetHotel(options[0].hotel[0])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant='standard' sx={{ m: 1, minWidth: '15rem' }}>
        <Select
          onChange={(e) =>
            dispatch({
              type: BUDGET_ACTIONS.SET_SELECTED_MEETING_HOTEL_ID,
              payload: e.target.value
            })
          }
          value={budgetValues.selectedMeetingName || options[0].hotel[0]}
        >
          {options.map((option) => {
            return (
              <MenuItem key={option.hotel[0]} value={option.hotel[0]}>
                {`${typeOfMeeting} @ ${hotel.name}`}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default MeetingMultipleChoice
