import { RefObject, useState } from 'react'
import { ModalsRow } from '.'
import CentralModal from '../modal/CentralModal'
import ReactToPrint from 'react-to-print'
import { Icon } from '@iconify/react'
import { useCurrentProject } from '../../hooks'
import { BackdropModal } from '../modal/BackdropModal'
import { cities } from '../../constants/cities'
import { IProject } from '../../interfaces'

interface SidebarSmallProps {
  mainSectionRef: RefObject<HTMLDivElement>
  iconColor: string
  isReady: boolean
}

const SidebarSmall = ({
  mainSectionRef,
  iconColor,
  isReady
}: SidebarSmallProps) => {
  const [modal, setModal] = useState<
    'closed' | 'overview' | 'map' | 'destination'
  >('closed')

  const handleOpen = (modalType: 'overview' | 'map' | 'destination') =>
    setModal(modalType)

  const handleClose = () => setModal('closed')

  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { clientCompany, hasExternalCorporateImage, groupLocation } =
    currentProject

  const colorPalette = hasExternalCorporateImage
    ? clientCompany[0].colorPalette[0]
    : '#EA5933'

  const gradientStyle = {
    background: `linear-gradient(90deg, #f0f9ff 0%, ${colorPalette} 50%, #e0fce9 100%)`,
    height: '1rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    width: '100%'
  }

  return (
    <div className='inline sticky top-0'>
      <div className='flex items-center justify-center'>
        {cities.includes(groupLocation) && (
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
      <div style={gradientStyle}></div>
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
