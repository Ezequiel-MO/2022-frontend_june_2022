// hooks/useUpdateEventTotalCost.js
import { useEffect, useRef } from 'react'

export const useUpdateEventTotalCost = (
  id,
  date,
  pax,
  option,
  updateEventTotalCost
) => {
  const prevOptionIdRef = useRef(null)

  useEffect(() => {
    if (
      (id === 'morningEvents' ||
        id === 'afternoonEvents' ||
        id === 'lunch' ||
        id === 'dinner') &&
      prevOptionIdRef.current !== option._id
    ) {
      updateEventTotalCost(date, id, pax, option._id)
      prevOptionIdRef.current = option._id
    }
  }, [id, date, pax, option])
}

export default useUpdateEventTotalCost
