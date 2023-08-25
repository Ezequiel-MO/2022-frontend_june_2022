import { useState, useEffect } from 'react'
import { Rating } from '@mui/material'
import RenderPhotos from '../organisms/RenderPhotos'
import HotelIcons from './HotelIcons'
import { RichParagraph } from '../atoms/RichParagraph'

const HotelCards = ({ hotel }) => {
  const [stars] = useState(hotel.numberStars)
  const [leftIconsText, setLeftIconsText] = useState([])
  const [rightIconsText, setRightIconsText] = useState([])

  useEffect(() => {
    const leftIconsTextObj = {
      address: hotel.address,
      restaurants: hotel.restaurants,
      numberRooms: hotel.numberRooms,
      wifiSpeed: hotel.wifiSpeed
    }

    const rightIconsTextObj = {
      swimmingPool: hotel.swimmingPool,
      checkin_out: hotel.checkin_out,
      meetingRooms: `${hotel.meetingRooms} meeting rooms`,
      wheelChairAccessible: `${hotel.wheelChairAccessible ? 'Yes' : 'No'}`
    }

    const leftIconsTextArr = Object.values(leftIconsTextObj)
    setLeftIconsText(leftIconsTextArr)
    const rightIconsTextArr = Object.values(rightIconsTextObj)
    setRightIconsText(rightIconsTextArr)
  }, [hotel])

  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <h2 className='font-bold'>{hotel.name}</h2>
        <Rating readOnly value={stars} />
      </div>
      <RichParagraph text={hotel.textContent} />
      <RenderPhotos images={hotel.imageContentUrl} />
      <HotelIcons
        leftIconsText={leftIconsText}
        rightIconsText={rightIconsText}
      />
    </div>
  )
}

export default HotelCards
