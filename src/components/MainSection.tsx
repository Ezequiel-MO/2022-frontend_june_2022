import React, { forwardRef, useRef, useState, useEffect, Ref } from 'react'
import { Icon } from '@iconify/react'
import ReactToPrint from 'react-to-print'
import { Hotels } from './schedule/3-cardswrappers/Hotels'
import { useCurrentProject, useFontFamily } from '../hooks'
import ScrollToTopButton from '../ui/ScrollToTopButton'
import { useTranslation } from '../translations/translationContext'
import { RichParagraph } from './atoms/RichParagraph'
import { Document, Page } from 'react-pdf'
import { Budget } from './budget/MainTable/higherComponents'
import { PartialCosts } from './budget/partial-costs'
import { exportTableToExcel } from './budget/MainTable/higherComponents/exportTableToExcel'
import { Gifts } from './schedule/3-cardswrappers/Gifts'
import { Schedule } from './schedule/1-higher-components/Schedule'
import * as styles from '../constants/styles/mainsection'

interface MainSectionProps {
  setIconColor: React.Dispatch<React.SetStateAction<string>>
  onReady: React.Dispatch<React.SetStateAction<boolean>>
  parentWidth: number
}

const MainSection = forwardRef<HTMLDivElement, MainSectionProps>(
  ({ setIconColor, onReady, parentWidth }, ref: Ref<HTMLDivElement>) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const [numPages, setNumPages] = useState<number | null>(null)
    const { currentProject } = useCurrentProject()
    const {
      groupName,
      projectIntro,
      hotels,
      gifts,
      clientCompany,
      budget,
      imageContentUrl,
      multiDestination
    } = currentProject
    const { t } = useTranslation()

    const { fonts = [], colorPalette = [] } = clientCompany[0] || {}
    const iconColor = colorPalette.length > 0 ? colorPalette[2] : '#ea5933'
    const fontFamilyStyle = useFontFamily(fonts[0])
    const pdfToPrintRef = useRef<HTMLDivElement | null>(null)

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
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

    const hasMeaningfulText = (str?: string) => {
      if (!str) return false
      const textContent = str.replace(/<[^>]*>/g, '').trim()
      return textContent.length > 0
    }

    return (
      <div
        ref={ref}
        className={`${fontFamilyStyle} ${styles.mainSectionFrame}`}
      >
        <h1 className={styles.quoteTitle}>
          {`${t('quotation')} Gr. ${groupName}`}
        </h1>
        {hasMeaningfulText(projectIntro[0]) && (
          <RichParagraph text={projectIntro[0]} />
        )}
        {!multiDestination && <Hotels hotels={hotels} />}

        <Schedule />
        <Gifts gifts={gifts} />
        {budget === 'budget' ? (
          <div>
            <div className='flex flex-row items-center'>
              <ReactToPrint
                trigger={() => (
                  <button className='flex flex-row items-center mb-2 py-4 printable-icon'>
                    <span>
                      <Icon
                        icon='ant-design:file-pdf-twotone'
                        color={iconColor}
                        width='40'
                      />
                    </span>
                    {t('budgetPrint')}
                  </button>
                )}
                content={() => componentRef.current}
              />
              <button
                onClick={exportTableToExcel}
                className='flex flex-row items-center ml-2 mb-2 py-4 printable-icon'
              >
                <Icon icon='vscode-icons:file-type-excel' width='40' />
                <span>Export to Excel</span>
              </button>
            </div>

            <Budget ref={componentRef} />
            <PartialCosts colorPalette={colorPalette} />
          </div>
        ) : budget === 'budgetAsPdf' ? (
          <div>
            <ReactToPrint
              trigger={() => (
                <button className='flex flex-row items-center printable-icon'>
                  <span>
                    <Icon
                      icon='ant-design:file-pdf-twotone'
                      color={iconColor}
                      width='40'
                    />
                  </span>
                  {t('budgetPrint')}
                </button>
              )}
              content={() => pdfToPrintRef.current}
            />
            <div ref={pdfToPrintRef} id='budget_id'>
              <Document
                file={imageContentUrl[0]}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_${index + 1}`}>
                    <Page
                      pageNumber={index + 1}
                      canvasBackground='#A9ba9d'
                      width={parentWidth}
                      scale={1}
                      renderMode='canvas'
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ))}
              </Document>
            </div>
          </div>
        ) : null}
        <ScrollToTopButton iconColor={iconColor} />
      </div>
    )
  }
)

export default MainSection
