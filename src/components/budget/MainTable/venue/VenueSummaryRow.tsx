import { useState } from 'react'
import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { IRestaurant } from '../../../../interfaces'
import { VenueSingleChoiceCells } from './VenueSingleChoiceCells'
import { useGetVenuesCost } from '../../../../hooks'
import { VenueMultipleChoice } from './VenueMultipleChoice'
import { VenueBreakdownRows } from './VenueBreakdownRows'

interface Props {
  pax: number
  venues: IRestaurant[]
  venue: IRestaurant
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  date: string
  title: 'Dinner @ Venue' | 'Lunch @ Venue'
  id: 'dinner' | 'lunch'
}

export const VenueSummaryRow = ({
  pax,
  venues,
  venue,
  handleChange,
  date,
  title,
  id
}: Props) => {
  const { venuesTotalCost } = useGetVenuesCost()
  const multipleVenues = venues.length > 1
  const isVenue =
    venue?.isVenue &&
    venue?.venue_price &&
    Object.keys(venue.venue_price).length > 0

  const [nrPax, setNrPax] = useState(pax)

  return (
    <>
      <TableRow className='dark:bg-[#a9ba9d]'>
        <TableCell>{date}</TableCell>
        <TableCell>{`${title}`}</TableCell>
        <TableCell>
          {multipleVenues ? (
            <VenueMultipleChoice
              options={venues}
              option={venue}
              date={date}
              id={id}
              handleChange={handleChange}
              nrPax={nrPax}
              setNrPax={setNrPax}
            />
          ) : (
            <VenueSingleChoiceCells
              pax={pax}
              options={venues}
              date={date}
              id={id}
            />
          )}
        </TableCell>
        <TableCell> {isVenue ? null : pax}</TableCell>
        <TableCell>
          {isVenue
            ? null
            : accounting.formatMoney(`${Number(venue?.price)}`, '€')}
        </TableCell>
        <TableCell>
          {accounting.formatMoney(
            `${
              isVenue ? venuesTotalCost : Number(nrPax * Number(venue?.price))
            }`,
            '€'
          )}
        </TableCell>
      </TableRow>
      {isVenue && <VenueBreakdownRows date={date} id='dinner' venue={venue} />}
    </>
  )
}
