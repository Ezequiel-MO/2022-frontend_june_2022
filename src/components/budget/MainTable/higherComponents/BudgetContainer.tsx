import { forwardRef } from 'react'

interface BudgetContainerProps {
  children: React.ReactNode
}

export const BudgetContainer = forwardRef<HTMLDivElement, BudgetContainerProps>(
  ({ children }, ref) => (
    <div
      className='overflow-x-auto relative mb-10 z-[200] text-black-50'
      id='budget_id'
      ref={ref}
    >
      {children}
    </div>
  )
)
