import { useState, useEffect } from 'react'
import { IMeeting } from '../interfaces'

export const useFindMeetingByHotel = (
  meetings: IMeeting[],
  hotelId: string
): { meeting: IMeeting | null } => {
  const [meeting, setMeeting] = useState<IMeeting | null>(
    meetings && meetings.length ? meetings[0] : null
  )

  useEffect(() => {
    if (meetings) {
      meetings.forEach((meeting) => {
        if (meeting.hotel[0] === hotelId) {
          setMeeting(meeting)
        }
      })
    }
  }, [meetings, hotelId])
  return {
    meeting
  }
}
