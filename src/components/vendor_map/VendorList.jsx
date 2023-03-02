export const VendorList = ({
  vendors,
  setLocation,
  onVendorClick,
  onShowAllVendors
}) => {
  const handleVendorClick = (vendor) => {
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
    <div className='controls opacity-80 overflow-y-scroll no-scrollbar'>
      {vendors.map((vendor, index) => {
        return (
          <div
            key={index}
            className='cursor-pointer px-2 m-1 bg-gray-200 text-black-50 rounded-md hover:bg-[#f5f5f5]'
            onClick={() => handleVendorClick(vendor)}
          >
            {vendor.place}
          </div>
        )
      })}
      <div
        className='cursor-pointer px-2 m-1 bg-gray-200 text-black-50 rounded-md hover:bg-[#f5f5f5]'
        onClick={handleShowAllVendors}
      >
        Show all vendors
      </div>
    </div>
  )
}
