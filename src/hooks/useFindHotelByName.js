import { useState, useEffect } from 'react'

export const useFindHotelByName = (hotelName, hotels) => {
  const [selectedHotel, setSelectedHotel] = useState(hotels[0])

  useEffect(() => {
    if (hotelName) {
      const selectedHotel = hotels?.find((hotel) => hotel.name === hotelName)
      setSelectedHotel(selectedHotel)
    }
  }, [hotelName, hotels])

  return {
    selectedHotel
  }
}
