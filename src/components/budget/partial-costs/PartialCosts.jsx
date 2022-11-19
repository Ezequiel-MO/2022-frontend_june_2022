import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Icon } from '@iconify/react'
import { accounting } from 'accounting'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import useGetMeetingsCost from '../../../hooks/useGetMeetingsCost'
import useGetMealsCost from '../../../hooks/useGetMealCosts'

const PartialCosts = () => {
  const { currentHotel } = useCurrentProject()
  const { meetingTotalCost = 0 } = useGetMeetingsCost()
  const { mealsTotalCost = 0 } = useGetMealsCost()

  ChartJS.register(ArcElement, Tooltip, Legend)

  const data = {
    labels: ['Accommodation', 'Meetings', 'Transfers', 'Meals', 'Activities'],
    datasets: [
      {
        label: 'Budget Breakdown',
        data: [
          currentHotel?.totalCost,
          meetingTotalCost,
          35,
          mealsTotalCost,
          56
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(89, 90, 200, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(89, 90, 200, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='flex flex-row items-center justify-center'>
      <div className='mt-10 w-2/3'>
        <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
          <Icon
            icon='bx:hotel'
            color='#ea5933'
            width='30'
            className='flex-shrink-0'
          />
          <p className='hidden sm:block'> ACCOMMODATION </p>

          {accounting.formatMoney(currentHotel?.totalCost, '€')}
        </div>
        <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
          <Icon
            icon='mdi:handshake-outline'
            color='#ea5933'
            width='30'
            className='flex-shrink-0'
          />
          <p className='hidden sm:block'> MEETINGS </p>

          {accounting.formatMoney(meetingTotalCost, '€')}
        </div>
        <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
          <Icon
            icon='bx:bus'
            color='#ea5933'
            width='30'
            className='flex-shrink-0'
          />
          <p className='hidden sm:block'>TRANSFERS </p>
          {accounting.formatMoney(87, '€')}
        </div>
        <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
          <Icon
            icon='carbon:restaurant'
            color='#ea5933'
            width='30'
            className='flex-shrink-0'
          />
          <p className='hidden sm:block'>MEAL FUNCTIONS</p>
          {accounting.formatMoney(mealsTotalCost, '€')}
        </div>
        <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
          <Icon
            icon='akar-icons:people-multiple'
            color='#ea5933'
            width='30'
            className='flex-shrink-0'
          />
          <p className='hidden sm:block'>ACTIVITIES </p>
          {accounting.formatMoney(89, '€')}
        </div>
      </div>
      <div className='w-1/3 hidden md:flex md:justify-center md:items-center'>
        <Doughnut data={data} className='flex-shrink-0' />
      </div>
    </div>
  )
}

export default PartialCosts
