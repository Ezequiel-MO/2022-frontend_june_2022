import { RefObject, useState } from 'react'
import { ModalsRow } from '.'
import CentralModal from '../modal/CentralModal'
import ReactToPrint from 'react-to-print'
import { Icon } from '@iconify/react'
import { useCurrentProject, useLocalStorageItem } from '../../hooks'
import { BackdropModal } from '../modal/BackdropModal'
import { CitiesType, cities } from '../../constants/cities'
import { IProject } from '../../interfaces'
import { ISettings } from '../../interfaces/settings'

interface SidebarSmallProps {
  mainSectionRef: RefObject<HTMLDivElement>
  iconColor: string
  isReady: boolean
}

const SidebarSmall = ({ mainSectionRef, isReady }: SidebarSmallProps) => {
  const [modal, setModal] = useState<
    'closed' | 'overview' | 'map' | 'destination'
  >('closed')

  const handleOpen = (modalType: 'overview' | 'map' | 'destination') =>
    setModal(modalType)

  const handleClose = () => setModal('closed')

  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { clientCompany, hasExternalCorporateImage, groupLocation } =
    currentProject

  const item = useLocalStorageItem('settings', {}) as ISettings
  const primary = item?.colorPalette?.primary

  const colorPalette = hasExternalCorporateImage
    ? clientCompany[0].colorPalette[0]
    : primary

  return (
    <div className='inline'>
      <div className='flex items-center justify-center'>
        {cities.includes(groupLocation as CitiesType) && (
          <ModalsRow
            iconText='bx:world'
            title='destination'
            handleOpen={handleOpen}
          />
        )}

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
              <button className='my-1 flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-black-50 cursor-pointer transition-all duration-200'>
                <Icon
                  icon='ant-design:printer-twotone'
                  width='40'
                  className='text-black-50 dark:text-white-0'
                />
                Generate PDF
              </button>
            )}
            content={() => mainSectionRef.current}
          />
        )}
      </div>
      <div
        style={{
          background: `linear-gradient(90deg, #f0f9ff 0%, ${colorPalette} 50%, #e0fce9 100%)`
        }}
        className='h-4 mt-2 mb-2 w-full'
      ></div>
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
      <BackdropModal open={modal === 'destination'} handleClose={handleClose} />
    </div>
  )
}

export default SidebarSmall
