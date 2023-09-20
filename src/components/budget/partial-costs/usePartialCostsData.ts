import { useState, useEffect, useMemo } from 'react'
import {
  useBudget,
  useCurrentProject,
  useGetEventCosts,
  useGetMealsCost,
  useGetMeetingsCost,
  useGetTransferCosts,
  useGetVenuesCost
} from '../../../hooks'
import { IGift, IHotel } from '../../../interfaces'
import { TranslationKeys } from '../../../interfaces/translations'

export interface ICostItem {
  icon: string
  title: TranslationKeys
  cost?: number
}

interface IData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}

interface PartialCostsDataReturn {
  currentHotel: IHotel
  currentGift: IGift
  meetingTotalCost: number
  mealsTotalCost: number
  eventsTotalCost: number
  transfersTotalCost: number
  giftTotalCost: number
  data: IData
  costItems: any[]
  totalCostOfItems: number
}

export const usePartialCostsData = (): PartialCostsDataReturn => {
  const { currentHotel } = useCurrentProject()
  const { currentGift } = useBudget() || ({} as { currentGift: IGift })
  const { meetingTotalCost = 0 } = useGetMeetingsCost()
  const { mealsTotalCost = 0 } = useGetMealsCost()
  const { venuesTotalCost = 0 } = useGetVenuesCost()
  const { eventsTotalCost = 0 } = useGetEventCosts()
  const { transfersTotalCost = 0 } = useGetTransferCosts()
  const [totalCostOfItems, setTotalCostOfItems] = useState<number>(0)

  const giftTotalCost = useMemo(() => {
    return currentGift?.qty * currentGift?.price || 0
  }, [currentGift])

  const data: IData = {
    labels: [
      'Accommodation',
      'Meetings',
      'Transfers',
      'Meals',
      'Venue Costs',
      'Activities',
      'Gifts'
    ],
    datasets: [
      {
        label: 'Budget Breakdown',
        data: [
          currentHotel?.totalCost || 0,
          meetingTotalCost,
          transfersTotalCost,
          mealsTotalCost,
          eventsTotalCost,
          venuesTotalCost,
          giftTotalCost
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(189, 40, 210, 0.2)',
          'rgba(89, 90, 200, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(189, 40, 210, 1)',
          'rgba(89, 90, 200, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const costItems: ICostItem[] = [
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
      icon: 'ph:castle-turret-light',
      title: 'VENUES',
      cost: venuesTotalCost
    },
    {
      icon: 'akar-icons:people-multiple',
      title: 'ACTIVITIES',
      cost: eventsTotalCost
    },
    {
      icon: 'mdi:gift-outline',
      title: 'GIFTS',
      cost: giftTotalCost
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
    transfersTotalCost,
    giftTotalCost
  ])

  return {
    currentHotel,
    currentGift,
    meetingTotalCost,
    mealsTotalCost,
    eventsTotalCost,
    transfersTotalCost,
    giftTotalCost,
    data,
    costItems,
    totalCostOfItems
  }
}
