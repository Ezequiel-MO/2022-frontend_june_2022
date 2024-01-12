import { IItinerary } from '../../interfaces'

export const getMorningMorningTitles = (
  isItineraryWithActivities: boolean | undefined
) => {
  let titles = new Set<string>(['Morning Events', 'Morning Meeting'])
  if (isItineraryWithActivities) {
    titles.delete('MorningEvents')
  }
  return titles
}

export const getMorningAfternoonTitles = (
  isItineraryWithActivities: boolean | undefined,
  isItineraryWithLunch: boolean | undefined
) => {
  let titles = new Set<string>(['Morning Events', 'Morning Meeting', 'Lunch'])
  if (isItineraryWithActivities) {
    titles.delete('Morning Events')
  }
  if (isItineraryWithLunch) {
    titles.delete('Lunch')
  }
  return titles
}

export const getMorningNightTitles = (
  isItineraryWithActivities: boolean | undefined,
  isItineraryWithLunch: boolean | undefined,
  isItineraryWithDinner: boolean | undefined
) => {
  let titles = new Set<string>([
    'Morning Events',
    'Morning Meeting',
    'Lunch',
    'Afternoon Events',
    'Afternoon Meeting',
    'Dinner'
  ])

  if (isItineraryWithActivities) {
    titles.delete('Morning Events')
    titles.delete('Afternoon Events')
  }

  if (isItineraryWithLunch) {
    titles.delete('Lunch')
  }

  if (isItineraryWithDinner) {
    titles.delete('Dinner')
  }

  return titles
}

export const getAfternoonAfternoonTitles = (
  isItineraryWithActivities: boolean | undefined
) => {
  let titles = new Set<string>(['Afternoon Events', 'Afternoon Meeting'])

  if (isItineraryWithActivities) {
    titles.delete('Afternoon Events')
  }
  return titles
}

export const getAfternoonNightTitles = (
  isItineraryWithActivities: boolean | undefined,
  isItineraryWithDinner: boolean | undefined
) => {
  let titles = new Set<string>([
    'Afternoon Events',
    'Afternoon Meeting',
    'Dinner'
  ])

  if (isItineraryWithActivities) {
    titles.delete('Afternoon Events')
  }

  if (isItineraryWithDinner) {
    titles.delete('Dinner')
  }
  return titles
}

export const getNightNightTitles = () => {
  let titles = new Set<string>([])
  return titles
}

export function analyzeItinerary(itinerary: IItinerary) {
  const isItineraryActive = itinerary && itinerary.itinerary.length > 0
  const hasActivities = itinerary?.activity?.events.length > 0
  const hasLunch = itinerary?.lunch?.restaurants.length > 0
  const hasDinner = itinerary?.dinner?.restaurants.length > 0

  return {
    isItineraryActive,
    isItineraryWithActivities: isItineraryActive && hasActivities,
    isItineraryWithMorningActivities:
      hasActivities && itinerary.starts === 'morning',
    isItineraryWithAfternoonActivities:
      hasActivities && itinerary.starts === 'afternoon',
    isItineraryWithLunch: isItineraryActive && hasLunch,
    isItineraryWithDinner: isItineraryActive && hasDinner
  }
}
