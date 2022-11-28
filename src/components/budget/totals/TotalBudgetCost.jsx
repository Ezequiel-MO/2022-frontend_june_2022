import { useState, useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import useGetMealsCost from '../../../hooks/useGetMealCosts'
import useGetMeetingsCost from '../../../hooks/useGetMeetingsCost'
import useGetEventCosts from '../../../hooks/useGetEventCosts'
import useGetTransferCosts from '../../../hooks/useGetTransferCosts'

const TotalBudgetCost = () => {
  const [totalCost, setTotalCost] = useState(0)
  const { currentHotel } = useCurrentProject()
  const { meetingTotalCost = 0 } = useGetMeetingsCost()
  const { mealsTotalCost = 0 } = useGetMealsCost()
  const { eventsTotalCost = 0 } = useGetEventCosts()
  const { transfersTotalCost = 0 } = useGetTransferCosts()

  useEffect(() => {
    setTotalCost(
      currentHotel?.totalCost +
        meetingTotalCost +
        mealsTotalCost +
        eventsTotalCost +
        transfersTotalCost
    )
  }, [
    currentHotel,
    meetingTotalCost,
    mealsTotalCost,
    eventsTotalCost,
    transfersTotalCost
  ])

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

export default TotalBudgetCost
