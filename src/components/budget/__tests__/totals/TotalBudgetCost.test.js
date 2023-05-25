import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { usePartialCostsData } from '../../partial-costs/usePartialCostsData'
import { TotalBudgetCost } from '../../totals'

jest.mock('../../partial-costs/usePartialCostsData', () => ({
  usePartialCostsData: jest.fn()
}))

jest.mock('../../../../translations/translationContext', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

describe('TotalBudgetCost', () => {
  it('renders correctly', () => {
    usePartialCostsData.mockReturnValue({
      totalCostOfItems: 100
    })

    const { getByText } = render(
      <table>
        <tbody>
          <TotalBudgetCost />
        </tbody>
      </table>
    )

    expect(getByText('TOTAL BUDGET')).toBeInTheDocument()
    expect(getByText('€100.00')).toBeInTheDocument()
  })

  it('renders correctly when totalCostOfItems is 0', () => {
    usePartialCostsData.mockReturnValue({
      totalCostOfItems: 0
    })

    const { getByText } = render(
      <table>
        <tbody>
          <TotalBudgetCost />
        </tbody>
      </table>
    )

    expect(getByText('TOTAL BUDGET')).toBeInTheDocument()
    expect(getByText('€0.00')).toBeInTheDocument()
  })

  it('updates when totalCostOfItems changes', () => {
    usePartialCostsData.mockReturnValue({
      totalCostOfItems: 100
    })

    const { getByText, rerender } = render(
      <table>
        <tbody>
          <TotalBudgetCost />
        </tbody>
      </table>
    )

    expect(getByText('€100.00')).toBeInTheDocument()

    usePartialCostsData.mockReturnValue({
      totalCostOfItems: 200
    })

    rerender(
      <table>
        <tbody>
          <TotalBudgetCost />
        </tbody>
      </table>
    )

    expect(getByText('€200.00')).toBeInTheDocument()
  })
})
