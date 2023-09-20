import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

export const useGetVenuesCost = () => {
  const { venues } = useBudget()
  const [venuesTotalCost, setVenuesTotalCost] = useState<number>(0)

  useEffect(() => {
    let totalCost = 0

    Object.keys(venues).forEach((date) => {
      ;['lunch', 'dinner'].forEach((typeOfEvent) => {
        if (venues[date][typeOfEvent]) {
          const {
            rental = 0,
            cocktail_units = 0,
            cocktail_price = 0,
            catering_units = 0,
            catering_price = 0,
            staff_units = 0,
            staff_menu_price = 0,
            audiovisuals = 0,
            cleaning = 0,
            security = 0,
            entertainment = 0
          } = venues[date][typeOfEvent].venue_price || {}

          totalCost +=
            rental +
            cocktail_units * cocktail_price +
            catering_units * catering_price +
            staff_units * staff_menu_price +
            audiovisuals +
            cleaning +
            security +
            entertainment
        }
      })
    })

    setVenuesTotalCost(totalCost)
  }, [venues])

  return {
    venuesTotalCost
  }
}
