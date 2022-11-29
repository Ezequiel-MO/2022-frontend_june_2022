import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  project: JSON.parse(localStorage.getItem('currentProject')) || {},
  hotel: {}
}

export const currentProjectSlice = createSlice({
  name: 'currentProject',
  initialState,
  reducers: {
    SET_CURRENT_PROJECT: (state, action) => {
      const { project } = action.payload
      state.project = project
    },
    SET_CURRENT_HOTEL: (state, action) => {
      const { hotel } = action.payload
      state.hotel = hotel
    }
  }
})

export const { SET_CURRENT_PROJECT, SET_CURRENT_HOTEL } =
  currentProjectSlice.actions

export const selectCurrentProject = (state) => state.currentProject.project
export const selectCurrentHotel = (state) => state.currentProject.hotel

export default currentProjectSlice.reducer
