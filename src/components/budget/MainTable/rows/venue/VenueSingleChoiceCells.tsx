import { useEffect } from 'react'
import { useBudget } from '../../../../../hooks'
import { IRestaurant } from '../../../../../interfaces'

interface Props {
  pax: number
  options: IRestaurant[]
  date: string
  id: 'dinner' | 'lunch'
}

export const VenueSingleChoiceCells = ({ pax, options, date, id }: Props) => {
  const { setCurrentVenues } = useBudget()

  useEffect(() => {
    setCurrentVenues(date, id, options[0]._id)
  }, [options[0], id])

  return <>{options[0].name}</>
}
