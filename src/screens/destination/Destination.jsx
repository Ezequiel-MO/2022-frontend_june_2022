import { useEffect } from 'react'
import {
  DestinationDescription,
  DestinationFacts,
  DestinationGallery,
  DestinationHeader,
  DestinationTable
} from '../../components/destination'
import { useCurrentProject, useGetLocation } from '../../hooks'

export const Destination = () => {
  const { currentProject } = useCurrentProject()
  const { groupLocation } = currentProject || {}
  const { selectedOption, loading } = useGetLocation(groupLocation)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto px-4 text-white-0'>
      <DestinationHeader />
      <DestinationDescription locationObj={selectedOption} />
      <DestinationFacts />
      <DestinationTable />
      <DestinationGallery locationObj={selectedOption} />
    </div>
  )
}
