import { useBudget } from '../../../../hooks'
import { Icon } from '@iconify/react'
import { IRestaurant } from '../../../../interfaces'
import { useEffect } from 'react'

interface Props {
  options: IRestaurant[]
  option: IRestaurant
  date: string
  id: 'dinner' | 'lunch'
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  nrPax: number
  setNrPax: (pax: number) => void
}

export const VenueMultipleChoice = ({
  options,
  option,
  date,
  id,
  handleChange
}: Props) => {
  const { venueName, setSelectedVenueName, setCurrentVenues, setCurrentMeals } =
    useBudget()

  useEffect(() => {
    if (option.isVenue) {
      setCurrentVenues(date, id, option?._id)
    } else {
      setCurrentMeals(date, id, option?._id)
    }
  }, [option, id, setCurrentVenues, setCurrentMeals])

  return (
    <div className='min-w-[120px] relative'>
      <div className='mx-1 min-w-[15rem]'>
        <select
          value={venueName || options[0].name}
          onChange={(e) => {
            handleChange(e)
            setSelectedVenueName(e.target.value)
          }}
          className='appearance-none bg-white-100 border border-gray-200 rounded-md shadow-sm py-2 pl-3 pr-10 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300'
        >
          {options.map((option) => (
            <option key={option._id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <Icon
          icon='mdi:chevron-down'
          className='printable-icon absolute top-1/2 right-3 text-gray-500 transform -translate-y-1/2 pointer-events-none'
          color='#ea5933'
          width='1em'
          height='1em'
        />
      </div>
    </div>
  )
}
