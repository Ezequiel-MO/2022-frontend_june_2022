import { render, screen } from '@testing-library/react'
import { TransfersInAssistanceRow } from '../../../MainTable/rows/TransfersInAssistanceRow'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from '../../../../../redux/features/budgetSlice'
import '@testing-library/jest-dom'

describe('TransfersInAssistanceRow', () => {
  test('renders correctly when assistanceObj is present', () => {
    const store = configureStore({
      reducer: {
        budget: budgetReducer
      }
    })

    const items = [
      { assistance: 5, assistanceCost: 100 },
      { assistance: 0, assistanceCost: 0 },
      { assistance: 0 }
    ]

    render(
      <Provider store={store}>
        <table>
          <tbody>
            <TransfersInAssistanceRow items={items} date='2023-05-24' />
          </tbody>
        </table>
      </Provider>
    )

    expect(screen.getByText(/On-board Assistance @ Buses/i)).toBeInTheDocument()
    expect(
      screen.getByRole('cell', { name: /2023-05-24/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: /€100.00/i })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: /€500.00/i })).toBeInTheDocument()
  })

  test('does not render when assistanceObj is not present', () => {
    const store = configureStore({
      reducer: {
        budget: budgetReducer
      }
    })

    const items = [
      { assistance: 0, assistanceCost: 0 },
      { assistance: 0, assistanceCost: 0 }
    ]

    render(
      <Provider store={store}>
        <table>
          <tbody>
            <TransfersInAssistanceRow items={items} date='2023-05-24' />
          </tbody>
        </table>
      </Provider>
    )

    expect(
      screen.queryByText(/On-board Assistance @ Buses/i)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('cell', { name: /2023-05-24/i })
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('cell', { name: /5/i })).not.toBeInTheDocument()
    expect(
      screen.queryByRole('cell', { name: /€100.00/i })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('cell', { name: /€500.00/i })
    ).not.toBeInTheDocument()
  })
})
