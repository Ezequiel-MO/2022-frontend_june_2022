export const UserAvatar = ({
  userIsLoggedIn,
  currentProject,
  setDropdownActive,
  dropdownActive
}) => {
  const { accountManager = [] } = currentProject
  const { imageContentUrl = [] } = accountManager[0] || {}

  return (
    <div
      className='absolute top-1 right-1 z-50 '
      onMouseEnter={() => setDropdownActive(true)}
      onMouseLeave={() => setDropdownActive(false)}
    >
      {userIsLoggedIn && imageContentUrl.length > 0 ? (
        <img
          className='w-16 h-16 rounded-full transition-all duration-500 hover:scale-105 cursor-pointer object-fill'
          src={imageContentUrl[0]}
          alt='Rounded avatar'
          onMouseLeave={() => setDropdownActive(false)}
          onClick={() => setDropdownActive(!dropdownActive)}
        />
      ) : null}
    </div>
  )
}
