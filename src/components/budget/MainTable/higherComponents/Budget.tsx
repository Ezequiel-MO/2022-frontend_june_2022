import { forwardRef } from 'react'
import { BudgetContainer, BudgetTable } from '.'
import { useContextBudget } from '../../context/BudgetContext'

export const Budget = forwardRef<HTMLDivElement>((_, ref) => {
  const { state, dispatch } = useContextBudget()
  return (
    <BudgetContainer ref={ref}>
      <BudgetTable state={state} dispatch={dispatch} />
    </BudgetContainer>
  )
})
