import { useLayoutEffect, useRef, useState } from 'react'
import { Footer, MainSection, Sidebar, SidebarSmall } from '../components'
import { useCurrentProject } from '../hooks'
import { TranslationProvider } from '../translations/translationContext'

export const MainPage = () => {
  const [isMainSectionReady, setIsMainSectionReady] = useState(false)
  const [iconColor, setIconColor] = useState('')
  const { currentProject } = useCurrentProject()
  const { hasSideMenu, clientAccManager = [] } = currentProject
  const { quoteLanguage = 'EN' } = clientAccManager[0] || {}
  const mainSectionRef = useRef()
  const [parentWidth, setParentWidth] = useState(0)
  const mainSectionParentRef = useRef()

  useLayoutEffect(() => {
    if (mainSectionParentRef && mainSectionParentRef.current) {
      setParentWidth(mainSectionParentRef.current.clientWidth)
    }
  }, [mainSectionParentRef])

  return (
    <TranslationProvider quoteLanguage={quoteLanguage}>
      <div className='flex flex-col'>
        <SidebarSmall
          mainSectionRef={mainSectionRef}
          iconColor={iconColor}
          isReady={isMainSectionReady}
        />

        <div className='grid grid-cols-12 m-8'>
          {hasSideMenu ? <Sidebar /> : <div className='col-span-2' />}
          <div
            ref={mainSectionParentRef}
            className='relative col-span-10 lg:col-span-8'
          >
            <MainSection
              ref={mainSectionRef}
              setIconColor={setIconColor}
              onReady={setIsMainSectionReady}
              parentWidth={parentWidth}
            />
          </div>
        </div>
        <Footer />
      </div>
    </TranslationProvider>
  )
}
