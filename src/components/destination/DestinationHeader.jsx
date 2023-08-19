import { Icon } from '@iconify/react'

export const DestinationHeader = ({ groupLocation }) => {
  return (
    <div className='w-full my-2 p-4 bg-gradient-to-r from-blue-800 to-red-700 text-white'>
      <h2 className='text-3xl font-bold'>{groupLocation}</h2>
      <div className='flex items-center mt-2'>
        <Icon icon='mdi:map-marker' className='w-6 h-6' />
        <span className='ml-2'>Corporate Events Destination</span>
      </div>
    </div>
  )
}
