import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

export const useGetEventCosts = () => {
  const { events } = useBudget()

  const [eventsTotalCost, setEventsTotalCost] = useState(0)

  useEffect(() => {
    if (events && typeof events === 'object') {
      const eventsArray = Object.values(events)

      let totalCostPerDayArray = eventsArray?.map((day) => {
        return Object.values(day)
          .map(({ pricePerPerson, price, totalCost = 0 }) => {
            return pricePerPerson === true ||
              pricePerPerson === undefined ||
              pricePerPerson === null
              ? totalCost
              : price
          })
          .reduce((a, b) => a + b, 0)
      })

      let totalCost = totalCostPerDayArray.reduce((a, b) => a + b, 0)

      setEventsTotalCost(totalCost)
    } else {
      setEventsTotalCost(0)
    }
  }, [events])

  return {
    eventsTotalCost
  }
}
