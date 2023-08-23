import { useState, useEffect } from 'react'
import { IMeeting } from '../interfaces'

export const useFindMeetingByHotel = (
  meetings: IMeeting[],
  hotelName: string
): { meeting: IMeeting | undefined } => {
  const [meeting, setMeeting] = useState<IMeeting | undefined>(
    meetings && meetings.length ? meetings[0] : undefined
  )

  useEffect(() => {
    if (meetings) {
      const foundMeeting = meetings.find(
        (meeting) => meeting.hotelName === hotelName
      )
      setMeeting(foundMeeting)
    }
  }, [meetings, hotelName])
  return {
    meeting
  }
}
