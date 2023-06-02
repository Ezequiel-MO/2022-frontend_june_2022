import { useEffect, useRef } from 'react'
import { useCurrentProject, useFontFamily } from '../../hooks'
import './RichParagraph.module.css'

export const RichParagraph = ({ text = '' }) => {
  const { currentProject } = useCurrentProject()
  const { clientCompany } = currentProject
  const { fonts = [] } = clientCompany[0] || {}

  const ref = useRef(null)

  const fontFamilyStyle = useFontFamily(fonts[0])

  const decodeHtmlEntities = (str) => {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = str
    return textarea.value
  }
  const decodedText = decodeHtmlEntities(text)

  const cleanedText = decodedText
    .replace(/t([A-Z\.]|\n\n)/g, '$1')
    .replace(/\\/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

  useEffect(() => {
    if (ref.current) {
      const elements = ref.current.querySelectorAll('*')

      for (const element of elements) {
        element.classList.add('dark:text-white-0')
      }
    }
  }, [cleanedText])

  return (
    <div
      ref={ref}
      style={{
        fontFamily: fonts[0]
      }}
      className={`${fontFamilyStyle} custom-font`}
      dangerouslySetInnerHTML={{ __html: cleanedText }}
    ></div>
  )
}
