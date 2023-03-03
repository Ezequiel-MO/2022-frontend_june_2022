import { Table, TableBody } from '@mui/material'
import { BudgetTableHead, DayRows, TotalBudgetCost } from './'
import { HotelRows } from './rows/hotel'

export const BudgetTable = ({ hotels, schedule, nrPax }) => {
  return (
    <Table
      stickyHeader
      size='small'
      className='text-left divide-y divide-gray-700 dark:divide-black-50 dark:bg-gray-50'
    >
      <BudgetTableHead />
      <TableBody>
        <HotelRows hotels={hotels} nights={schedule.length - 1} />
        {schedule?.map((day) => (
          <DayRows key={day._id} day={day} pax={nrPax} />
        ))}
        <TotalBudgetCost />
      </TableBody>
    </Table>
  )
}
