export const VendorList = ({ vendors, setLocation }) => {
  return (
    <div className='controls opacity-80'>
      {vendors.map((vendor, index) => {
        return (
          <div
            key={index}
            className='cursor-pointer p-2 '
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
