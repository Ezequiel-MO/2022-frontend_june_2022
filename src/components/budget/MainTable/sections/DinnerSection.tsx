import { useState } from 'react'

import { IRestaurant } from '../../../../interfaces'
import { DinnerRow } from '../rows'
import { AssistanceEventTransferRow, EventTransferRow } from '../transfers'
import { VenueSummaryRow } from '../venue'
import { EntertainmentSummaryRow } from '../rows/EntertainmentSummaryRow'

interface DinnerSectionProps {
  dinners: IRestaurant[]
  date: string
  pax: number
}

export const DinnerSection = ({ dinners, date, pax }: DinnerSectionProps) => {
  const noDinner = dinners.length === 0
  if (noDinner) return null

  const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant>(
    dinners[0]
  )

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedVenue = dinners.find(
      (restaurant) => restaurant.name === e.target.value
    ) as IRestaurant
    setSelectedRestaurant(selectedVenue)
  }

  const renderDinnerRow = (dinners: IRestaurant[]) => {
    if (dinners.every((dinner) => !dinner.isVenue))
      return <DinnerRow items={dinners} date={date} pax={pax} />

    return (
      <VenueSummaryRow
        venues={dinners}
        venue={selectedRestaurant}
        handleChange={handleChange}
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
        <EntertainmentSummaryRow
          entertainment={selectedRestaurant.entertainment}
        />
      )
    }
    return null
  }

  return (
    <>
      {dinners.length > 0 && dinners[0].transfer && (
        <>
          <AssistanceEventTransferRow
            transfer={dinners[0].transfer}
            date={date}
          />
          <EventTransferRow
            transfer={dinners[0].transfer}
            date={date}
            description={
              dinners[0].transfer[0]?.selectedService === 'dispo_'
                ? 'Transfer 4h at disposal night hours'
                : 'Transfer'
            }
            id='transfer_dinner'
          />
        </>
      )}
      {renderDinnerRow(dinners)}
      {renderEntertainmentRow(selectedRestaurant)}
    </>
  )
}
