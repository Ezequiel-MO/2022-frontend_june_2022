import { useRef } from 'react'
import { Icon } from '@iconify/react'
import ReactToPrint from 'react-to-print'
import Hotels from './hotels/Hotels'
import { Schedule } from './schedule'
import { useCurrentProject, useFontFamily } from '../hooks'
import Budget from './budget/Budget'
import ScrollToTopButton from '../ui/ScrollToTopButton'
import ParagraphText from './Text'
import { PartialCosts } from './budget'

const MainSection = () => {
  const componentRef = useRef()

  const { currentProject } = useCurrentProject()
  const { groupName, projectIntro, hotels, clientCompany, hasBudget } =
    currentProject
  const { fonts = [], colorPalette = [] } = clientCompany[0] || {}

  const iconColor = colorPalette.length > 0 ? colorPalette[2] : '#ea5933'

  const fontFamilyStyle = useFontFamily(fonts[0])

  return (
    <div className={`${fontFamilyStyle} col-span-10 lg:col-span-8`}>
      {/*   <ScrollToTop smooth color='#ea5933' width='30' height='30' /> */}
      <h1 className='text-2xl md:text-2xl mb-4 font-extrabold'>
        {`Quotation for Gr. ${groupName}`}
      </h1>
      <ParagraphText text={projectIntro} />
      <Hotels hotels={hotels} />
      <Schedule />
      {hasBudget ? (
        <div>
          <ReactToPrint
            trigger={() => (
              <button className='flex flex-row items-center mb-2 py-4'>
                <span>
                  <Icon
                    icon='ant-design:file-pdf-twotone'
                    color={`${
                      colorPalette.length > 0 ? colorPalette[2] : '#ea5933'
                    }`}
                    width='40'
                  />
                </span>
                Print the Budget to a PDF
              </button>
            )}
            content={() => componentRef.current}
          />
          <Budget ref={componentRef} />
          <PartialCosts colorPalette={colorPalette} />
        </div>
      ) : null}

      <ScrollToTopButton iconColor={iconColor} />
    </div>
  )
}

export default MainSection
