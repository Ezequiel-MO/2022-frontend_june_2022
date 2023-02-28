import { useMemo } from 'react'
import { useCurrentProject } from '../../hooks'
import {
  city_icon,
  event_icon,
  hotel_icon,
  restaurant_icon
} from './icons/icons'

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
      return {
        place: hotel.name,
        icon: hotel_icon,
        coords: {
          lat: hotel.location.coordinates[0],
          lng: hotel.location.coordinates[1]
        }
      }
    })
  }, [hotels])

  const scheduleCoords = useMemo(() => {
    let coords = []
    schedule.forEach((day) => {
      day.morningEvents?.forEach((event) => {
        coords.push({
          place: event.name,
          icon: event_icon,
          coords: {
            lat: event.location.coordinates[0],
            lng: event.location.coordinates[1]
          }
        })
      })
      day.lunch?.forEach((restaurant) => {
        coords.push({
          place: restaurant.name,
          icon: restaurant_icon,
          coords: {
            lat: restaurant.location.coordinates[0],
            lng: restaurant.location.coordinates[1]
          }
        })
      })
      day.afternoonEvents?.forEach((event) => {
        coords.push({
          place: event.name,
          icon: event_icon,
          coords: {
            lat: event.location.coordinates[0],
            lng: event.location.coordinates[1]
          }
        })
      })
      day.dinner?.forEach((restaurant) => {
        coords.push({
          place: restaurant.name,
          icon: restaurant_icon,
          coords: {
            lat: restaurant.location.coordinates[0],
            lng: restaurant.location.coordinates[1]
          }
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
