import { forwardRef } from 'react'

export const BudgetContainer = forwardRef(({ children }, ref) => (
  <div className='no-scrollbar overflow-x-auto' id='budget_id' ref={ref}>
    {children}
  </div>
))
