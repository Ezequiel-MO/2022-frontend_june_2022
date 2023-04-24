import { Footer, MainSection, Sidebar, SidebarSmall } from '../components'
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
          <div className='relative col-span-10 lg:col-span-8'>
            <MainSection />
          </div>
        </div>
        <Footer />
      </div>
    </TranslationProvider>
  )
}

export default MainPage
