import { useEffect, useRef } from 'react'
import { useCurrentProject, useFontFamily } from '../../hooks'
import './RichParagraph.module.css'
import { IClientCompany, IProject } from '../../interfaces'

interface RichParagraphProps {
  text?: string
}

export const RichParagraph = ({ text = '' }: RichParagraphProps) => {
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { clientCompany } = currentProject as {
    clientCompany: IClientCompany[]
  }
  const { fonts = [] } = clientCompany[0] as IClientCompany

  const ref = useRef<HTMLDivElement>(null)

  const fontFamilyStyle = useFontFamily(fonts[0])

  const decodeHtmlEntities = (str: string) => {
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
      elements.forEach((element: Element) => {
        element.classList.add('dark:text-white')
      })
    }
  }, [cleanedText])

  return (
    <div
      ref={ref}
      className={`${fontFamilyStyle} custom-font text-base dark:text-white border-0`}
      dangerouslySetInnerHTML={{ __html: cleanedText }}
    ></div>
  )
}
