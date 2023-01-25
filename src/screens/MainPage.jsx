import {
  Footer,
  MainSection,
  Sidebar,
  SidebarModals,
  SidebarSmall
} from '../components'
import { useCurrentProject } from '../hooks'

const MainPage = () => {
  const { currentProject } = useCurrentProject()
  const { hasSideMenu } = currentProject
  return (
    <div className='flex flex-col'>
      {hasSideMenu && <SidebarSmall />}

      <div className='grid grid-cols-12 m-8'>
        {hasSideMenu ? <Sidebar /> : <div className='col-span-2' />}
        <MainSection />
        <SidebarModals />
      </div>
      <Footer />
    </div>
  )
}

export default MainPage
