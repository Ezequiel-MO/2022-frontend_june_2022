import { Table, TableBody } from '@mui/material'
import { BudgetTableHead, DayRows } from './'
import { HotelRows } from '../hotel'
import { TotalBudgetCost } from '../../totals'

export const BudgetTable = ({ hotels, schedule, nrPax }) => {
  return (
    <Table
      id='budget-table'
      stickyHeader
      size='small'
      className='main-table text-left divide-y divide-gray-700 dark:divide-black-50 dark:bg-gray-50'
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
