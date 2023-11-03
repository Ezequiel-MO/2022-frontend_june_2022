import { useBudget } from './useBudget'

interface ShowDetails {
  showCost?: number
}

interface DayDetails {
  lunch?: ShowDetails
  dinner?: ShowDetails
}

export const useGetShowCost = () => {
  const { shows } = useBudget()
  let showTotalCost = 0

  Object.values(shows).forEach((day: DayDetails) => {
    if (day.lunch?.showCost) {
      showTotalCost += day.lunch.showCost
    }
    if (day.dinner?.showCost) {
      showTotalCost += day.dinner.showCost
    }
  })

  return { showTotalCost }
}
