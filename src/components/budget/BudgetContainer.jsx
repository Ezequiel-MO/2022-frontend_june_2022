import { forwardRef } from 'react'

export const BudgetContainer = forwardRef(({ children }, ref) => (
  <div
    className='no-scrollbar overflow-x-auto relative lg:-mx-40 xl:-mx-0 z-20 bg-[#fff] mb-10'
    id='budget_id'
    ref={ref}
  >
    {children}
  </div>
))
