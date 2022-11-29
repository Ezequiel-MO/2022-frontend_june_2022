import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'
import { useCurrentProject } from './useCurrentProject'

const useGetMeetingsCost = () => {
  const { meetings } = useBudget()
  const { currentHotel } = useCurrentProject()
  const [meetingTotalCost, setMeetingTotalCost] = useState(0)
  let totalCost
  useEffect(() => {
    if (meetings) {
      const meetingsArray = Object.values(meetings)
      const newArray = meetingsArray.map((meeting) => {
        return Object.values(meeting).map(({ totalCost }) => {
          return totalCost
        })
      })
      totalCost = newArray.flat().reduce((a, b) => a + b, 0)

      setMeetingTotalCost(totalCost)
    }
  }, [meetings, currentHotel])
  return {
    meetingTotalCost
  }
}

export default useGetMeetingsCost
