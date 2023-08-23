import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { MeetingBreakdownRow, mapTypeOfMeeting } from '.'
import { useBudget, useFindMeetingByHotel } from '../../../../hooks'
import { IMeeting } from '../../../../interfaces'
import { useState } from 'react'
import { Icon } from '@iconify/react'

interface Props {
  pax: number
  dateProp: string
  typeOfMeetingProp:
    | 'Morning Meeting'
    | 'Afternoon Meeting'
    | 'Full Day Meeting'
  meetings: IMeeting[]
}

export const MeetingBreakdownRows = ({
  pax,
  typeOfMeetingProp,
  meetings
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const { hotelName } = useBudget()

  const { meeting } = useFindMeetingByHotel(meetings, hotelName)

  const handleToggleMeetingBreakdown = () => {
    setIsOpen(!isOpen)
  }

  if (!meeting) return null

  return (
    <>
      <tr className='w-full bg-white-100 dark:bg-[#a9ba9d]'>
        <td colSpan={6} className='p-0 bg-transparent'>
          <button
            id='hotel-details'
            className='m-1 py-2 px-4 flex items-center justify-between bg-orange-300 dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-white-0 rounded-md transition duration-500 ease-in-out hover:bg-orange-500 focus:outline-none'
            onClick={handleToggleMeetingBreakdown}
          >
            {isOpen ? 'Hide Meeting Details' : 'Show Meeting Details'}
            {isOpen ? (
              <Icon icon='bxs:up-arrow' color='#ea5933' className='ml-2' />
            ) : (
              <Icon icon='bxs:down-arrow' color='#ea5933' className='ml-2' />
            )}
          </button>
        </td>
      </tr>
      <tr>
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
