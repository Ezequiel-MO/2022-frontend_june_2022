import { useMemo, useState, useEffect, useCallback } from 'react'
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { VendorList } from './VendorList'
import './Map.css'
import { hotel_icon } from './icons/icons'

export const VendorMap = () => {
  const [zoom, setZoom] = useState(14)
  const [map, setMap] = useState()
  const [location, setLocation] = useState({
    place: 'Valencia City Center',
    coords: {
      lat: 39.4697065,
      lng: -0.3763353
    }
  })

  const centralLocation = useMemo(
    () => ({
      place: 'Valencia City Center',
      coords: {
        lat: 39.4697065,
        lng: -0.3763353
      }
    }),
    []
  )

  const CACLocation = useMemo(
    () => ({
      place: 'City of Arts & Sciences',
      coords: { lat: 39.4527148558, lng: -0.35021693246 }
    }),
    []
  )

  const CampoAnibalLocation = useMemo(
    () => ({
      place: 'Campo Anibal',
      coords: { lat: 39.5887, lng: -0.3033 }
    }),

    []
  )

  const vendors = [centralLocation, CACLocation, CampoAnibalLocation]

  const bounds = useMemo(() => {
    const bounds = new google.maps.LatLngBounds()
    vendors.forEach((vendor) => {
      bounds.extend(vendor.coords)
    })
    return bounds
  }, [])

  useEffect(() => {
    //whenever location, bounds or zoom change, fit map to bounds and transtion smoothly to new zoom
    if (map) {
      map.fitBounds(bounds)
      setMap(map)
    }
  }, [location, bounds, zoom])

  const options = useMemo(() => ({
    mapId: '37537533e1cc90',
    center: location.coords,
    controlSize: 25,
    disableDefaultUI: false,
    clickableIcons: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    rotateControl: false,
    fullscreenControl: true
  }))

  const onLoad = useCallback((map) => {
    map.fitBounds(bounds)
    return setMap(map)
  }, [])

  return (
    <div className='flex w-full h-full relative'>
      <VendorList vendors={vendors} setLocation={setLocation} />
      <div className='map'>
        <GoogleMap
          onLoad={onLoad}
          zoom={zoom}
          onBoundsChanged={() => {
            setZoom(map?.getZoom())
          }}
          options={options}
          mapContainerStyle={{
            width: '100%',
            height: '95%'
          }}
        >
          {
            <InfoWindowF
              position={location.coords}
              options={{ pixelOffset: new google.maps.Size(0, -40) }}
            >
              <div className='text-center italic p-5 font-bold text-lg'>
                <h3>{location.place}</h3>
              </div>
            </InfoWindowF>
          }
          {vendors.map((vendor, index) => {
            return (
              <MarkerF
                key={index}
                position={vendor.coords}
                title={vendor.place}
                onLoad={(marker) => {
                  marker.setIcon({
                    ...hotel_icon,
                    anchor: new google.maps.Point(15, 30)
                  })
                }}
                onClick={() => {
                  setLocation({
                    place: vendor.place,
                    coords: vendor.coords
                  })
                }}
              />
            )
          })}
        </GoogleMap>
      </div>
    </div>
  )
}
