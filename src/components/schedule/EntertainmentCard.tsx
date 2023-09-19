import { IEntertainment } from '../../interfaces'

interface Props {
  entertainment: IEntertainment
}

export const EntertainmentCard = ({ entertainment }: Props) => {
  return (
    <div>
      <p>{entertainment.name}</p>
    </div>
  )
}
