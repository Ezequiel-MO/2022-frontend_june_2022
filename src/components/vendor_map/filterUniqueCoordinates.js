export const filterUniqueCoordinates = (vendors) => {
  const uniqueCoordinates = new Set()
  return vendors.filter((vendor) => {
    const key = `${vendor.coords.lat}-${vendor.coords.lng}`
    if (uniqueCoordinates.has(key)) {
      return false
    }
    uniqueCoordinates.add(key)
    return true
  })
}
