import header_image from '../../assets/header_image.jpg'

export const SvgBackground = ({ hasExternalCorporateImage }) => {
  return (
    <>
      <div className={`absolute top-0 right-0 w-full h-full hidden sm:flex`}>
        <div className='w-1/3 h-full '></div>
        <div className='relative w-1/3'>
          <svg
            fill='currentColor'
            viewBox='0 0 100 100'
            className='absolute inset-y-0 z-40 h-full text-secondary'
          >
            <polygon id='diagonal' points='0,0 100,0 50,100 0,100'></polygon>
          </svg>
          <svg
            fill='currentColor'
            viewBox='0 0 100 100'
            className='absolute inset-y-0 z-70 h-full ml-6 text-white opacity-50'
          >
            <polygon points='0,0 100,0 50,100 0,100'></polygon>
          </svg>
        </div>
      </div>
      {
        <img
          alt='Backoffice header'
          className='object-cover h-full w-full z-10 hidden md:block'
          src={header_image}
        />
      }
    </>
  )
}
