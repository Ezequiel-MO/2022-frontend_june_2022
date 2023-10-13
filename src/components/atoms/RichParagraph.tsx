import React, { useEffect, useRef, useState } from 'react'
import { useCurrentProject, useFontFamily } from '../../hooks'
import './RichParagraph.module.css'
import { Icon } from '@iconify/react'
import { IClientCompany, IProject } from '../../interfaces'

interface RichParagraphProps {
  text: string
}

export const RichParagraph: React.FC<RichParagraphProps> = ({ text = '' }) => {
  const [isCopied, setIsCopied] = useState(false)

  if (!text) {
    return null
  }

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

  const handleCopyClick = async () => {
    if (ref.current) {
      const range = document.createRange()
      range.selectNode(ref.current)
      window.getSelection()?.removeAllRanges()
      window.getSelection()?.addRange(range)

      try {
        const textToCopy = window.getSelection()?.toString() || ''
        await navigator.clipboard.writeText(textToCopy)
        console.log('Text successfully copied to clipboard')
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000) // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }

      window.getSelection()?.removeAllRanges()
    }
  }

  return (
    <div
      className='relative hover:border hover:border-1 hover:border-dashed hover:cursor-pointer mt-5 rounded-lg py-5 px-2 md:py-7 md:px-4 lg:py-10 lg:px-6'
      onClick={handleCopyClick} // Added this line
    >
      <div
        ref={ref}
        className={`${fontFamilyStyle} custom-font text-base dark:text-white-0 md:text-lg lg:text-xl`}
        dangerouslySetInnerHTML={{ __html: cleanedText }}
      ></div>

      <button
        onClick={(e) => {
          e.stopPropagation() // Prevent the click event from bubbling up to the parent div
          handleCopyClick()
        }}
        className='absolute -top-8 -right-2 p-2 bg-gray-800 rounded-lg hover:bg-gray-500 hover:text-black-50 w-24 md:w-28 lg:w-32 flex items-center justify-between'
      >
        <span className='ml-2 text-sm md:text-base lg:text-lg'>
          {isCopied ? 'Copied' : 'Copy'}
        </span>
        <Icon
          icon={isCopied ? 'mdi:check' : 'mdi:content-copy'}
          width={25}
          color={isCopied ? '#00ff00' : '#ffffff'}
        />
      </button>
    </div>
  )
}
