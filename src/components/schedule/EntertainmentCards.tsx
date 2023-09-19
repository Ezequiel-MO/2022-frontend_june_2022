import { IEntertainment } from '../../interfaces'
import { EntertainmentCard } from './'

interface Props {
  entertainments: IEntertainment[] | []
}

export const EntertainmentCards = ({ entertainments }: Props) => {
  if (entertainments?.length === 0) return null
  return (
    <>
      {entertainments?.map((entertainment: IEntertainment) => {
        return (
          <div key={entertainment._id}>
            <EntertainmentCard entertainment={entertainment} />
          </div>
        )
      })}
    </>
  )
}
