import { forwardRef } from 'react'
import { useBudgetData } from '../../../../hooks'
import { BudgetContainer, BudgetTable } from '.'

export const Budget = forwardRef<HTMLDivElement>((_, ref) => {
  const { hotels, gifts, schedule, nrPax } = useBudgetData()
  return (
    <BudgetContainer ref={ref}>
      <BudgetTable
        hotels={hotels}
        gifts={gifts}
        schedule={schedule}
        nrPax={nrPax}
      />
    </BudgetContainer>
  )
})
