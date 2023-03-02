import { Link } from 'react-scroll'

export const HotelSubtitles = ({
  title,
  menuOpen,
  setMenuOpen,
  hotels,
  activeTab,
  handleChange
}) => {
  if (!hotels?.length) return null
  return (
    <Link
      to={`${title}._id`}
      spy={true}
      smooth={true}
      duration={700}
      offset={-100}
      className={`${
        menuOpen
          ? 'inline-block transition-all ease-in-out duration-300'
          : 'opacity-0 h-0'
      }`}
    >
      {title === 'hotels' && (
        <div
          className={`${
            menuOpen ? 'flex flex-col' : 'hidden'
          } bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 space-y-4 p-4 ml-4 hover:shadow-lg`}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          {hotels?.map((hotel, index) => (
            <p
              onClick={() => handleChange(index + 1)}
              key={index}
              className={`${
                activeTab === index + 1 ? 'text-white-100' : ''
              } text-gray-700 font-medium hover:text-orange-500 cursor-pointer text-sm`}
            >
              {hotel?.name.replace(/^\w/, (c) => c.toUpperCase())}
            </p>
          ))}
        </div>
      )}
    </Link>
  )
}
