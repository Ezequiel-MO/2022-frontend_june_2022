import { useLayoutEffect, useRef, useState, FC, useEffect } from 'react'
import { Footer, MainSection, Sidebar, SidebarSmall } from '../components'
import { useCurrentProject } from '../hooks'
import { TranslationProvider } from '../translations/translationContext'
import { IProject } from '../interfaces'
import { BudgetProvider } from '../components/budget/context/BudgetContext'
import { ScrollHandler } from '../components/molecules/ScrollHandler'

export const MainPage: FC = () => {
  const [isMainSectionReady, setIsMainSectionReady] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [iconColor, setIconColor] = useState('')
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { hasSideMenu, clientAccManager = [] } = currentProject
  const { quoteLanguage = 'EN' } = clientAccManager[0] || {}
  const mainSectionRef = useRef<HTMLDivElement>(null)
  const [parentWidth, setParentWidth] = useState(0)
  const mainSectionParentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (mainSectionParentRef && mainSectionParentRef.current) {
      setParentWidth(mainSectionParentRef.current.clientWidth)
    }
  }, [mainSectionParentRef])

  useEffect(() => {
    if (currentProject) {
      localStorage.setItem('currentProject', JSON.stringify(currentProject))
    }
  }, [currentProject])

  return (
    <BudgetProvider>
      <TranslationProvider quoteLanguage={quoteLanguage}>
        <ScrollHandler setIsSticky={setIsSticky} />
        <div className='flex flex-col'>
          <SidebarSmall
            mainSectionRef={mainSectionRef}
            iconColor={iconColor}
            isReady={isMainSectionReady}
          />

          <div className='grid grid-cols-12'>
            {hasSideMenu ? (
              <div className={`col-span-2`}>
                <Sidebar isSticky={isSticky} />
              </div>
            ) : (
              <div className='col-span-2' />
            )}
            <div
              ref={mainSectionParentRef}
              className='col-span-10 lg:col-span-8 transition-all duration-300'
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
    </BudgetProvider>
  )
}
