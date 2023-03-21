import switch_off from '../../assets/switch_off.svg'

export const LogoutButton = ({ isDarkMode, logUserOut }) => {
  function log_out() {
    localStorage.removeItem('userIsLogged')
    logUserOut()
  }

  return (
    <div
      className='absolute top-20 left-5 z-50 cursor-pointer'
      onClick={log_out}
    >
      <img
        className='w-10 h-10 rounded-full transition-all duration-500 ease-out hover:scale-105'
        src={isDarkMode ? switch_off : switch_off}
        alt='light/dark mode'
      />
    </div>
  )
}
