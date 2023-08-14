import { useState, useEffect } from 'react'
import {
  useCurrentProject,
  useGetEventCosts,
  useGetMealsCost,
  useGetMeetingsCost,
  useGetTransferCosts
} from '../../../hooks'

export const usePartialCostsData = () => {
  const {
    currentHotel,
    currentProject: { nrPax }
  } = useCurrentProject()
  const { meetingTotalCost = 0 } = useGetMeetingsCost()
  const { mealsTotalCost = 0 } = useGetMealsCost()
  const { eventsTotalCost = 0 } = useGetEventCosts()
  const { transfersTotalCost = 0 } = useGetTransferCosts()
  const [totalCostOfItems, setTotalCostOfItems] = useState(0)

  const data = {
    labels: ['Accommodation', 'Meetings', 'Transfers', 'Meals', 'Activities'],
    datasets: [
      {
        label: 'Budget Breakdown',
        data: [
          currentHotel?.totalCost,
          meetingTotalCost,
          transfersTotalCost,
          mealsTotalCost * nrPax,
          eventsTotalCost
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

  const costItems = [
    {
      icon: 'bx:hotel',
      title: 'ACCOMMODATION',
      cost: currentHotel?.totalCost
    },
    {
      icon: 'mdi:handshake-outline',
      title: 'MEETINGS',
      cost: meetingTotalCost
    },
    {
      icon: 'bx:bus',
      title: 'TRANSFERS',
      cost: transfersTotalCost
    },
    {
      icon: 'carbon:restaurant',
      title: 'MEAL FUNCTIONS',
      cost: mealsTotalCost
    },
    {
      icon: 'akar-icons:people-multiple',
      title: 'ACTIVITIES',
      cost: eventsTotalCost
    }
  ]

  useEffect(() => {
    const total = costItems.reduce((acc, item) => acc + (item.cost || 0), 0)
    setTotalCostOfItems(total)
  }, [
    currentHotel,
    meetingTotalCost,
    mealsTotalCost,
    eventsTotalCost,
    transfersTotalCost
  ])

  return {
    currentHotel,
    meetingTotalCost,
    mealsTotalCost,
    eventsTotalCost,
    transfersTotalCost,
    data,
    costItems,
    totalCostOfItems
  }
}
