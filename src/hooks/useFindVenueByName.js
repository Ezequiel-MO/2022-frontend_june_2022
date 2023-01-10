import { useState, useEffect } from 'react'

export const useFindVenueByName = (venues, venueName) => {
  const [selectedVenue, setSelectedVenue] = useState(venues[0])

  useEffect(() => {
    setSelectedVenue(venues?.find((venue) => venue.name === venueName))
  }, [venueName, venues])

  return {
    selectedVenue
  }
}
