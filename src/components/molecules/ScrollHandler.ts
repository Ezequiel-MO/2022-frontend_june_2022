import { useEffect } from 'react'

interface ScrollHandlerProps {
  setIsSticky: (isSticky: boolean) => void
}

export const ScrollHandler: React.FC<ScrollHandlerProps> = ({
  setIsSticky
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const sidebarSmallHeight = 100
      setIsSticky(window.scrollY > sidebarSmallHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setIsSticky])

  return null
}
