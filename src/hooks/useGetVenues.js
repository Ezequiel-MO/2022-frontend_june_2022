import { useEffect, useState } from 'react'

export const useGetVenues = (id, options) => {
  const [venues, setVenues] = useState([])
  useEffect(() => {
    if (id === 'lunch' || id === 'dinner') {
      console.table('id', id, 'options', options)
      setVenues(options.filter((option) => option.isVenue === true))
    }
  }, [id])

  return { venues }
}
