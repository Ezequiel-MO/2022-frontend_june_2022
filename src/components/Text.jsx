const ParagraphText = ({ text }) => {
  return (
    <p className='text-black-50 dark:text-white-50 whitespace-pre-line indent-2'>
      {JSON.stringify(text)
        .replace(/\\/g, '')
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/"/g, '')}
    </p>
  )
}

export default ParagraphText
