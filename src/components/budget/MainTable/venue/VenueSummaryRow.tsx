import { TableCell, TableRow } from '@mui/material'
import { IRestaurant } from '../../../../interfaces'
import accounting from 'accounting'

interface Props {
  venue: IRestaurant
  date: string
  title: 'Dinner @ Venue' | 'Lunch @ Venue'
}

export const VenueSummaryRow = ({ venue, date, title }: Props) => {
  return (
    <>
      <TableRow className='dark:bg-[#a9ba9d]'>
        <TableCell>{date}</TableCell>
        <TableCell>{`${title}`}</TableCell>
        <TableCell>{venue.name}</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>{accounting.formatMoney(80000, '€')}</TableCell>
      </TableRow>
    </>
  )
}
