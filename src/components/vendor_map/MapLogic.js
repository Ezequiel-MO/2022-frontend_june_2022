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
    return {
      place: groupLocation,
      icon: city_icon,
      coords: {
        lat: 41.385331792,
        lng: 2.168665992
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
