import {
  DestinationDescription,
  DestinationFacts,
  DestinationGallery,
  DestinationHeader,
  DestinationTable
} from '../../components/destination'
import { useCurrentProject, useGetLocation } from '../../hooks'
import { IProject } from '../../interfaces'
import { ILocation } from '../../interfaces/location'
import Spinner from '../../ui/spinner/Spinner'

export const Destination = () => {
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { groupLocation } = currentProject || {}
  const { selectedOption, loading } = useGetLocation(groupLocation)

  if (loading || !selectedOption || !selectedOption?.imageContentUrl) {
    return loading ? <Spinner /> : null
  }

  return (
    <div className='container mx-auto px-4 text-white-0'>
      <DestinationHeader groupLocation={groupLocation} />
      <DestinationDescription locationObj={selectedOption as ILocation} />
      <DestinationFacts locationObj={selectedOption as ILocation} />
      <DestinationTable locationObj={selectedOption as ILocation} />
      <DestinationGallery images={selectedOption.imageContentUrl} />
    </div>
  )
}
