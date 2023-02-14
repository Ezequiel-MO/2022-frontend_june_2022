const ParagraphText = ({ text = '' }) => {
  const textArray = JSON.stringify(text)
    .replace(/\\/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/"/g, '')

  return (
    <p className='text-black-50 dark:text-white-50 whitespace-pre-line indent-2'>
      {textArray}
    </p>
  )
}

export default ParagraphText
