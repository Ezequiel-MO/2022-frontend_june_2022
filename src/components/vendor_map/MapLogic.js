import { useMemo } from 'react'
import { useCurrentProject } from '../../hooks'
import {
  city_icon,
  event_icon,
  hotel_icon,
  restaurant_icon
} from './icons/icons'

const MAX_DISTANCE = 10 // Maximum distance in kilometers from the central coordinates

function getDistanceFromCentralCoords(lat, lng, centralCoords) {
  const R = 6371 // Earth's radius in km
  const lat1 = toRadians(centralCoords.lat)
  const lat2 = toRadians(lat)
  const dLat = toRadians(lat - centralCoords.lat)
  const dLng = toRadians(lng - centralCoords.lng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return distance > MAX_DISTANCE ? null : distance
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

export const VendorMapLogic = () => {
  const { currentProject } = useCurrentProject()
  const { hotels, schedule, groupLocation } = currentProject

  const centralCoords = useMemo(() => {
    let locationCoords =
      groupLocation === 'Barcelona'
        ? [41.385331792, 2.168665992]
        : groupLocation === 'Alicante'
        ? [38.345996, -0.490685]
        : [40.4167754, -3.7037902]
    return {
      place: groupLocation,
      icon: city_icon,
      coords: {
        lat: locationCoords[0],
        lng: locationCoords[1]
      }
    }
  }, [groupLocation])

  const hotelCoords = useMemo(() => {
    return hotels?.map((hotel) => {
      const distance = getDistanceFromCentralCoords(
        hotel.location.coordinates[0],
        hotel.location.coordinates[1],
        centralCoords.coords
      )
      return {
        place: hotel.name,
        icon: hotel_icon,
        coords: {
          lat: hotel.location.coordinates[0],
          lng: hotel.location.coordinates[1]
        },
        distance
      }
    })
  }, [hotels, centralCoords])

  const scheduleCoords = useMemo(() => {
    let coords = []
    schedule.forEach((day) => {
      day.morningEvents?.forEach((event) => {
        day.morningEvents?.forEach((event) => {
          if (
            !event.name.includes('meeting') &&
            !event.name.includes('Meeting')
          ) {
            const distance = getDistanceFromCentralCoords(
              event.location.coordinates[0],
              event.location.coordinates[1],
              centralCoords.coords
            )
            coords.push({
              place: event.name,
              icon: event_icon,
              coords: {
                lat: event.location.coordinates[0],
                lng: event.location.coordinates[1]
              },
              distance
            })
          }
        })
      })
      day.lunch?.forEach((restaurant) => {
        const distance = getDistanceFromCentralCoords(
          restaurant.location.coordinates[0],
          restaurant.location.coordinates[1],
          centralCoords.coords
        )
        coords.push({
          place: restaurant.name,
          icon: restaurant_icon,
          coords: {
            lat: restaurant.location.coordinates[0],
            lng: restaurant.location.coordinates[1]
          },
          distance
        })
      })
      day.afternoonEvents?.forEach((event) => {
        if (
          !event.name.includes('meeting') &&
          !event.name.includes('Meeting')
        ) {
          const distance = getDistanceFromCentralCoords(
            event.location.coordinates[0],
            event.location.coordinates[1],
            centralCoords.coords
          )
          coords.push({
            place: event.name,
            icon: event_icon,
            coords: {
              lat: event.location.coordinates[0],
              lng: event.location.coordinates[1]
            },
            distance
          })
        }
      })
      day.dinner?.forEach((restaurant) => {
        const distance = getDistanceFromCentralCoords(
          restaurant.location.coordinates[0],
          restaurant.location.coordinates[1],
          centralCoords.coords
        )
        coords.push({
          place: restaurant.name,
          icon: restaurant_icon,
          coords: {
            lat: restaurant.location.coordinates[0],
            lng: restaurant.location.coordinates[1]
          },
          distance
        })
      })
    })

    return coords
  }, [schedule])

  return {
    centralCoords,
    hotelCoords,
    scheduleCoords
  }
}
