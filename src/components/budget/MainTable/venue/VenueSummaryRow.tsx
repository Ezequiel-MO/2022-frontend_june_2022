import { TableCell, TableRow } from '@mui/material'
import accounting from 'accounting'
import { IRestaurant } from '../../../../interfaces'
import { VenueSingleChoiceCells } from './VenueSingleChoiceCells'
import { useGetVenuesCost } from '../../../../hooks'

interface Props {
  pax: number
  venue: IRestaurant
  date: string
  title: 'Dinner @ Venue' | 'Lunch @ Venue'
  id: 'dinner' | 'lunch'
}

export const VenueSummaryRow = ({ pax, venue, date, title, id }: Props) => {
  const { venuesTotalCost } = useGetVenuesCost()
  return (
    <>
      <TableRow className='dark:bg-[#a9ba9d]'>
        <TableCell>{date}</TableCell>
        <TableCell>{`${title}`}</TableCell>
        <TableCell>
          <VenueSingleChoiceCells
            pax={pax}
            options={[venue]}
            date={date}
            id={id}
          />
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>{accounting.formatMoney(venuesTotalCost, '€')}</TableCell>
      </TableRow>
    </>
  )
}
