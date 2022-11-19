import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import useGetMealsCost from '../../../hooks/useGetMealCosts'
import useGetMeetingsCost from '../../../hooks/useGetMeetingsCost'

const TotalBudgetCost = () => {
  const { currentHotel } = useCurrentProject()
  const { meetingTotalCost = 0 } = useGetMeetingsCost()
  const { mealsTotalCost = 0 } = useGetMealsCost()

  return (
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell colSpan={2}>
        <strong>TOTAL BUDGET</strong>
      </TableCell>
      <TableCell>
        <strong>
          {accounting.formatMoney(
            currentHotel.totalCost + meetingTotalCost + mealsTotalCost,
            '€'
          )}
        </strong>
      </TableCell>
    </TableRow>
  )
}

export default TotalBudgetCost
