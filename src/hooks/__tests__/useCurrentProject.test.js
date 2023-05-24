import { act, renderHook } from '@testing-library/react'
import { useCurrentProject } from '../useCurrentProject'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import currentProjectReducer, {
  SET_CURRENT_HOTEL,
  SET_CURRENT_PROJECT
} from '../../redux/features/currentProjectSlice'

const store = configureStore({
  reducer: {
    currentProject: currentProjectReducer
  }
})

describe('useCurrentProject', () => {
  it('should return current project and hotel', () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useCurrentProject(), { wrapper })

    expect(result.current.currentProject).toEqual({})
    expect(result.current.currentHotel).toEqual({})
  })

  it('should dispatch setCurrentProject and setCurrentHotel actions', () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useCurrentProject(), { wrapper })

    act(() => {
      result.current.setCurrentProject({ id: 1, name: 'Test Project' })
      result.current.setCurrentHotel({ id: 1, name: 'Test Hotel' })
    })

    expect(store.getState().currentProject.project).toEqual({
      id: 1,
      name: 'Test Project'
    })
    expect(store.getState().currentProject.hotel).toEqual({
      id: 1,
      name: 'Test Hotel'
    })
  })
  it('updates when the state of the Redux store changes', () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useCurrentProject(), { wrapper })

    act(() => {
      store.dispatch(
        SET_CURRENT_PROJECT({ project: { id: 2, name: 'New Project' } })
      )
      store.dispatch(SET_CURRENT_HOTEL({ hotel: { id: 2, name: 'New Hotel' } }))
    })

    expect(result.current.currentProject).toEqual({
      id: 2,
      name: 'New Project'
    })
    expect(result.current.currentHotel).toEqual({ id: 2, name: 'New Hotel' })
  })
})
