import { forwardRef } from 'react'

interface BudgetContainerProps {
  children: React.ReactNode
}

export const BudgetContainer = forwardRef<HTMLDivElement, BudgetContainerProps>(
  ({ children }, ref) => (
    <div
      className='overflow-x-auto relative dark:bg-white-50 mb-10 z-[200]'
      id='budget_id'
      ref={ref}
    >
      {children}
    </div>
  )
)
