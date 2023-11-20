import { useState, useEffect } from 'react'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { VenueSummaryRow } from '../rows/venue'
import { ShowRows } from '../rows/shows/ShowRows'
import { DinnerRow, EventTransferRow } from '../rows/meals_activities'
import { UPDATE_PROGRAM_SHOWS_COST } from '../../context/budgetReducer'
import { useContextBudget } from '../../context/BudgetContext'

interface DinnerSectionProps {
  dinners: IRestaurant[]
  date: string
  pax: number
}

export const DinnerSection = ({ dinners, date, pax }: DinnerSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<IRestaurant>(dinners[0])
  const { dispatch } = useContextBudget()
  const noDinner = dinners.length === 0
  if (noDinner) return null

  const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant>(
    dinners[0]
  )

  const handleVenueChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedVenue = dinners.find(
      (restaurant) => restaurant.name === e.target.value
    ) as IRestaurant
    setSelectedRestaurant(selectedVenue)
  }

  const shouldRenderEntertainmentRow = selectedRestaurant?.entertainment?.length

  useEffect(() => {
    if (!shouldRenderEntertainmentRow) {
      dispatch({
        type: UPDATE_PROGRAM_SHOWS_COST,
        payload: {
          date,
          show: null,
          type: 'dinner'
        }
      })
    }
  }, [shouldRenderEntertainmentRow, dispatch, date])

  const renderDinnerRow = (dinners: IRestaurant[]) => {
    if (dinners.every((dinner) => !dinner.isVenue))
      return (
        <DinnerRow
          items={dinners}
          date={date}
          pax={pax}
          selectedEvent={selectedEvent}
          setSelectedEvent={
            setSelectedEvent as React.Dispatch<
              React.SetStateAction<IEvent | IRestaurant>
            >
          }
        />
      )

    return (
      <VenueSummaryRow
        venues={dinners}
        venue={selectedRestaurant}
        handleChange={handleVenueChange}
        date={date}
        title='Dinner @ Venue'
        id='dinner'
        pax={pax}
      />
    )
  }

  const renderEntertainmentRow = (selectedRestaurant: IRestaurant) => {
    if (
      selectedRestaurant?.isVenue &&
      selectedRestaurant?.entertainment?.length
    ) {
      return (
        <ShowRows
          date={date}
          entertainment={selectedRestaurant.entertainment}
          typeOfEvent='dinner'
        />
      )
    }
    return null
  }

  return (
    <>
      <EventTransferRow
        transfer={selectedEvent?.transfer || []}
        date={date}
        id='transfer_dinner'
        selectedEvent={selectedEvent}
      />

      {renderDinnerRow(dinners)}
      {renderEntertainmentRow(selectedRestaurant)}
    </>
  )
}
