import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentProject,
  selectCurrentHotel,
  SET_CURRENT_PROJECT,
  SET_CURRENT_HOTEL
} from '../redux/features/currentProjectSlice'

export const useCurrentProject = () => {
  const dispatch = useDispatch()
  const currentProject = useSelector(selectCurrentProject)
  const currentHotel = useSelector(selectCurrentHotel)
  const setCurrentProject = (project) =>
    dispatch(SET_CURRENT_PROJECT({ project }))
  const setCurrentHotel = (hotel) => dispatch(SET_CURRENT_HOTEL({ hotel }))

  return {
    currentProject,
    currentHotel,
    setCurrentProject,
    setCurrentHotel
  }
}
