import { forwardRef } from 'react'
import { BudgetContainer, BudgetTable } from '.'
import { BudgetProvider } from '../../context/BudgetContext'

export const Budget = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <BudgetProvider>
      <BudgetContainer ref={ref}>
        <BudgetTable />
      </BudgetContainer>
    </BudgetProvider>
  )
})
