import React, { useEffect, useRef } from 'react'
import { useCurrentProject, useFontFamily } from '../../hooks'
import './RichParagraph.module.css'
import { IClientCompany, IProject } from '../../interfaces'

interface RichParagraphProps {
  text: string
}

export const RichParagraph: React.FC<RichParagraphProps> = ({ text = '' }) => {
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
    .replace(/\\/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

  useEffect(() => {
    if (ref.current) {
      const elements = ref.current.querySelectorAll('*')
      elements.forEach((element: Element) => {
        element.classList.add('dark:text-white')

        if (element.tagName === 'A') {
          element.setAttribute('target', '_blank')
          element.setAttribute('rel', 'noopener noreferrer')

          if (element.textContent === 'VIRTUAL VISIT') {
            element.classList.add('special-link-class')
            element.classList.add('text-blue-500', 'underline')
          }
        }
      })
    }
  }, [cleanedText])

  return (
    <div
      ref={ref}
      className={`${fontFamilyStyle} custom-font text-base dark:text-white-0 border-0`}
      dangerouslySetInnerHTML={{ __html: cleanedText }}
    ></div>
  )
}
