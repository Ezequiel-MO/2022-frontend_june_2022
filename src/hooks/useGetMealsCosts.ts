import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'
import { IRestaurant } from '../interfaces'
import { useCurrentProject } from './useCurrentProject'

export const useGetMealsCost = () => {
  const {
    currentProject: { nrPax }
  } = useCurrentProject()
  const { meals } = useBudget() as {
    meals: Record<string, { lunch?: IRestaurant; dinner?: IRestaurant }>
  }
  const [mealsTotalCost, setMealsTotalCost] = useState<number>(0)

  useEffect(() => {
    let totalCost = 0
    Object.keys(meals).forEach((key) => {
      if (meals[key].lunch) {
        totalCost += meals[key].lunch?.price || 0
      }
      if (meals[key].dinner) {
        totalCost += meals[key].dinner?.price || 0
      }
    })
    setMealsTotalCost(totalCost * nrPax)
  }, [meals])
  return {
    mealsTotalCost
  }
}
