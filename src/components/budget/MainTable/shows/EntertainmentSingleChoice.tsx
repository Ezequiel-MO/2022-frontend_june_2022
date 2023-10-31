import { useEffect } from 'react'
import { useBudget } from '../../../../hooks'
import { IEntertainment, IRestaurant } from '../../../../interfaces'

interface Props {
  options: IEntertainment[]
  selectedRestaurant: IRestaurant
  date: string
  id: 'dinner' | 'lunch'
}

export const EntertainmentSingleChoice: React.FC<Props> = ({
  options,
  selectedRestaurant,
  date,
  id
}) => {
  const { setCurrentShows } = useBudget()

  useEffect(() => {
    setCurrentShows(date, id, selectedRestaurant._id, options[0]._id)
  }, [options[0], id])
  return <>{options[0].name}</>
}
