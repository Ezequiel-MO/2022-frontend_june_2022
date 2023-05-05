import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

export const useGetMealsCost = () => {
  const { meals } = useBudget()
  const [mealsTotalCost, setMealsTotalCost] = useState(0)
  useEffect(() => {
    const mealsArray = Object.values(meals)
    let totalCostPerDayArray = mealsArray?.map((day) => {
      return Object.values(day)
        .map((meal) => meal.price)
        .reduce((a, b) => a + b, 0)
    })

    let totalCost = totalCostPerDayArray.reduce((a, b) => a + b, 0)

    setMealsTotalCost(totalCost)
  }, [meals])
  return {
    mealsTotalCost
  }
}
