import { forwardRef, useRef, useState } from 'react'
import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import ReactToPrint from 'react-to-print'
import Hotels from './hotels/Hotels'
import { Schedule } from './schedule'
import { useCurrentProject, useFontFamily } from '../hooks'
import ScrollToTopButton from '../ui/ScrollToTopButton'
import { useTranslation } from '../translations/translationContext'
import { RichParagraph } from './atoms/RichParagraph'
import { Document, Page } from 'react-pdf/dist/esm/entry.vite'
import { Budget } from './budget/MainTable/higherComponents'
import { PartialCosts } from './budget/partial-costs/'

const MainSection = forwardRef(
  ({ setIconColor, onReady, parentWidth }, ref) => {
    const componentRef = useRef()
    const [numPages, setNumPages] = useState(null)
    const [pageNumber] = useState(1)
    const { currentProject } = useCurrentProject()
    const {
      groupName,
      projectIntro,
      hotels,
      clientCompany,
      budget,
      imageContentUrl
    } = currentProject
    const { t } = useTranslation()
    const { fonts = [], colorPalette = [] } = clientCompany[0] || {}

    const iconColor = colorPalette.length > 0 ? colorPalette[2] : '#ea5933'

    const fontFamilyStyle = useFontFamily(fonts[0])
    const pdfToPrintRef = useRef()

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages)
    }

    useEffect(() => {
      if (onReady) {
        onReady(true)
      }
    }, [])

    useEffect(() => {
      setIconColor(iconColor)
    }, [iconColor])

    /* useEffect(() => {
    let socket = io(import.meta.env.VITE_BACKEND_URL)
    console.log('socket', socket)
  }, []) */

    return (
      <div
        ref={ref}
        className={`${fontFamilyStyle} col-span-10 lg:col-span-8 z-50 bg-white-0 dark:bg-black-50`}
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
                <button className='flex flex-row items-center mb-2 py-4 printable-icon'>
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
          <div className='page-break-after'>
            <ReactToPrint
              trigger={() => (
                <button className='flex flex-row items-center printable-icon'>
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
              content={() => pdfToPrintRef.current}
            />
            <div ref={pdfToPrintRef}>
              <Document
                file={imageContentUrl[0]}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} width={parentWidth} />
              </Document>
              <p className='page-number'>
                Page {pageNumber} of {numPages}
              </p>
            </div>
          </div>
        ) : null}

        <ScrollToTopButton iconColor={iconColor} />
      </div>
    )
  }
)

export default MainSection
