import { useState, useEffect } from 'react'
import baseAPI from '../axios/axiosConfig'

const useGetHotel = (hotelId) => {
  const [hotel, setHotel] = useState({})
  useEffect(() => {
    const getHotelData = async () => {
      try {
        const response = await baseAPI.get(`v1/hotels/${hotelId}`)
        setHotel(response.data.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getHotelData()
  }, [hotelId])

  return {
    hotel
  }
}

export default useGetHotel
