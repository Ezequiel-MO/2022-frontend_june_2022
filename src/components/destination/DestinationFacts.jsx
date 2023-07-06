import { Icon } from '@iconify/react'

export const DestinationFacts = () => {
  const facts = [
    { title: 'World Heritage Sites', value: '9 UNESCO World Heritage Sites' },
    { title: 'Beaches', value: '7 beaches, 4.5 km of coastline' },
    { title: 'Art and Culture', value: '55 museums' },
    { title: 'Parks', value: 'Over 60 parks, including Park Güell' },
    {
      title: 'Shopping',
      value: '35,000 shops, including luxury boutiques and local artisans'
    },
    { title: 'Cuisine', value: '20+ Michelin-starred restaurants' },
    {
      title: 'Sports',
      value: "Home to FC Barcelona, one of the world's top football clubs"
    },
    { title: 'Festivals', value: 'Year-round festivals and cultural events' },
    {
      title: 'Climate',
      value: 'Mild Mediterranean climate, over 300 days of sunshine per year'
    },
    {
      title: 'Nightlife',
      value:
        'Vibrant nightlife with numerous bars, clubs, and live music venues'
    }
  ]

  return (
    <div className='w-full p-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <h3 className='text-2xl font-bold col-span-full'>
        <Icon icon='raphael:list' className='w-6 h-6 inline-block' />
        <span className='ml-2'>Barcelona in Figures</span>
      </h3>
      {facts.map((fact, index) => (
        <div
          key={index}
          className='flex items-center space-x-2 p-4 border rounded-lg bg-gray-100 border-dashed dark:bg-gray-800'
        >
          <Icon
            icon='material-symbols:check-box'
            className='w-4 h-4 dark:text-white-0 text-black-50'
          />
          <span className='dark:text-white-0 text-black-50 text-lg'>
            <strong>{fact.title}:</strong> {fact.value}
          </span>
        </div>
      ))}
    </div>
  )
}
