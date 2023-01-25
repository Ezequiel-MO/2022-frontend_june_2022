import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import ReactToPrint from 'react-to-print'
import Hotels from './hotels/Hotels'
import Schedule from './schedule/Schedule'
import { useCurrentProject } from '../hooks'
import Budget from './budget/Budget'
import ScrollToTopButton from '../ui/ScrollToTopButton'
import ParagraphText from './Text'
import { useLocation } from 'react-router-dom'

const MainSection = () => {
  const componentRef = useRef()
  const location = useLocation()

  const { currentProject } = useCurrentProject()
  const { groupName, projectIntro, hotels, corporateImage } = currentProject
  const { fonts = [] } = corporateImage[0] || {}

  useEffect(() => {
    var body = document.body
    if (fonts?.length > 0 && location !== '/') {
      body.style.fontFamily = fonts[0]
    }
  }, [currentProject])
  return (
    <div className='col-span-10 lg:col-span-8'>
      {/*       <ScrollToTop smooth color="#ea5933" width="30" height="30" /> */}
      <h1 className='text-2xl md:text-2xl mb-4 font-extrabold'>
        {`Quotation for Gr. ${groupName}`}
      </h1>
      <ParagraphText text={projectIntro} />
      <Hotels hotels={hotels} />
      <Schedule />
      {currentProject?.hasBudget ? (
        <div>
          <ReactToPrint
            trigger={() => (
              <button className='flex flex-row items-center mb-2 py-4'>
                <span>
                  <Icon
                    icon='ant-design:file-pdf-twotone'
                    color='#ea5933'
                    width='40'
                  />
                </span>
                Print the Budget to a PDF
              </button>
            )}
            content={() => componentRef.current}
          />
          <Budget ref={componentRef} />
        </div>
      ) : null}

      <ScrollToTopButton />
    </div>
  )
}

export default MainSection
