import { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Icon } from '@iconify/react'
import { Destination } from '../../screens/destination/Destination'

export const BackdropModal = ({ open, handleClose }) => {
  const [showContent, setShowContent] = useState(false)
  const [showDestination, setShowDestination] = useState(false)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShowContent(true)
        setTimeout(() => {
          setShowDestination(true)
        }, 1000)
      }, 100)
    } else {
      setShowDestination(false)
      setTimeout(() => {
        setShowContent(false)
      }, 1000)
    }
  }, [open])

  const handleCloseWithAnimation = () => {
    setShowDestination(false)
    setShowContent(false)
    setTimeout(() => {
      handleClose()
    }, 1000)
  }

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleCloseWithAnimation}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Box
        className={`absolute top-0 left-0 w-full h-full bg-black-50 bg-opacity-0 border-2 border-black-50 shadow-lg p-4 transition-transform duration-1000 overflow-y-auto backdrop-blur-md ${
          showContent ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Icon
          icon='ant-design:close-circle-outlined'
          color='#fff'
          width='60'
          className='absolute top-10 right-20 cursor-pointer'
          onClick={handleCloseWithAnimation}
        />
        {showDestination && <Destination />}
      </Box>
    </Modal>
  )
}
