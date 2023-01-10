import { forwardRef } from 'react'
import { Table, TableBody } from '@mui/material'
import { useCurrentProject } from '../../hooks/useCurrentProject'
import { useBudget } from '../../hooks/useBudget'
import {
  BudgetTableHead,
  PartialCosts,
  DayRows,
  HotelSummaryRow,
  HotelBreakdownRows,
  TotalBudgetCost
} from './'

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
