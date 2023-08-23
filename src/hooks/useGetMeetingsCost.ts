import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'
import { IDay } from '../interfaces/project'
import { IMeeting } from '../interfaces'

export const useGetMeetingsCost = (): { meetingTotalCost: number } => {
  const { hotelName, schedule } = useBudget() as {
    hotelName: string
    schedule: IDay[]
  }
  const [meetingTotalCost, setMeetingTotalCost] = useState<number>(0)

  useEffect(() => {
    let totalCost = 0
    schedule.forEach((day: IDay) => {
      const { morningMeetings, afternoonMeetings, fullDayMeetings } = day
      const meetings: IMeeting[] = [
        ...morningMeetings.meetings,
        ...afternoonMeetings.meetings,
        ...fullDayMeetings.meetings
      ]
      meetings.forEach((meeting: IMeeting) => {
        if (meeting.hotelName === hotelName) {
          totalCost += meeting.totalCost || 0
        }
      })
    })
    setMeetingTotalCost(totalCost)
  }, [schedule, hotelName])

  return {
    meetingTotalCost
  }
}
