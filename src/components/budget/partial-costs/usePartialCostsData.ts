import { useState, useEffect, useMemo } from 'react'
import {
  useBudget,
  useGetEventCosts,
  useGetMealsCost,
  useGetMeetingsCost,
  useGetShowCost,
  useGetVenuesCost
} from '../../../hooks'
import { IGift } from '../../../interfaces'
import { TranslationKeys } from '../../../interfaces/translations'
import { useContextBudget } from '../context/BudgetContext'

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
  currentGift: IGift
  meetingTotalCost: number
  eventsTotalCost: number
  giftTotalCost: number
  data: IData
  costItems: any[]
  totalCostOfItems: number
}

export const usePartialCostsData = (): PartialCostsDataReturn => {
  const { state } = useContextBudget()
  const { currentGift } = useBudget() || ({} as { currentGift: IGift })
  const { meetingTotalCost = 0 } = useGetMeetingsCost()
  const { mealsTotalCost = 0 } = useGetMealsCost()
  const { venuesTotalCost = 0 } = useGetVenuesCost()
  const { eventsTotalCost = 0 } = useGetEventCosts()
  const { showTotalCost = 0 } = useGetShowCost()
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
      'Gifts',
      'Show Costs'
    ],
    datasets: [
      {
        label: 'Budget Breakdown',
        data: [
          state.selectedHotelCost,
          meetingTotalCost,
          state.transfersInCost +
            state.transfersOutCost +
            state.programTransfersCost,
          state.mealsCost,
          state.activitiesCost,
          venuesTotalCost,
          giftTotalCost,
          showTotalCost
        ],
        backgroundColor: [
          'rgba(255, 87, 34, 0.2)',
          'rgba(33, 150, 243, 0.2)',
          'rgba(139, 195, 74, 0.2)',
          'rgba(233, 30, 99, 0.2)',
          'rgba(255, 193, 7, 0.2)',
          'rgba(3, 169, 244, 0.2)',
          'rgba(121, 85, 72, 0.2)',
          'rgba(96, 125, 139, 0.2)'
        ],
        borderColor: [
          'rgba(255, 87, 34, 1)',
          'rgba(33, 150, 243, 1)',
          'rgba(139, 195, 74, 1)',
          'rgba(233, 30, 99, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(3, 169, 244, 1)',
          'rgba(121, 85, 72, 1)',
          'rgba(96, 125, 139, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const costItems: ICostItem[] = [
    {
      icon: 'bx:hotel',
      title: 'ACCOMMODATION',
      cost: state.selectedHotelCost
    },
    {
      icon: 'mdi:handshake-outline',
      title: 'MEETINGS',
      cost: meetingTotalCost
    },
    {
      icon: 'bx:bus',
      title: 'TRANSFERS',
      cost:
        state.transfersInCost +
        state.transfersOutCost +
        state.programTransfersCost
    },
    {
      icon: 'carbon:restaurant',
      title: 'MEAL FUNCTIONS',
      cost: state.mealsCost
    },
    {
      icon: 'ph:castle-turret-light',
      title: 'VENUES',
      cost: venuesTotalCost
    },
    {
      icon: 'akar-icons:people-multiple',
      title: 'ACTIVITIES',
      cost: state.activitiesCost
    },
    {
      icon: 'mdi:gift-outline',
      title: 'GIFTS',
      cost: giftTotalCost
    },
    {
      icon: 'codicon:mic',
      title: 'ENTERTAINMENT',
      cost: showTotalCost
    }
  ]

  useEffect(() => {
    const total = costItems.reduce((acc, item) => acc + (item.cost || 0), 0)
    setTotalCostOfItems(total)
  }, [
    state.selectedHotelCost,
    meetingTotalCost,
    mealsTotalCost,
    eventsTotalCost,
    state.transfersInCost,
    state.transfersOutCost,
    state.programTransfersCost,
    giftTotalCost,
    showTotalCost
  ])

  return {
    currentGift,
    meetingTotalCost,
    eventsTotalCost,
    giftTotalCost,
    data,
    costItems,
    totalCostOfItems
  }
}
