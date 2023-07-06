import {
  DestinationDescription,
  DestinationFacts,
  DestinationGallery,
  DestinationHeader,
  DestinationTable
} from '../../components/destination'

export const Destination = () => {
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
