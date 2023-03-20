import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef } from 'react'

export const RichParagraph = ({ text = '' }) => {
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
    <div className='ql-container ql-snow border-0'>
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
