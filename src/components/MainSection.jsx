import { useRef } from 'react'
import { Icon } from '@iconify/react'
import ReactToPrint from 'react-to-print'
import Hotels from './hotels/Hotels'
import { Schedule } from './schedule'
import { useCurrentProject, useFontFamily } from '../hooks'
import Budget from './budget/Budget'
import ScrollToTopButton from '../ui/ScrollToTopButton'
import { PartialCosts } from './budget'
import { useTranslation } from '../translations/translationContext'
import { RichParagraph } from './atoms/RichParagraph'

const MainSection = () => {
  const componentRef = useRef()

  const { currentProject } = useCurrentProject()
  const { groupName, projectIntro, hotels, clientCompany, budget } =
    currentProject
  const { t } = useTranslation()
  const { fonts = [], colorPalette = [] } = clientCompany[0] || {}

  const iconColor = colorPalette.length > 0 ? colorPalette[2] : '#ea5933'

  const fontFamilyStyle = useFontFamily(fonts[0])

  return (
    <div
      className={`${fontFamilyStyle} col-span-10 lg:col-span-8 relative z-0`}
    >
      <h1 className='text-2xl md:text-2xl mb-4 font-extrabold'>
        {`${t('quotation')} Gr. ${groupName}`}
      </h1>
      <RichParagraph text={projectIntro} />
      <Hotels hotels={hotels} />
      <Schedule />
      {budget === 'budget' ? (
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
                {t('budgetPrint')}
              </button>
            )}
            content={() => componentRef.current}
          />
          <Budget ref={componentRef} />
          <PartialCosts colorPalette={colorPalette} />
        </div>
      ) : budget === 'budgetAsPdf' ? (
        <p>pdf here</p>
      ) : /* <PDFBudgetViewer pdfUrl={currentProject.imageContentUrl[0]} /> */

      null}

      <ScrollToTopButton iconColor={iconColor} />
    </div>
  )
}

export default MainSection
