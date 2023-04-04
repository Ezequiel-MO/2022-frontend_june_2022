import { useState, useEffect } from 'react'
import { useBudget } from '../../../../hooks'

export const useSingleChoiceCells = (pax, options, date, id) => {
  const [pricePerPerson, setPricePerPerson] = useState(true)
  const { updateEventTotalCost, setCurrentEvents, setCurrentMeals } =
    useBudget()

  useEffect(() => {
    if (id === 'lunch' || id === 'dinner') {
      setCurrentMeals(date, id, options[0]?._id)
    }
    if (id === 'morningEvents' || id === 'afternoonEvents') {
      setCurrentEvents(date, id, options[0]?._id)
      if (options[0]?.pricePerPerson === false) {
        setPricePerPerson(false)
      }
    }
  }, [options[0], id])

  useEffect(() => {
    if (
      id === 'morningEvents' ||
      id === 'afternoonEvents' ||
      id === 'lunch' ||
      id === 'dinner'
    ) {
      updateEventTotalCost(date, id, pax, options[0]?._id)
    }
  }, [id])

  return { pricePerPerson }
}
