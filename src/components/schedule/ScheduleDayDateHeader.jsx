import { convertDate } from './helpers'

export const DateHeader = ({ date, index, arrivalDay }) => {
  const formattedDate = convertDate(index, arrivalDay)
  return (
    <h2 className='text-lg md:text-xl mb-4 font-extrabold' id={`day_${index}`}>
      {date} - {formattedDate}
    </h2>
  )
}
