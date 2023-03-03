import { useBudget, useCurrentProject } from './'

export const useBudgetData = () => {
  const { currentProject } = useCurrentProject()
  const { nrPax } = currentProject
  const { hotels, schedule } = useBudget()

  return {
    hotels,
    schedule,
    nrPax
  }
}
