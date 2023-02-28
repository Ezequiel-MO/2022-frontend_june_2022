import { useFindByName } from './useFindByName'
import { useGetLocations } from './useGetLocations'

export const useGetLocation = (locationName = 'Barcelona') => {
  const { locations } = useGetLocations()

  const { selectedOption } = locations && useFindByName(locations, locationName)
  return {
    selectedOption
  }
}
