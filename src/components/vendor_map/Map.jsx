import { useMemo, useState, useEffect, useCallback } from 'react'
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { VendorList } from './VendorList'
import { VendorMapLogic } from './MapLogic'
import './map.css'

export const VendorMap = () => {
  const { hotelCoords, centralCoords, scheduleCoords } = VendorMapLogic()

  const [zoom, setZoom] = useState(14)
  const [map, setMap] = useState(null)
  const [location, setLocation] = useState(centralCoords)
  const [showAllVendors, setShowAllVendors] = useState(true)
  const [clickedVendor, setClickedVendor] = useState(null)

  const vendors = useMemo(() => {
    if (showAllVendors || clickedVendor?.distance !== null) {
      return [centralCoords, hotelCoords, scheduleCoords].flat()
    } else {
      return [centralCoords, clickedVendor]
    }
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
      setZoom(map.getZoom())
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
    (map) => {
      map.fitBounds(bounds)
      setMap(map)
    },
    [bounds]
  )

  const onZoomChanged = useCallback(() => {
    if (map) {
      setZoom(map.getZoom())
    }
  }, [map])

  const handleVendorClick = (vendor) => {
    setClickedVendor(vendor)
    setLocation({
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
