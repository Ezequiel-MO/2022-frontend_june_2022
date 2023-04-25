import {
  DestinationDescription,
  DestinationFacts,
  DestinationGallery,
  DestinationHeader,
  DestinationTable
} from '../components/destination'

const Destination = () => {
  return (
    <div className='container mx-auto px-4'>
      <DestinationHeader />
      <DestinationDescription />
      <DestinationFacts />
      <DestinationTable />
      <DestinationGallery />
    </div>
  )
}

export default Destination
