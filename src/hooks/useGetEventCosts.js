import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

export const useGetEventCosts = () => {
  const { events } = useBudget()
  const [eventsTotalCost, setEventsTotalCost] = useState(0)

  useEffect(() => {
    const eventsArray = Object.values(events)

    let totalCostPerDayArray = eventsArray?.map((day) => {
      return Object.values(day)
        .map(({ pricePerPerson, price, totalCost }) => {
          return pricePerPerson === true ? totalCost : price
        })
        .reduce((a, b) => a + b, 0)
    })

    let totalCost = totalCostPerDayArray.reduce((a, b) => a + b, 0)

    setEventsTotalCost(totalCost)
  }, [events])
  return {
    eventsTotalCost
  }
}
