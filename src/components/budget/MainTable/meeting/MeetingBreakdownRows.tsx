import { MeetingBreakdownRow } from '.'
import { useBudget, useFindMeetingByHotel } from '../../../../hooks'
import { IMeeting } from '../../../../interfaces'
import { Icon } from '@iconify/react'

interface Props {
  pax: number
  dateProp: string
  typeOfMeetingProp:
    | 'Morning Meeting'
    | 'Afternoon Meeting'
    | 'Full Day Meeting'
  meetings: IMeeting[]
  isOpen: boolean
}

export const MeetingBreakdownRows = ({
  pax,
  typeOfMeetingProp,
  meetings,
  isOpen
}: Props) => {
  const { hotelName } = useBudget()

  const { meeting } = useFindMeetingByHotel(meetings, hotelName)

  if (!meeting) return null

  return (
    <>
      <tr
        style={{
          transition: 'all 0.5s ease-in-out',
          maxHeight: isOpen ? '800px' : '0',
          overflow: 'hidden',
          opacity: isOpen ? '1' : '0'
        }}
      >
        <td colSpan={6} className='p-0 bg-transparent'>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <table className='w-full'>
              <tbody className='w-full bg-white-100 dark:bg-[#a9ba9d] relative'>
                <tr>
                  <div className='absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 z-0'>
                    <Icon icon='ph:handshake-thin' width={250} />
                  </div>
                  <table className='w-full'>
                    <thead className='text-white-100 bg-zinc-800'>
                      <tr>
                        <td align='center'>Description</td>
                        <td align='center'>Nr. Units </td>
                        <td align='center'></td>
                        <td align='center'>Unit Cost</td>
                        <td align='center'>Total Cost</td>
                      </tr>
                    </thead>
                    <tbody className='text-[#000]'>
                      {typeOfMeetingProp === 'Full Day Meeting' ? (
                        <>
                          <MeetingBreakdownRow
                            units={1}
                            title='Full Day Rental Rate'
                            rate={meeting?.FDRate || 0}
                          />
                          <MeetingBreakdownRow
                            units={pax}
                            title='Full Day Delegate Rate'
                            rate={meeting?.FDDDR || 0}
                          />
                        </>
                      ) : (
                        <>
                          <MeetingBreakdownRow
                            units={1}
                            title='Half Day Rental Rate'
                            rate={meeting?.HDRate || 0}
                          />
                          <MeetingBreakdownRow
                            units={pax}
                            title='Half Day Delegate Rate'
                            rate={meeting?.HDDDR || 0}
                          />
                        </>
                      )}

                      <MeetingBreakdownRow
                        units={meeting?.coffeeBreakUnits || 0}
                        title='Coffee Breaks'
                        rate={meeting?.coffeeBreakPrice || 0}
                      />
                      <MeetingBreakdownRow
                        units={meeting?.workingLunchUnits || 0}
                        title='Working Lunch'
                        rate={meeting?.workingLunchPrice || 0}
                      />
                      <MeetingBreakdownRow
                        units={meeting?.hotelDinnerUnits || 0}
                        title='Dinner @ Hotel'
                        rate={meeting?.hotelDinnerPrice || 0}
                      />
                      <MeetingBreakdownRow
                        units={1}
                        title='Audio Visuals Package'
                        rate={meeting?.aavvPackage || 0}
                      />
                    </tbody>
                  </table>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </>
  )
}
