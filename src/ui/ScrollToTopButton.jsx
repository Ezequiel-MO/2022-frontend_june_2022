import { useState } from 'react'
import { Icon } from '@iconify/react'

const ScrollToTopButton = ({ iconColor }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', toggleVisible)
  return (
    <button
      onClick={scrollToTop}
      style={{ display: visible ? 'inline' : 'none' }}
    >
      <Icon icon='bxs:up-arrow' color={iconColor} width='30' height='30' />
    </button>
  )
}

export default ScrollToTopButton
