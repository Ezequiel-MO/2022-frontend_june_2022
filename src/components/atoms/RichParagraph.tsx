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
  const [showAnimation, setShowAnimation] = useState(false)

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
        setIsCopied(true)
        setShowAnimation(true)
        setTimeout(() => {
          setIsCopied(false)
          setShowAnimation(false)
        }, 2000)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }

      window.getSelection()?.removeAllRanges()
    }
  }

  return (
    <div
      className='group relative hover:border hover:border-3 hover:border-dashed hover:border-gray-950 hover:dark:border-white-0 hover:cursor-pointer mt-5 rounded-lg py-5 px-2 md:py-7 md:px-4 lg:py-10 lg:px-6'
      onClick={handleCopyClick}
    >
      <div
        ref={ref}
        className={`${fontFamilyStyle} custom-font text-base dark:text-white-0 md:text-lg lg:text-xl`}
        dangerouslySetInnerHTML={{ __html: cleanedText }}
      ></div>

      {showAnimation && (
        <div className='absolute top-0 right-0 mt-2 mr-2 flex items-center justify-center w-12 h-12 bg-green-500 rounded-full animate-ping'>
          <Icon icon='akar-icons:check' color='white' width='24' height='24' />
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation()
          handleCopyClick()
        }}
        className='group-hover:visible invisible absolute top-0 right-0 mt-2 mr-2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-500'
      >
        <Icon
          icon={isCopied ? 'akar-icons:check' : 'mdi:content-copy'}
          color={isCopied ? 'green' : 'white'}
          width='24'
          height='24'
        />
      </button>
    </div>
  )
}
