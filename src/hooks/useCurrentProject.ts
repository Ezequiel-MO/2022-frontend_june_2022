import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentProject,
  selectCurrentHotel,
  SET_CURRENT_PROJECT,
  SET_CURRENT_HOTEL
} from '../redux/features/currentProjectSlice'
import { IHotel, IProject } from '../interfaces'

interface CurrentProjectHook {
  currentProject: IProject
  currentHotel: IHotel
  setCurrentProject: (project: IProject) => void
  setCurrentHotel: (hotel: IHotel) => void
}

export const useCurrentProject = (): CurrentProjectHook => {
  const dispatch = useDispatch()
  const currentProject = useSelector(selectCurrentProject) as IProject
  const currentHotel = useSelector(selectCurrentHotel) as IHotel
  const setCurrentProject = (project: IProject) =>
    dispatch(SET_CURRENT_PROJECT({ project }))
  const setCurrentHotel = (hotel: IHotel) =>
    dispatch(SET_CURRENT_HOTEL({ hotel }))

  return {
    currentProject,
    currentHotel,
    setCurrentProject,
    setCurrentHotel
  }
}
