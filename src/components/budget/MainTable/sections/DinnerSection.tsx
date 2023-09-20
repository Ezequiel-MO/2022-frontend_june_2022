import { useEffect, useState } from 'react'
import { useBudget } from '../../../../hooks'
import { IRestaurant } from '../../../../interfaces'
import { DinnerRow } from '../rows'
import { AssistanceEventTransferRow, EventTransferRow } from '../transfers'
import { VenueBreakdownRows, VenueSummaryRow } from '../venue'

interface DinnerSectionProps {
  dinners: IRestaurant[]
  date: string
  pax: number
}

export const DinnerSection = ({ dinners, date, pax }: DinnerSectionProps) => {
  const noDinner = dinners.length === 0
  if (noDinner) return null
  const { meals } = useBudget()
  const [venue, setVenue] = useState<IRestaurant>(dinners[0])

  useEffect(() => {
    if (
      Object.keys(meals).length > 0 &&
      Object.keys(meals).includes(date) &&
      Object.keys(meals[date]).includes('dinner')
    ) {
      setVenue(meals[date]['dinner'])
    }
  }, [dinners, date, meals])

  const renderDinnerRow = (dinners: IRestaurant[]) => {
    if (dinners.length > 1) return <p>Multiple Options</p>
    if (dinners.length === 1 && !dinners[0].isVenue)
      return <DinnerRow items={dinners} date={date} pax={pax} />
    return (
      <>
        <VenueSummaryRow
          venue={venue}
          date={date}
          title='Dinner @ Venue'
          id='dinner'
          pax={pax}
        />
        <VenueBreakdownRows date={date} id='dinner' venue={venue} />
      </>
    )
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
      {/* {dinners[0]?.isVenue ? (
        <>
          <VenueSummaryRow
            venues={dinners}
            pax={pax}
            dateProp={date}
            typeOfMeetingProp='Dinner Venue'
            id='dinner'
          />
          <VenueBreakdownRows
            venues={dinners}
            dateProp={date}
            typeOfMeetingProp='Dinner Venue'
          />
        </>
      ) : (
        <DinnerRow items={dinners} date={date} pax={pax} />
      )} */}
    </>
  )
}
