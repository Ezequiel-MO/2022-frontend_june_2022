export const HeaderDropdownWrapper = ({ children }) => {
  return (
    <div
      onMouseEnter={() => setDropdownActive(true)}
      onMouseLeave={() => setDropdownActive(false)}
      className={`${
        dropdownActive ? 'block' : 'hidden'
      } absolute p-4 top-[112px] right-10 bg-white-100 z-50`}
    >
      {children}
    </div>
  )
}
