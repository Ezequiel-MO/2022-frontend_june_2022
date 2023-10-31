import { IEntertainment } from '../../../../interfaces'
import { useState } from 'react'
import { Icon } from '@iconify/react'

interface Props {
  selectedEntertainment: IEntertainment
}

export const EntertainmentBreakdownRows = ({
  selectedEntertainment
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      {/*  <tr>
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
                    <Icon icon='ph:castle-turret-light' width={250} />
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
                  </table>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      {selectedEntertainment?.name} */}
    </>
  )
}
