import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IHotel, IProject } from '../../interfaces'

interface CurrentProjectState {
  project: IProject
  hotel: IHotel | {}
}

const initialState: CurrentProjectState = {
  project: JSON.parse(localStorage.getItem('currentProject') || '{}'),
  hotel: {}
}

export const currentProjectSlice = createSlice({
  name: 'currentProject',
  initialState,
  reducers: {
    SET_CURRENT_PROJECT: (
      state,
      action: PayloadAction<{ project: IProject }>
    ) => {
      const { project } = action.payload
      state.project = project
    },
    SET_CURRENT_HOTEL: (state, action: PayloadAction<{ hotel: IHotel }>) => {
      const { hotel } = action.payload
      state.hotel = hotel
    }
  }
})

export const { SET_CURRENT_PROJECT, SET_CURRENT_HOTEL } =
  currentProjectSlice.actions

export const selectCurrentProject = (state: {
  currentProject: CurrentProjectState
}) => state.currentProject.project
export const selectCurrentHotel = (state: {
  currentProject: CurrentProjectState
}) => state.currentProject.hotel

export default currentProjectSlice.reducer
