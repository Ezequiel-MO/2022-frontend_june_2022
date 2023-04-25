import { useState } from 'react'
import { ModalsRow } from './'
import CentralModal from '../modal/CentralModal'
import ReactToPrint from 'react-to-print'
import { Icon } from '@iconify/react'

const SidebarSmall = ({ mainSectionRef, iconColor, isReady }) => {
  const [modal, setModal] = useState('closed')
  const handleOpen = (string) => setModal(string)
  const handleClose = () => setModal('closed')

  return (
    <div className='inline sticky top-0'>
      <div className='flex items-center justify-center'>
        <ModalsRow
          iconText='akar-icons:map'
          title='map'
          handleOpen={handleOpen}
        />

        <ModalsRow
          iconText='bi:calendar-check'
          title='overview'
          handleOpen={handleOpen}
        />
        {isReady && (
          <ReactToPrint
            trigger={() => (
              <button className='flex flex-row items-center'>
                <Icon
                  icon='ant-design:printer-twotone'
                  color={iconColor}
                  width='40'
                />
                Generate PDF
              </button>
            )}
            content={() => mainSectionRef.current}
          />
        )}
      </div>
      <div className='h-4 my-2 bg-gradient-to-r from-white-100 via-orange-50 to-green-50 w-full'></div>
      <CentralModal
        open={modal === 'overview'}
        handleClose={handleClose}
        typeOfModal='Overview'
      />
      <CentralModal
        open={modal === 'map'}
        handleClose={handleClose}
        typeOfModal='Map'
      />
    </div>
  )
}

export default SidebarSmall
