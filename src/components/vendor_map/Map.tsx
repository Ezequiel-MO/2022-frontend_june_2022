import { useMemo, useState, useEffect, useCallback } from 'react'
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { VendorList } from './VendorList'
import { CoordItem, VendorMapLogic } from './MapLogic'
import './map.css'
import { filterUniqueCoordinates } from '../../helpers'

export const VendorMap: React.FC = () => {
  const { hotelCoords, centralCoords, scheduleCoords } = VendorMapLogic()

  const [zoom, setZoom] = useState<number>(14)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [location, setLocation] = useState<CoordItem>(centralCoords)
  const [showAllVendors, setShowAllVendors] = useState<boolean>(true)
  const [clickedVendor, setClickedVendor] = useState<CoordItem | null>(null)

  const vendors: CoordItem[] = useMemo(() => {
    const allVendors =
      showAllVendors || clickedVendor?.distance !== null
        ? [centralCoords, hotelCoords, scheduleCoords].flat()
        : [centralCoords, clickedVendor]

    return filterUniqueCoordinates(allVendors)
  }, [
    centralCoords,
    hotelCoords,
    scheduleCoords,
    showAllVendors,
    clickedVendor
  ])

  const bounds = useMemo(() => {
    const bounds = new google.maps.LatLngBounds()
    vendors
      .filter((vendor) => vendor.distance !== null)
      .forEach((vendor) => {
        bounds.extend(vendor.coords)
      })
    return bounds
  }, [vendors])

  useEffect(() => {
    if (map) {
      const newBounds = new google.maps.LatLngBounds()
      if (location.distance === null) {
        vendors.forEach((vendor) => {
          newBounds.extend(vendor.coords)
        })
      } else {
        newBounds.extend(location.coords)
        vendors.forEach((vendor) => {
          if (vendor.distance !== null) {
            newBounds.extend(vendor.coords)
          }
        })
      }
      map.fitBounds(newBounds)
      const newZoom = map.getZoom()
      if (typeof newZoom !== 'undefined') {
        setZoom(newZoom)
      }
    }
  }, [location, vendors, map])

  const options = useMemo(
    () => ({
      mapId: '37537533e1cc90',
      center: centralCoords.coords,
      controlSize: 25,
      disableDefaultUI: false,
      clickableIcons: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      rotateControl: false,
      fullscreenControl: true
    }),
    [centralCoords]
  )

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      map.fitBounds(bounds)
      setMap(map)
    },
    [bounds]
  )

  const onZoomChanged = useCallback(() => {
    if (map) {
      const newZoom = map.getZoom()
      if (newZoom !== undefined) {
        setZoom(newZoom)
      }
    }
  }, [map])

  const handleVendorClick = (vendor: CoordItem) => {
    setClickedVendor(vendor)
    setLocation({
      ...vendor,
      place: vendor.place,
      coords: vendor.coords
    })
    setShowAllVendors(false)
  }

  const handleShowAllVendors = () => {
    setShowAllVendors(true)
    setClickedVendor(null)
  }

  return (
    <div className='flex w-full h-full relative'>
      <VendorList
        vendors={vendors}
        setLocation={setLocation}
        onVendorClick={handleVendorClick}
        onShowAllVendors={handleShowAllVendors}
      />
      <div className='map'>
        <GoogleMap
          onLoad={onLoad}
          zoom={zoom}
          onZoomChanged={onZoomChanged}
          options={options}
          mapContainerStyle={{
            width: '100%',
            height: '97%'
          }}
        >
          {
            <InfoWindowF
              position={location.coords}
              options={{ pixelOffset: new google.maps.Size(0, -40) }}
            >
              <div className='bg-white rounded-lg shadow-md p-4'>
                <h3 className='text-lg font-bold mb-2'>{location.place}</h3>
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
                    ...vendor.icon,
                    anchor: new google.maps.Point(15, 30)
                  })
                }}
                onClick={() => {
                  setLocation({
                    ...vendor,
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
