import { renderHook } from '@testing-library/react'
import { usePartialCostsData } from '../../partial-costs/usePartialCostsData' // Update this import path to your actual file path
import {
  useCurrentProject,
  useGetMeetingsCost,
  useGetMealsCost,
  useGetEventCosts,
  useGetTransferCosts
} from '../../../../hooks'

jest.mock('../../../../hooks', () => ({
  useCurrentProject: jest.fn(),
  useGetMeetingsCost: jest.fn(),
  useGetMealsCost: jest.fn(),
  useGetEventCosts: jest.fn(),
  useGetTransferCosts: jest.fn()
}))

describe('usePartialCostsData', () => {
  it('calculates totalCostOfItems correctly', () => {
    useCurrentProject.mockReturnValue({
      currentHotel: { totalCost: 100 }
    })
    useGetMeetingsCost.mockReturnValue({
      meetingTotalCost: 200
    })
    useGetMealsCost.mockReturnValue({
      mealsTotalCost: 300
    })
    useGetEventCosts.mockReturnValue({
      eventsTotalCost: 400
    })
    useGetTransferCosts.mockReturnValue({
      transfersTotalCost: 500
    })

    const { result } = renderHook(() => usePartialCostsData())

    expect(result.current.totalCostOfItems).toEqual(1500)
  })

  it('updates totalCostOfItems when the costs change', () => {
    useCurrentProject.mockReturnValue({
      currentHotel: { totalCost: 100 }
    })
    useGetMeetingsCost.mockReturnValue({
      meetingTotalCost: 200
    })
    useGetMealsCost.mockReturnValue({
      mealsTotalCost: 300
    })
    useGetEventCosts.mockReturnValue({
      eventsTotalCost: 400
    })
    useGetTransferCosts.mockReturnValue({
      transfersTotalCost: 500
    })

    const { result, rerender } = renderHook(() => usePartialCostsData())

    // Update the return values of the hooks
    useCurrentProject.mockReturnValue({
      currentHotel: { totalCost: 200 }
    })
    useGetMeetingsCost.mockReturnValue({
      meetingTotalCost: 300
    })
    useGetMealsCost.mockReturnValue({
      mealsTotalCost: 400
    })
    useGetEventCosts.mockReturnValue({
      eventsTotalCost: 500
    })
    useGetTransferCosts.mockReturnValue({
      transfersTotalCost: 600
    })

    // Rerender the hook
    rerender()

    // Check if totalCostOfItems has updated
    expect(result.current.totalCostOfItems).toEqual(2000)
  })
  it('handles missing costs correctly', () => {
    // Mock the return values of the hooks
    useCurrentProject.mockReturnValue({
      currentHotel: {}
    })
    useGetMeetingsCost.mockReturnValue({})
    useGetMealsCost.mockReturnValue({})
    useGetEventCosts.mockReturnValue({})
    useGetTransferCosts.mockReturnValue({})

    const { result } = renderHook(() => usePartialCostsData())

    // Check if totalCostOfItems is calculated correctly
    expect(result.current.totalCostOfItems).toEqual(0)
  })

  it('handles null costs correctly', () => {
    // Mock the return values of the hooks
    useCurrentProject.mockReturnValue({
      currentHotel: { totalCost: null }
    })
    useGetMeetingsCost.mockReturnValue({
      meetingTotalCost: null
    })
    useGetMealsCost.mockReturnValue({
      mealsTotalCost: null
    })
    useGetEventCosts.mockReturnValue({
      eventsTotalCost: null
    })
    useGetTransferCosts.mockReturnValue({
      transfersTotalCost: null
    })

    const { result } = renderHook(() => usePartialCostsData())

    // Check if totalCostOfItems is calculated correctly
    expect(result.current.totalCostOfItems).toEqual(0)
  })
})
