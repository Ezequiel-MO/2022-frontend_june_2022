import * as interfaces from '../../interfaces'
import * as helpers from './helpers'
import { RenderedItem } from '.'

interface FilterMap {
  [key: string]: Set<string>
}

export const useScheduleFilter = (day: interfaces.IDay): RenderedItem[] => {
  const {
    date,
    morningEvents,
    morningMeetings,
    itinerary,
    lunch,
    afternoonEvents,
    afternoonMeetings,
    dinner,
    fullDayMeetings,
    overnight
  } = day

  const {
    isItineraryActive,
    isItineraryWithActivities,
    isItineraryWithMorningActivities,
    isItineraryWithAfternoonActivities,
    isItineraryWithLunch,
    isItineraryWithDinner
  } = helpers.analyzeItinerary(itinerary)

  const getTitleFilterMap = (): FilterMap => {
    return {
      'morning-morning': helpers.getMorningMorningTitles(
        isItineraryWithActivities
      ),
      'morning-afternoon': helpers.getMorningAfternoonTitles(
        isItineraryWithActivities,
        isItineraryWithLunch
      ),
      'morning-night': helpers.getMorningNightTitles(
        isItineraryWithActivities,
        isItineraryWithLunch,
        isItineraryWithDinner
      ),
      'afternoon-afternoon': helpers.getAfternoonAfternoonTitles(
        isItineraryWithActivities
      ),
      'afternoon-night': helpers.getAfternoonNightTitles(
        isItineraryWithActivities,
        isItineraryWithDinner
      ),
      'night-night': helpers.getNightNightTitles()
    }
  }

  const filterItemsBasedOnItinerary = (
    items: RenderedItem[]
  ): RenderedItem[] => {
    if (!isItineraryActive) {
      return items
    }

    const { starts, ends } = itinerary
    const timeKey = `${starts}-${ends}`
    const filterMap = getTitleFilterMap()
    const filteredTitles = filterMap[timeKey] || new Set<string>()

    return items.filter((item) => !filteredTitles.has(item.title))
  }

  const initialRenderedItems: RenderedItem[] = [
    {
      id: `${date}-morning-events`,
      title: 'Morning Events',
      events: isItineraryWithMorningActivities
        ? itinerary.activity
        : morningEvents
    },
    {
      id: `${date}-morning-meetings`,
      title: 'Morning Meeting',
      events: morningMeetings,
      timing: 'Morning'
    },
    {
      id: `${date}-lunch`,
      title: 'Lunch',
      events: isItineraryWithLunch ? itinerary.lunch : lunch
    },
    {
      id: `${date}-afternoon-events`,
      title: 'Afternoon Events',
      events: isItineraryWithAfternoonActivities
        ? itinerary.activity
        : afternoonEvents
    },
    {
      id: `${date}-afternoon-meetings`,
      title: 'Afternoon Meeting',
      events: afternoonMeetings,
      timing: 'Afternoon'
    },
    {
      id: `${date}-dinner`,
      title: 'Dinner',
      events: isItineraryWithDinner ? itinerary.dinner : dinner
    },
    {
      id: `${date}-fullday-meetings`,
      title: 'Full Day Meeting',
      events: fullDayMeetings,
      timing: 'Full Day'
    },
    {
      id: `${date}-overnight`,
      title: 'Overnight',
      events: overnight
    }
  ]

  let updatedRenderedItems = [...initialRenderedItems]

  if (isItineraryActive) {
    const itineraryItem: RenderedItem = {
      id: `${date}-itinerary`,
      title: 'Itinerary',
      events: { ...itinerary }
    }

    switch (itinerary.starts) {
      case 'morning':
        updatedRenderedItems = [itineraryItem, ...updatedRenderedItems]
        break
      case 'afternoon':
        const lunchIndex = updatedRenderedItems.findIndex(
          (item) => item.title === 'Lunch'
        )
        updatedRenderedItems = [
          ...updatedRenderedItems.slice(0, lunchIndex + 1),
          itineraryItem,
          ...updatedRenderedItems.slice(lunchIndex + 1)
        ]
        break
      case 'night':
        updatedRenderedItems = [...updatedRenderedItems, itineraryItem]
        break
      default:
        break
    }
  }

  return filterItemsBasedOnItinerary(updatedRenderedItems)
}
