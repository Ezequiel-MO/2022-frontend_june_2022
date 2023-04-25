export const DestinationGallery = () => {
  return (
    <div className='w-full p-4 grid grid-cols-3 gap-4'>
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className='rounded-lg overflow-hidden bg-gray-200 h-48'
        >
          {/* Replace the div below with an <img> tag when fetching images */}
          <div className='h-full w-full bg-cover bg-center'></div>
        </div>
      ))}
    </div>
  )
}
