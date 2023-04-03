import { useBudget, useCurrentProject, useFindByName } from '../../../../hooks'
import { HotelTotalCost } from './'

export const HotelTotalCostContainer = () => {
  const { hotelName, hotels } = useBudget()
  const { setCurrentHotel } = useCurrentProject()

  const hotel_name = hotelName || hotels[0].name

  const { selectedOption: selectedHotel } = useFindByName(hotels, hotel_name)

  setCurrentHotel(selectedHotel)

  return <HotelTotalCost selectedHotel={selectedHotel} />
}
