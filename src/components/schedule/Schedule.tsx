import { useCurrentProject } from '../../hooks'
import { IProject } from '../../interfaces'
import { ScheduleDay } from './ScheduleDay'

export const Schedule = () => {
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { schedule, suplementaryText, arrivalDay } = currentProject

  return (
    <div>
      {schedule?.map((day, index) => (
        <ScheduleDay
          key={day._id}
          day={day}
          index={index}
          suplementaryText={suplementaryText}
          arrivalDay={arrivalDay}
        />
      ))}
    </div>
  )
}
