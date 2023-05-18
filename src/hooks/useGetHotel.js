import { useState, useEffect } from 'react'
import baseAPI from '../axios/axiosConfig'

export const useGetHotel = (hotelId) => {
  const [hotel, setHotel] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getHotelData = async () => {
      setIsLoading(true)
      try {
        const response = await baseAPI.get(`/hotels/${hotelId}`)
        setHotel(response.data.data.data)
        setError(null)
      } catch (error) {
        setError(error)
        setHotel(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (hotelId) {
      getHotelData()
    }
  }, [hotelId])

  return {
    hotel,
    error,
    isLoading
  }
}
