import { renderHook } from '@testing-library/react'
import { useGetEventCosts } from '../'
import { useBudget } from '../useBudget'

jest.mock('../useBudget')

describe('useGetEventCosts hook', () => {
  test('calculates the total event costs correctly', () => {
    useBudget.mockReturnValue({
      events: {
        day1: {
          event1: { pricePerPerson: true, price: 100, totalCost: 200 },
          event2: { pricePerPerson: false, price: 300, totalCost: 600 }
        },
        day2: {
          event3: { pricePerPerson: true, price: 150, totalCost: 300 },
          event4: { pricePerPerson: false, price: 200, totalCost: 400 }
        }
      }
    })

    const { result } = renderHook(() => useGetEventCosts())
    expect(result.current.eventsTotalCost).toEqual(1000)
  })
  test('handles missing pricePerPerson', () => {
    useBudget.mockReturnValue({
      events: {
        day1: {
          event1: { price: 100, totalCost: 200 },
          event2: { price: 300, totalCost: 600 }
        },
        day2: {
          event3: { price: 150, totalCost: 300 },
          event4: { price: 200, totalCost: 400 }
        }
      }
    })

    const { result } = renderHook(() => useGetEventCosts())
    expect(result.current.eventsTotalCost).toEqual(1500)
  })
})
