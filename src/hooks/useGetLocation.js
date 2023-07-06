import { useFindByName } from './useFindByName'
import { useGetLocations } from './useGetLocations'

export const useGetLocation = (locationName = 'Barcelona') => {
  console.log('useGetLocation', locationName)
  const { locations } = useGetLocations()

  const { selectedOption, loading } =
    locations && useFindByName(locations, locationName)
  console.log('selectedOption', selectedOption)
  return {
    selectedOption,
    loading
  }
}
