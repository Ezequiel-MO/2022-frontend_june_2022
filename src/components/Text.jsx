const ParagraphText = ({ text = '' }) => {
  const formattedText = JSON.stringify(text)
    .replace(/\\/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/"/g, '')
    .replace(/\.\s*n/g, '.')

  return (
    <pre
      className='text-black-50 dark:text-white-50 indent-2'
      style={{
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        fontFamily: 'Barlow Condensed, sans-serif'
      }}
    >
      {formattedText}
    </pre>
  )
}

export default ParagraphText
