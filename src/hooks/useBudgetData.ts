import { useMemo, useState, useEffect } from 'react'
import {
  useBudget,
  useCurrentProject,
  useGetEventCosts,
  useGetMealsCost,
  useGetMeetingsCost,
  useGetTransferCosts
} from '.'

export const useBudgetData = () => {
  const [totalCost, setTotalCost] = useState(0)
  const { currentProject, currentHotel } = useCurrentProject()
  const { nrPax } = currentProject
  const { hotels, schedule } = useBudget()
  const { meetingTotalCost = 0 } = useGetMeetingsCost()
  const { mealsTotalCost = 0 } = useGetMealsCost()
  const { eventsTotalCost = 0 } = useGetEventCosts()
  const { transfersTotalCost = 0 } = useGetTransferCosts()

  useMemo(() => {
    if (currentHotel && currentHotel.totalCost !== undefined) {
      const totalCost =
        currentHotel.totalCost +
        meetingTotalCost +
        mealsTotalCost +
        eventsTotalCost +
        transfersTotalCost

      setTotalCost(totalCost)
    }
  }, [
    currentHotel,
    meetingTotalCost,
    mealsTotalCost,
    eventsTotalCost,
    transfersTotalCost
  ])

  return {
    hotels,
    currentHotel,
    schedule,
    nrPax,
    totalCost
  }
}
