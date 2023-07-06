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
    <div
      id={title}
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
          }  dark:bg-green-50 dark:text-black-50 shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 space-y-4 p-4 ml-4 hover:shadow-lg`}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          {hotels?.map((hotel, index) => (
            <Link
              key={index}
              to={`${hotel._id}`}
              spy={true}
              smooth={true}
              duration={700}
              offset={-100}
            >
              <p
                onClick={() => handleChange(index + 1)}
                className={`${
                  activeTab === index + 1 ? 'text-gray-700' : ''
                }  font-medium hover:text-orange-500 cursor-pointer text-sm`}
              >
                {hotel?.name.replace(/^\w/, (c) => c.toUpperCase())}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
