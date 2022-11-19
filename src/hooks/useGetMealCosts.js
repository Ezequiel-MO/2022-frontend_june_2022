import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

const useGetMealsCost = () => {
  const { meals } = useBudget()
  const [mealsTotalCost, setMealsTotalCost] = useState(0)

  useEffect(() => {
    if (meals) {
      const mealsArray = Object.values(meals)
      const newArray = mealsArray.map((meal) => {
        return Object.values(meal).map(({ totalCost }) => {
          return totalCost
        })
      })
      const totalCost = newArray.flat().reduce((a, b) => a + b, 0)

      setMealsTotalCost(totalCost)
    }
  }, [meals])
  return {
    mealsTotalCost
  }
}

export default useGetMealsCost
