import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'
import { IEvent } from '../interfaces'
import { useCurrentProject } from './useCurrentProject'

export const useGetEventCosts = () => {
  const {
    currentProject: { nrPax }
  } = useCurrentProject()

  const { events } = useBudget() as {
    events: Record<string, { morningEvents?: IEvent; afternoonEvents?: IEvent }>
  }

  const [eventsTotalCost, setEventsTotalCost] = useState<number>(0)

  const calculateEventCost = (event?: IEvent) => {
    if (!event) return 0
    return event.pricePerPerson ? (event.price || 0) * nrPax : event.price || 0
  }

  useEffect(() => {
    const totalCost = Object.values(events).reduce((acc, eventGroup) => {
      return (
        acc +
        calculateEventCost(eventGroup.morningEvents) +
        calculateEventCost(eventGroup.afternoonEvents)
      )
    }, 0)

    setEventsTotalCost(totalCost)
  }, [events])

  return {
    eventsTotalCost
  }
}
