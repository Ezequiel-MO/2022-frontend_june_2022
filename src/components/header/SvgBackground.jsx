import header_image from '../../assets/header_image.jpg'

export const SvgBackground = () => {
  return (
    <>
      <div className='absolute top-0 right-0 flex w-full h-full'>
        <div className='w-1/3 h-full bg-white-50'></div>
        <div className='relative w-1/3'>
          <svg
            fill='currentColor'
            viewBox='0 0 100 100'
            className='absolute inset-y-0 z-20 h-full text-white-50'
          >
            <polygon id='diagonal' points='0,0 100,0 50,100 0,100'></polygon>
          </svg>
          <svg
            fill='currentColor'
            viewBox='0 0 100 100'
            className='absolute inset-y-0 z-10 h-full ml-6 text-white opacity-50'
          >
            <polygon points='0,0 100,0 50,100 0,100'></polygon>
          </svg>
        </div>
      </div>
      <img
        alt='Backoffice header'
        className='object-cover h-full w-full z-10'
        src={header_image}
      />
    </>
  )
}
