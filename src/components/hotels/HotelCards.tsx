import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import RenderPhotos from '../organisms/RenderPhotos'
import HotelIcons from './HotelIcons'
import { RichParagraph } from '../atoms/RichParagraph'
import { IHotel } from '../../interfaces'

interface Props {
  hotel: IHotel
}

export const HotelCards: React.FC<Props> = ({ hotel }) => {
  const [leftIconsText, setLeftIconsText] = useState<string[]>([])
  const [rightIconsText, setRightIconsText] = useState<string[]>([])

  useEffect(() => {
    const leftIconsTextObj = {
      address: hotel.address,
      restaurants: hotel.restaurants,
      numberRooms: hotel.numberRooms.toString(),
      wifiSpeed: hotel.wifiSpeed
    }

    const rightIconsTextObj = {
      swimmingPool: hotel.swimmingPool,
      checkin_out: hotel.checkin_out,
      meetingRooms: `${hotel.meetingRooms} meeting rooms`,
      wheelChairAccessible: `${hotel.wheelChairAccessible ? 'Yes' : 'No'}`
    }

    const leftIconsTextArr: string[] = Object.values(leftIconsTextObj)
    const rightIconsTextArr: string[] = Object.values(rightIconsTextObj)

    setLeftIconsText(leftIconsTextArr)
    setRightIconsText(rightIconsTextArr)
  }, [hotel])

  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <h2 className='font-bold'>{hotel.name}</h2>
        <Rating readOnly value={hotel.numberStars} />
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
