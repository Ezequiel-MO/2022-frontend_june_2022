import { useState, useEffect } from 'react'
import baseAPI from '../axios/axiosConfig'
import { IHotel } from '../interfaces'

interface IError {
  message: string
  code?: string
}

export const useGetHotel = (hotelId: string) => {
  const [hotel, setHotel] = useState<IHotel | null>(null)
  const [error, setError] = useState<IError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getHotelData = async () => {
      setIsLoading(true)
      try {
        const response = await baseAPI.get(`/hotels/${hotelId}`)
        setHotel(response.data.data.data as IHotel)
        setError(null)
      } catch (error) {
        setError(error as IError)
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
