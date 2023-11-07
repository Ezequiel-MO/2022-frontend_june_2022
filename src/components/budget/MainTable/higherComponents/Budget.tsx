import { forwardRef } from 'react'
import { BudgetContainer, BudgetTable } from '.'

export const Budget = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <BudgetContainer ref={ref}>
      <BudgetTable />
    </BudgetContainer>
  )
})
