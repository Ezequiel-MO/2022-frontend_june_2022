import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

const useGetEventCosts = () => {
  const { events } = useBudget()
  const [eventsTotalCost, setEventsTotalCost] = useState(0)

  useEffect(() => {
    const eventsArray = Object.values(events)
    const newArray = eventsArray.map((event) => {
      return Object.values(event).map(({ totalCost }) => {
        return totalCost
      })
    })
    const totalCost = newArray.flat().reduce((a, b) => a + b, 0)

    setEventsTotalCost(totalCost)
  }, [events])
  return {
    eventsTotalCost
  }
}

export default useGetEventCosts
