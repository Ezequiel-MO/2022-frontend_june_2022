import { useEffect, useState } from 'react'
import baseAPI from '../axios/axiosConfig'
import { ILocation } from '../interfaces/location'

export const useGetLocations = () => {
  const [locations, setLocations] = useState<ILocation[]>([])

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await baseAPI.get('locations')
        setLocations(response.data.data.data as ILocation[])
      } catch (error) {
        console.log(error)
      }
    }

    getLocations()
  }, [])

  return {
    locations
  }
}
