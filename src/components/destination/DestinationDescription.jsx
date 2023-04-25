import { Icon } from '@iconify/react'

export const DestinationDescription = () => {
  return (
    <div className='w-full p-4'>
      <h3 className='text-2xl font-bold'>
        <Icon icon='raphael:raphael' className='w-6 h-6 inline-block' />
        <span className='ml-2'>Barcelona Overview</span>
      </h3>
      <p className='mt-4 text-gray-800 dark:text-white-100'>
        Barcelona is a vibrant and diverse city located on the northeast coast
        of Spain. Known for its rich history, stunning architecture, and vibrant
        cultural scene, Barcelona offers a unique experience for corporate
        events.
      </p>
      {/* Add more content as needed */}
    </div>
  )
}
