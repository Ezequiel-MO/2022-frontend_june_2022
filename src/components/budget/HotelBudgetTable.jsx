import { Table, TableBody } from '@mui/material'
import {
  BudgetTableHead,
  DayRows,
  HotelBreakdownRows,
  HotelSummaryRow
} from './'

export const HotelBudgetTable = ({ hotels, schedule, nrPax }) => {
  return (
    <Table
      stickyHeader
      size='small'
      className='text-left divide-y divide-gray-700 dark:divide-black-50 dark:bg-gray-50'
    >
      <BudgetTableHead />
      <TableBody>
        {hotels?.length > 0 && (
          <>
            <HotelSummaryRow nights={schedule?.length - 1} />
            <HotelBreakdownRows hotels={hotels} nights={schedule?.length - 1} />
          </>
        )}

        {schedule?.map((day) => (
          <DayRows key={day._id} day={day} pax={nrPax} />
        ))}
      </TableBody>
    </Table>
  )
}
