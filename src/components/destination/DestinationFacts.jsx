import { Icon } from '@iconify/react'

export const DestinationFacts = () => {
  const facts = [
    { title: 'Population', value: '1.6 million' },
    { title: 'Languages', value: 'Catalan, Spanish' },
    { title: 'Currency', value: 'Euro (€)' }
    // Add more facts as needed
  ]

  return (
    <div className='w-full p-4'>
      <h3 className='text-2xl font-bold'>
        <Icon icon='raphael:list' className='w-6 h-6 inline-block' />
        <span className='ml-2'>Interesting Facts</span>
      </h3>
      <ul className='mt-4 space-y-2 text-gray-800'>
        {facts.map((fact, index) => (
          <li key={index} className='flex items-center space-x-2'>
            <Icon
              icon='material-symbols:check-box'
              className='w-4 h-4 dark:text-white-0 text-black-50'
            />
            <span className='dark:text-white-0 text-black-50'>
              <strong>{fact.title}:</strong> {fact.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
