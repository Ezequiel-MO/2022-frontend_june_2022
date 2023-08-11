import { useState, useEffect } from 'react'
import { useBudget } from '../../../../hooks'
import { IEvent, IRestaurant } from '../../../../interfaces'

export const useSingleChoiceCells = (
  pax: number,
  options: IEvent[] | IRestaurant[],
  date: string,
  id: string
): { pricePerPerson: boolean } => {
  const [pricePerPerson, setPricePerPerson] = useState(true)
  const { updateEventTotalCost, setCurrentEvents, setCurrentMeals } =
    useBudget()

  useEffect(() => {
    if (options[0]?._id) {
      if (id === 'lunch' || id === 'dinner') {
        setCurrentMeals(date, id, options[0]?._id)
      }
      if (id === 'morningEvents' || id === 'afternoonEvents') {
        setCurrentEvents(date, id, options[0]?._id)
        if (
          'pricePerPerson' in options[0] &&
          options[0]?.pricePerPerson === false
        ) {
          setPricePerPerson(false)
        }
      }
    }
  }, [options[0], id])

  useEffect(() => {
    if (options[0]?._id) {
      if (
        id === 'morningEvents' ||
        id === 'afternoonEvents' ||
        id === 'lunch' ||
        id === 'dinner'
      ) {
        updateEventTotalCost(date, id, pax, options[0]?._id)
      }
    }
  }, [id])

  return { pricePerPerson }
}
