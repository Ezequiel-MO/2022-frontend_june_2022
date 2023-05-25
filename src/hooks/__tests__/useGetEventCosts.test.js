import { renderHook } from '@testing-library/react'
import { useGetEventCosts } from '../'
import { useBudget } from '../useBudget'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from '../../redux/features/budgetSlice'

jest.mock('../useBudget')

describe('useGetEventCosts', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: { budget: budgetReducer }
    })
  })
  it('calculates total event costs correctly', () => {
    useBudget.mockReturnValue({
      events: {
        'Day 1': {
          'Event 1': { pricePerPerson: true, price: 100, totalCost: 200 },
          'Event 2': { pricePerPerson: false, price: 300, totalCost: 600 }
        },
        'Day 2': {
          'Event 3': { pricePerPerson: true, price: 150, totalCost: 300 },
          'Event 4': { pricePerPerson: false, price: 200, totalCost: 400 }
        }
      }
    })

    const { result } = renderHook(() => useGetEventCosts(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    expect(result.current.eventsTotalCost).toBe(1000)
  })
  it('handles missing pricePerPerson', () => {
    useBudget.mockReturnValue({
      events: {
        'Day 1': {
          'Event 1': { price: 100, totalCost: 200 },
          'Event 2': { price: 300, totalCost: 600 }
        },
        'Day 2': {
          'Event 3': { price: 150, totalCost: 300 },
          'Event 4': { price: 200, totalCost: 400 }
        }
      }
    })

    const { result } = renderHook(() => useGetEventCosts(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    expect(result.current.eventsTotalCost).toBe(1500)
  })

  it('updates total event costs when events are updated', () => {
    useBudget.mockReturnValue({
      events: {
        'Day 1': {
          'Event 1': { price: 100, totalCost: 200 },
          'Event 2': { price: 300, totalCost: 600 }
        }
      }
    })

    const { result, rerender } = renderHook(() => useGetEventCosts(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    expect(result.current.eventsTotalCost).toBe(800)

    useBudget.mockReturnValue({
      events: {
        'Day 1': {
          'Event 1': { price: 100, totalCost: 200 },
          'Event 2': { price: 300, totalCost: 600 }
        },
        'Day 2': {
          'Event 3': { price: 150, totalCost: 300 },
          'Event 4': { price: 200, totalCost: 400 }
        }
      }
    })
    rerender()
    expect(result.current.eventsTotalCost).toBe(1500)
  })
  it('returns 0 when events is empty or undefined', () => {
    useBudget.mockReturnValue({})

    const { result } = renderHook(() => useGetEventCosts(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    expect(result.current.eventsTotalCost).toBe(0)

    useBudget.mockReturnValue({
      events: {}
    })

    expect(result.current.eventsTotalCost).toBe(0)
  })
})
