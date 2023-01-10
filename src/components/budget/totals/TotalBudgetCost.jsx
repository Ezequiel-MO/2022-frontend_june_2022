import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import {
  useCurrentProject,
  useGetMealsCost,
  useGetMeetingsCost,
  useGetEventCosts,
  useGetTransferCosts
} from '../../../hooks'

export const TotalBudgetCost = () => {
  const { currentHotel } = useCurrentProject()
  const { meetingTotalCost = 0 } = useGetMeetingsCost()
  const { mealsTotalCost = 0 } = useGetMealsCost()
  const { eventsTotalCost = 0 } = useGetEventCosts()
  const { transfersTotalCost = 0 } = useGetTransferCosts()

  const totalCost =
    currentHotel?.totalCost +
    meetingTotalCost +
    mealsTotalCost +
    eventsTotalCost +
    transfersTotalCost

  return (
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell colSpan={2}>
        <strong>TOTAL BUDGET</strong>
      </TableCell>
      <TableCell>
        <strong>{accounting.formatMoney(totalCost, '€')}</strong>
      </TableCell>
    </TableRow>
  )
}
