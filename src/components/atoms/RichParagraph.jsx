import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef } from 'react'
import { useCurrentProject, useFontFamily } from '../../hooks'
import './custom-quill-styles.css'

export const RichParagraph = ({ text = '' }) => {
  const { currentProject } = useCurrentProject()
  const { clientCompany } = currentProject
  const { fonts = [] } = clientCompany[0] || {}

  const fontFamilyStyle = useFontFamily(fonts[0])
  const formattedText = JSON.stringify(text)
    .replace(/\\/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/"/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

  const quillRef = useRef()

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(formattedText)
    }
  }, [quillRef, text])

  return (
    <div
      style={{
        fontSize: '14px',
        fontFamily: fonts[0]
      }}
      className={`${fontFamilyStyle} ql-container ql-snow no-border custom-font`}
    >
      <ReactQuill
        ref={quillRef}
        readOnly
        theme='snow'
        modules={{ toolbar: false }}
        className='ql-editor border-0'
      />
    </div>
  )
}
