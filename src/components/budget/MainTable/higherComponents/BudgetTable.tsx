import { Table } from '@mui/material'
import { BudgetTableHead, DayRows } from '.'
import { HotelRows } from '../hotel'
import { TotalBudgetCost } from '../../totals'
import { IDay, IGift, IHotel } from '../../../../interfaces'
import { GiftsRow } from '../rows'

interface BudgetTableProps {
  hotels: IHotel[]
  schedule: IDay[]
  nrPax: number
}

export const BudgetTable = ({ hotels, schedule, nrPax }: BudgetTableProps) => {
  return (
    <Table
      id='budget-table'
      stickyHeader
      size='small'
      className='main-table text-left divide-y divide-gray-700 dark:divide-black-50 dark:bg-gray-50 text-sm'
    >
      <BudgetTableHead />
      <tbody>
        <HotelRows hotels={hotels} nights={schedule.length - 1} />
        {schedule?.map((day) => (
          <DayRows key={day._id} day={day} pax={nrPax} />
        ))}
        <GiftsRow nrPax={nrPax} />
        <TotalBudgetCost />
      </tbody>
    </Table>
  )
}
