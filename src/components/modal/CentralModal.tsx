import React, { ReactNode } from 'react'
import OverviewTable from '../overview/OverviewTable'
import { MapWrapper } from '../vendor_map/Wrapper'

interface CentralModalProps {
  open: boolean
  handleClose: () => void
  typeOfModal: 'Map' | 'Overview' | 'Briefing' | 'PDFViewer' | string
  children?: ReactNode
}

const CentralModal: React.FC<CentralModalProps> = ({
  open,
  handleClose,
  typeOfModal,
  children
}) => {
  if (!open) return null

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const modalSizeClass = ['Map', 'PDFViewer'].includes(typeOfModal)
    ? 'w-[95%] h-[90%]'
    : 'max-w-lg w-full'

  return (
    <div
      className={`z-[300] fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ${
        !open ? 'hidden' : ''
      }`}
      onClick={handleClose}
    >
      <div
        className={`${modalSizeClass} p-4 bg-secondary rounded-lg shadow-xl overflow-auto`}
        onClick={handleModalClick}
      >
        <h2 className='text-lg font-semibold text-gray-800 mb-2'>
          {typeOfModal}
        </h2>
        {typeOfModal === 'Map' && <MapWrapper />}
        {typeOfModal === 'Overview' && <OverviewTable />}
        {children}
      </div>
    </div>
  )
}

export default CentralModal
