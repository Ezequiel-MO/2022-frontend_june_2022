import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { useEffect } from 'react'

export const RichParagraph = ({ text = '' }) => {
  const formattedText = JSON.stringify(text)
    .replace(/\\/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/"/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
  const { quill, quillRef } = useQuill({
    modules: { toolbar: false },
    theme: 'snow',
    readOnly: true
  })
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(formattedText)
    }
  }, [quill, text])

  return (
    <div className='ql-container ql-snow border-0'>
      <div ref={quillRef} className='ql-editor border-0' />
    </div>
  )
}
