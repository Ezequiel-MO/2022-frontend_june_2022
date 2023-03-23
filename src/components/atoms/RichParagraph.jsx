import React from 'react'
import { useCurrentProject, useFontFamily } from '../../hooks'
import './custom-quill-styles.css'

export const RichParagraph = ({ text = '' }) => {
  const { currentProject } = useCurrentProject()
  const { clientCompany } = currentProject
  const { fonts = [] } = clientCompany[0] || {}

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

  return (
    <div
      style={{
        fontSize: '15px',
        fontFamily: fonts[0]
      }}
      className={`${fontFamilyStyle} custom-font`}
      dangerouslySetInnerHTML={{ __html: cleanedText }}
    ></div>
  )
}
