import { useState, useEffect } from 'react'
import Spinner from '../../ui/spinner/Spinner'
import { Destination } from '../../screens'

interface Props {
  open: boolean
  handleClose: () => void
}

export const BackdropModal = ({ open, handleClose }: Props) => {
  const [showContent, setShowContent] = useState<boolean>(false)
  const [showDestination, setShowDestination] = useState<boolean>(false)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShowContent(true)
        setTimeout(() => {
          setShowDestination(true)
        }, 100)
      }, 100)
    } else {
      setShowDestination(false)
      setTimeout(() => {
        setShowContent(false)
      }, 200)
    }
  }, [open])

  const handleCloseWithAnimation = () => {
    setShowDestination(false)
    setShowContent(false)
    setTimeout(() => {
      handleClose()
    }, 500)
  }

  return (
    <div
      className={`z-[400] fixed top-0 left-0 w-full h-full bg-black-50 bg-opacity-75 border-2 border-white-50 shadow-lg p-4 transition-transform duration-500 overflow-y-scroll no-scrollbar
      backdrop-blur-md ${showContent ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <button
        className='absolute top-10 right-20 text-white-0 cursor-pointer bg-red-500 rounded-full w-16 h-16 flex items-center justify-center hover:bg-red-600 transition-colors duration-300'
        onClick={handleCloseWithAnimation}
      >
        <span className='xs:text-3xl text-4xl font-extrabold'>&times;</span>
      </button>
      {showDestination ? <Destination /> : <Spinner />}
    </div>
  )
}
