import { CoordItem, Coords } from './MapLogic'

interface Props {
  vendors: CoordItem[]
  setLocation: (location: { place: string; coords: Coords }) => void
  onVendorClick?: (vendor: CoordItem) => void
  onShowAllVendors?: () => void
}

export const VendorList = ({
  vendors,
  setLocation,
  onVendorClick,
  onShowAllVendors
}: Props) => {
  const handleVendorClick = (vendor: CoordItem) => {
    setLocation({
      place: vendor.place,
      coords: vendor.coords
    })
    onVendorClick && onVendorClick(vendor)
  }

  const handleShowAllVendors = () => {
    onShowAllVendors && onShowAllVendors()
  }

  return (
    <div className='controls bg-transparent text-black-50 p-4 overflow-y-auto'>
      {vendors.map((vendor, index) => {
        return (
          <div
            key={index}
            className='cursor-pointer px-4 py-2 my-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-200 ease-in overflow-x-hidden'
            onClick={() => handleVendorClick(vendor)}
          >
            {vendor.place}
          </div>
        )
      })}
      <div
        className='cursor-pointer px-4 py-2 my-2 bg-gray-100 rounded-full font-bold hover:text-orange-500  hover:bg-gray-200 transition duration-200 ease-in'
        onClick={handleShowAllVendors}
      >
        Show all vendors
      </div>
    </div>
  )
}
