import { FC, useEffect } from 'react'
import { useBudget, useCurrentProject, useFindByName } from '../../../../hooks'
import { HotelTotalCost } from '.'
import { IHotel } from '../../../../interfaces'

export const HotelTotalCostContainer: FC = () => {
  const { hotelName, hotels } = useBudget()
  const { setCurrentHotel } = useCurrentProject()

  const hotel_name = hotelName || (hotels.length > 0 ? hotels[0].name : '')

  const { selectedOption: selectedHotel } = useFindByName(hotels, hotel_name)

  useEffect(() => {
    if (selectedHotel && 'numberStars' in selectedHotel) {
      setCurrentHotel(selectedHotel as IHotel)
    }
  }, [selectedHotel, setCurrentHotel])

  return <HotelTotalCost selectedHotel={selectedHotel as IHotel} />
}
