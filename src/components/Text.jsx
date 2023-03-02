const ParagraphText = ({ text = '' }) => {
  const formattedText = JSON.stringify(text)
    .replace(/\\/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/"/g, '')

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
            fontFamily: 'Barlow Condensed, sans-serif'
          }}
        >
          {paragraph.replace(/\.\s*n/g, '.')}
        </p>
      ))}
    </>
  )
}

export default ParagraphText
