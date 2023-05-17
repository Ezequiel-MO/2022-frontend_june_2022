import { renderHook } from '@testing-library/react'
import { useGetTransferCosts } from '../useGetTransferCosts'
import { useBudget } from '../useBudget'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from '../../redux/features/budgetSlice'

jest.mock('../useBudget')

describe('useGetTransferCosts hook', () => {
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: { budget: budgetReducer }
    })
  })

  it('calculates the total transfer costs correctly', () => {
    useBudget.mockReturnValue({
      transfers: {
        transfer1: 100,
        transfer2: 200,
        transfer3: 300,
        transfer4: 400
      },
      transfersIn: {
        assistance: 2,
        assistanceCost: 50,
        meetGreet: 3,
        meetGreetCost: 20
      },
      transfersOut: {
        assistance: 1,
        assistanceCost: 30,
        meetGreet: 2,
        meetGreetCost: 40
      }
    })

    const { result } = renderHook(() => useGetTransferCosts(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })
    expect(result.current.transfersTotalCost).toEqual(1270)
  })

  it('handles missing values gracefully', () => {
    useBudget.mockReturnValue({
      transfers: {
        transfer1: 100,
        transfer2: 200,
        transfer3: 300
      },
      transfersIn: {
        assistance: 2,
        meetGreet: 3
      },
      transfersOut: {}
    })

    const { result } = renderHook(() => useGetTransferCosts(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })
    expect(result.current.transfersTotalCost).toEqual(600)
  })

  it('returns 0 when there are no transfers', () => {
    useBudget.mockReturnValue({
      transfers: {},
      transfersIn: {},
      transfersOut: {}
    })

    const { result } = renderHook(() => useGetTransferCosts(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })
    expect(result.current.transfersTotalCost).toEqual(0)
  })
  it('updates total transfers cost when transfers are updated', () => {
    useBudget.mockReturnValue({
      transfers: {
        transfer1: 100,
        transfer2: 200,
        transfer3: 300
      },
      transfersIn: {
        assistance: 2,
        meetGreet: 3
      },
      transfersOut: {}
    })

    const { result, rerender } = renderHook(() => useGetTransferCosts(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })
    expect(result.current.transfersTotalCost).toEqual(600)

    useBudget.mockReturnValue({
      transfers: {
        transfer1: 100,
        transfer2: 200,
        transfer3: 300,
        transfer4: 400
      },
      transfersIn: {
        assistance: 2,
        meetGreet: 3
      },
      transfersOut: {}
    })
    rerender()
    expect(result.current.transfersTotalCost).toEqual(1000)
  })
})
