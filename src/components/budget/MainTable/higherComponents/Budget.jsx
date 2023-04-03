import { forwardRef } from 'react'
import { useBudgetData } from '../../../../hooks'
import { BudgetContainer, BudgetTable } from './'

export const Budget = forwardRef((props, ref) => {
  const { hotels, schedule, nrPax } = useBudgetData()
  return (
    <BudgetContainer ref={ref}>
      <BudgetTable hotels={hotels} schedule={schedule} nrPax={nrPax} />
    </BudgetContainer>
  )
})
