import { useCurrentProject } from '../../hooks'
import { ScheduleDay } from './ScheduleDay'

export const Schedule = () => {
  const { currentProject } = useCurrentProject()
  const { schedule, suplementaryText, arrivalDay } = currentProject

  const renderSchedule = schedule?.map((day, index) => (
    <ScheduleDay
      key={day._id}
      day={day}
      index={index}
      suplementaryText={suplementaryText}
      arrivalDay={arrivalDay}
    />
  ))

  return <div>{renderSchedule}</div>
}
