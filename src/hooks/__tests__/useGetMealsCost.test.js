import { renderHook } from '@testing-library/react'
import { useGetMealsCost } from '../'
import { useBudget } from '../useBudget'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from '../../redux/features/budgetSlice'

jest.mock('../useBudget')

describe('useGetMealsCost', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: { budget: budgetReducer }
    })
  })

  it('calculates total meals cost correctly', () => {
    useBudget.mockReturnValue({
      meals: {
        'Arrival Day': {
          lunch: { price: 50 },
          dinner: { price: 70 }
        },
        'Day 2': {
          lunch: { price: 60 },
          dinner: { price: 80 }
        },
        'Day 3': {
          lunch: { price: 70 },
          dinner: { price: 90 }
        }
      }
    })

    const { result } = renderHook(() => useGetMealsCost(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    expect(result.current.mealsTotalCost).toBe(420)
  })

  it('returns 0 when there are no meals', () => {
    useBudget.mockReturnValue({
      meals: {}
    })

    const { result } = renderHook(() => useGetMealsCost(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    expect(result.current.mealsTotalCost).toBe(0)
  })

  it('handles meals without prices correctly', () => {
    useBudget.mockReturnValue({
      meals: {
        'Arrival Day': {
          lunch: { price: 50 },
          dinner: {}
        },
        'Day 2': {
          lunch: {},
          dinner: { price: 80 }
        }
      }
    })

    const { result } = renderHook(() => useGetMealsCost(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    expect(result.current.mealsTotalCost).toBe(130)
  })

  it('updates total meals cost when meals are updated', () => {
    useBudget.mockReturnValue({
      meals: {
        'Arrival Day': {
          lunch: { price: 50 },
          dinner: { price: 70 }
        }
      }
    })

    const { result, rerender } = renderHook(() => useGetMealsCost(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    expect(result.current.mealsTotalCost).toBe(120)

    useBudget.mockReturnValue({
      meals: {
        'Arrival Day': {
          lunch: { price: 50 },
          dinner: { price: 70 }
        },
        'Day 2': {
          lunch: { price: 60 },
          dinner: { price: 80 }
        }
      }
    })

    rerender()

    expect(result.current.mealsTotalCost).toBe(260)
  })
})
