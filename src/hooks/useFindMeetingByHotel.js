import { useState, useEffect } from 'react'

export const useFindMeetingByHotel = (meetings, hotel) => {
  const [meeting, setMeeting] = useState(meetings ? meetings[0] : {})

  useEffect(() => {
    if (meetings) {
      meetings.forEach((meeting) => {
        if (meeting.hotel[0] === hotel._id) {
          setMeeting(meeting)
        }
      })
    }
  }, [meetings, hotel])
  return {
    meeting
  }
}
