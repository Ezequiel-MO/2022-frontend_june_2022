import { forwardRef } from 'react'

export const BudgetContainer = forwardRef(({ children }, ref) => (
  <div
    className='overflow-x-auto relative -mx-56 2xl:-mx-0 bg-[#fff] mb-10'
    id='budget_id'
    ref={ref}
  >
    {children}
  </div>
))
