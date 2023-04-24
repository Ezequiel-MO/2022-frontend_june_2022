import { useState } from 'react'
import CentralModal from '../modal/CentralModal'
import { ModalsRow } from './'

const SidebarModals = () => {
  const [modal, setModal] = useState('closed')
  const handleOpen = (string) => setModal(string)
  const handleClose = () => setModal('closed')

  return (
    <div className='hidden lg:col-span-2 px-2 lg:inline'>
      <div className='flex flex-col sticky top-10'>
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
      </div>
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

export default SidebarModals
