import { useState, useEffect } from 'react'

export const useFindMeetingByHotel = (meetings, hotelId) => {
  const [meeting, setMeeting] = useState(meetings ? meetings[0] : {})

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
