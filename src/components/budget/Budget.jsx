import { useReducer, forwardRef } from 'react'
import { Table, TableBody } from '@mui/material'
import DayRows from './rows/days/DayRows'
import HotelSummaryRow from './rows/hotel/HotelSummaryRow'
import HotelBreakdownRows from './rows/hotel/HotelBreakdownRows'
import TotalBudgetCost from './totals/TotalBudgetCost'
import { useCurrentProject } from '../../hooks/useCurrentProject'
import BudgetTableHead from './BudgetTableHead'
import PartialCosts from './partial-costs/PartialCosts'
import { useBudget } from '../../hooks/useBudget'

const Budget = forwardRef((props, ref) => {
  const { currentProject } = useCurrentProject()
  const { nrPax } = currentProject
  const { hotels, schedule } = useBudget()
  return (
    <div ref={ref}>
      <div className='no-scrollbar overflow-x-auto' id='budget_id'>
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
                <HotelBreakdownRows
                  hotels={hotels}
                  nights={schedule?.length - 1}
                />
              </>
            )}

            {schedule?.map((day) => (
              <DayRows key={day._id} day={day} pax={nrPax} />
            ))}
            <TotalBudgetCost />
          </TableBody>
        </Table>
      </div>
      <PartialCosts />
    </div>
  )
})

export default Budget
