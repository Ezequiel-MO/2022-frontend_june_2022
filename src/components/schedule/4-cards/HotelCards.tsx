import React, { useEffect, useState } from 'react'
import RenderPhotos from '../../organisms/RenderPhotos'
import HotelIcons from './HotelIcons'
import { RichParagraph } from '../../atoms/RichParagraph'
import { IHotel } from '../../../interfaces'

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

  const renderStars = (numberStars: number) => {
    return (
      <div className='flex'>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`mr-1 ${
              index < numberStars ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className='flex flex-col rounded-lg shadow-lg mb-4'>
      <div className='flex items-center mb-4'>
        <h2 className='font-bold text-lg mr-2'>{hotel.name}</h2>
        {renderStars(hotel.numberStars)}
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
