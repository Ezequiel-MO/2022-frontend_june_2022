import { useMemo } from 'react'
import { CoordItem, VendorMapLogic } from '../MapLogic'
import { filterUniqueCoordinates } from '../../../helpers'

export const useVendorCoords = (
  showAllVendors: boolean,
  clickedVendor: CoordItem | null
) => {
  const { hotelCoords, centralCoords, scheduleCoords } = VendorMapLogic()

  return useMemo(() => {
    const allVendors =
      showAllVendors || clickedVendor?.distance !== null
        ? [centralCoords, hotelCoords, scheduleCoords].flat()
        : [centralCoords, clickedVendor]
    return filterUniqueCoordinates(allVendors)
  }, [
    centralCoords,
    hotelCoords,
    scheduleCoords,
    showAllVendors,
    clickedVendor
  ])
}
