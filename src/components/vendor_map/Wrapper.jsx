import { useLoadScript } from '@react-google-maps/api'
import Spinner from '../../ui/spinner/Spinner'

import { VendorMap } from './Map'

export const MapWrapper = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  if (!isLoaded) return <Spinner />
  return <VendorMap />
}
