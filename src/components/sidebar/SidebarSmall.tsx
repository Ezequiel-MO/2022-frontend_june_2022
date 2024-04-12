import { useState } from 'react'
import { ModalsRow } from '.'
import CentralModal from '../modal/CentralModal'
import { Icon } from '@iconify/react'
import { useCurrentProject, useLocalStorageItem } from '../../hooks'
import { BackdropModal } from '../modal/BackdropModal'
import { CitiesType, cities } from '../../constants/cities'
import { IProject } from '../../interfaces'
import { ISettings } from '../../interfaces/settings'
import { useNavigate } from 'react-router-dom'
import baseAPI from '../../axios/axiosConfig'
import Spinner from '../../ui/spinner/Spinner'

const SidebarSmall = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
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

  const handleGeneratePDF = async () => {
    setIsLoading(true)
    try {
      const response = await baseAPI.post('generate-pdf', currentProject, {
        responseType: 'blob'
      })
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
      const pdfUrl = URL.createObjectURL(pdfBlob)

      navigate('/app/pdf', { state: { pdfUrl } })
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
        {isLoading ? (
          <div className='text-center'>
            <Spinner />
            <p>Bear with me, your PDF is being generated ...</p>
          </div>
        ) : (
          <div
            onClick={handleGeneratePDF}
            className='my-1 flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-black-50 cursor-pointer transition-all duration-200'
          >
            <Icon
              icon='ant-design:printer-twotone'
              width='40'
              className={`${
                colorPalette && colorPalette.length > 0
                  ? `text-[${colorPalette[2]}]`
                  : 'text-primary dark:text-tertiary'
              }`}
            />
            <span>PDF</span>
          </div>
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
