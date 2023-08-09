import { Typography, Modal, Box } from '@mui/material'
import OverviewTable from '../overview/OverviewTable'
import { MapWrapper } from '../vendor_map/Wrapper'

const CentralModal = ({ open, handleClose, typeOfModal }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          typeOfModal={typeOfModal}
          className={` ${
            typeOfModal === 'Overview' ? 'h-max' : ''
          } absolute top-5 left-5 right-5 bottom-5 md:left-[50px] md:right-[50px] lg:left-[150px] lg:right-[150px] lg:bottom-5 lg:top-2 overflow-hidden`}
        >
          <Typography
            variant='h6'
            component='h2'
            className='ttext-white-100 indent-2 '
          >
            {typeOfModal}
          </Typography>
          {typeOfModal === 'Map' ? (
            <MapWrapper />
          ) : /*  <SearchBar /> */

          typeOfModal === 'Overview' ? (
            <OverviewTable />
          ) : null}
          {/*  {typeOfModal === "Map" ? (
            <Map />
          ) : typeOfModal === "Overview" ? (
            <OverviewTable />
          ) : typeOfModal === "Briefing" ? (
            <Briefing />
          ) : null} */}
        </Box>
      </Modal>
    </div>
  )
}

export default CentralModal
