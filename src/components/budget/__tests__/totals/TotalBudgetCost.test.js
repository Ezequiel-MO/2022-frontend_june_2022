import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { usePartialCostsData } from '../../partial-costs/usePartialCostsData'
import { TotalBudgetCost } from '../../totals'

// Mock the hooks
jest.mock('../../partial-costs/usePartialCostsData', () => ({
  usePartialCostsData: jest.fn()
}))

jest.mock('../../../../translations/translationContext', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

describe('TotalBudgetCost', () => {
  it('renders correctly', () => {
    // Mock the return value of usePartialCostsData
    usePartialCostsData.mockReturnValue({
      totalCostOfItems: 100
    })

    const { getByText } = render(<TotalBudgetCost />)

    // Check if the total cost is displayed correctly
    expect(getByText('TOTAL BUDGET')).toBeInTheDocument()
    expect(getByText('€100.00')).toBeInTheDocument()
  })

  it('renders correctly when totalCostOfItems is 0', () => {
    // Mock the return value of usePartialCostsData
    usePartialCostsData.mockReturnValue({
      totalCostOfItems: 0
    })

    const { getByText } = render(<TotalBudgetCost />)

    // Check if the total cost is displayed correctly
    expect(getByText('TOTAL BUDGET')).toBeInTheDocument()
    expect(getByText('€0.00')).toBeInTheDocument()
  })
})
