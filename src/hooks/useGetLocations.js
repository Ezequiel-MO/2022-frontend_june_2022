import { useEffect, useState } from 'react'
import baseAPI from '../axios/axiosConfig'

export const useGetLocations = () => {
  const [locations, setLocations] = useState([])
  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await baseAPI.get('locations')
        setLocations(response.data.data.data)
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
