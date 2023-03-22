import {
  Footer,
  MainSection,
  Sidebar,
  SidebarModals,
  SidebarSmall
} from '../components'
import { useCurrentProject } from '../hooks'
import { TranslationProvider } from '../translations/translationContext'

const MainPage = () => {
  const { currentProject } = useCurrentProject()
  const { hasSideMenu, clientAccManager = [] } = currentProject
  const { quoteLanguage = 'EN' } = clientAccManager[0] || {}
  return (
    <TranslationProvider quoteLanguage={quoteLanguage}>
      <div className='flex flex-col'>
        {hasSideMenu && <SidebarSmall />}

        <div className='grid grid-cols-12 m-8'>
          {hasSideMenu ? <Sidebar /> : <div className='col-span-2' />}
          <MainSection />
          <SidebarModals />
        </div>
        <Footer />
      </div>
    </TranslationProvider>
  )
}

export default MainPage
