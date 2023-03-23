import { useCurrentProject } from '../hooks'

const ParagraphText = ({ text = '' }) => {
  const { currentProject } = useCurrentProject()
  const { clientCompany } = currentProject
  const { fonts = [] } = clientCompany[0] || {}
  const formattedText = JSON.stringify(text)
    .replace(/\\/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/"/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

  const paragraphs = formattedText.split('.n')

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={`text-black-50 dark:text-white-50 ${
            index === 0 ? 'indent-2' : ''
          }`}
          style={{
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            fontSize: '14px',
            fontFamily: fonts[0]
          }}
        >
          {paragraph.replace(/\.\s*n/g, '.')}
        </p>
      ))}
    </>
  )
}

export default ParagraphText
