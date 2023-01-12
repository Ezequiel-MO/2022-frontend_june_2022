export const VendorList = ({ vendors, setLocation }) => {
  return (
    <div className='controls opacity-80 overflow-y-scroll no-scrollbar'>
      {vendors.map((vendor, index) => {
        return (
          <div
            key={index}
            className='cursor-pointer px-2 m-1 bg-gray-200 text-black-50 rounded-md hover:bg-[#f5f5f5]'
            onClick={() => {
              setLocation({
                place: vendor.place,
                coords: vendor.coords
              })
            }}
          >
            {vendor.place}
          </div>
        )
      })}
    </div>
  )
}
