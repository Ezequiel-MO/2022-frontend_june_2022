// hooks/useUpdateEventTotalCost.js
import { useEffect, useMemo, useRef } from 'react'

export const useUpdateEventTotalCost = (
  id,
  date,
  pax,
  option,
  updateEventTotalCost
) => {
  const prevOptionIdRef = useRef(null)

  const memoizedOption = useMemo(
    () => option,
    [option._id, option.price, option.pricePerPerson]
  )

  useEffect(() => {
    if (
      id === 'morningEvents' ||
      id === 'afternoonEvents' ||
      id === 'lunch' ||
      (id === 'dinner' && prevOptionIdRef.current !== memoizedOption._id)
    ) {
      updateEventTotalCost(date, id, pax, memoizedOption._id)
      prevOptionIdRef.current = memoizedOption._id
    }
  }, [id, date, pax, memoizedOption])
}

export default useUpdateEventTotalCost
