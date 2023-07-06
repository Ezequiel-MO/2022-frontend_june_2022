import { Icon } from '@iconify/react'
import { useEffect } from 'react'

export const DestinationDescription = ({ locationObject }) => {
  const { textContent } = locationObject || {}

  useEffect(() => {
    if (textContent)
      console.log('DestinationDescription textContent', textContent)
  }, [textContent])

  return (
    <div className='w-full p-4 flex flex-col'>
      <h3 className='text-2xl font-bold'>
        <Icon icon='raphael:raphael' className='w-6 h-6 inline-block' />
        <span className='ml-2'>Barcelona Overview</span>
      </h3>
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-1'>
        <div className='mt-4 text-white-100 sm:text-xl'>
          <p className='pl-8 italic font-bold indent-2'>
            Welcome to{' '}
            <span className='font-bold uppercase text-red-500'>Barcelona</span>,
            a city that effortlessly blends the historic with the contemporary,
            creating a vibrant backdrop for any corporate event. As one of the
            world's leading tourist, economic, and cultural centers, Barcelona
            offers a unique blend of rich history, stunning architecture, and
            modern facilities.
          </p>
          <p className='pl-8 italic font-bold indent-2'>
            The city is home to several world-class conference centers and
            hotels equipped with state-of-the-art facilities to cater to events
            of all sizes. From the grandeur of the Barcelona International
            Convention Centre to the modernist charm of Casa Llotja de Mar,
            there's a venue to suit every corporate event.
          </p>
        </div>
        <div className='mt-4 sm:text-xl'>
          <p className='pl-8 italic font-bold indent-2'>
            Barcelona's excellent connectivity, with an international airport
            and high-speed rail links, makes it easily accessible for attendees
            from around the globe. The city's diverse culinary scene, vibrant
            nightlife, and iconic landmarks like Sagrada Familia and Park Güell
            offer ample opportunities for relaxation and entertainment
            post-event.
          </p>
          <p className='pl-8 italic font-bold indent-2'>
            Moreover, Barcelona's commitment to innovation and sustainability
            makes it an ideal choice for companies looking to host eco-friendly
            and forward-thinking events. With its mix of Mediterranean charm,
            world-class facilities, and a strong business ecosystem, Barcelona
            is the perfect destination for your next corporate event.
          </p>
        </div>
      </div>
    </div>
  )
}
