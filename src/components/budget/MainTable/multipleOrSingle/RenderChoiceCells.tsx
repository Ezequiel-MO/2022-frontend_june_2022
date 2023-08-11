import { SingleChoiceCells, MultipleChoiceCells } from '.'
import { IEvent, IRestaurant } from '../../../../interfaces'

interface RenderChoiceCellsProps {
  multipleChoice: boolean
  props: {
    pax: number
    date: string
    options: IEvent[] | IRestaurant[]
    description: string
    id: string
  }
}

export const RenderChoiceCells = ({
  multipleChoice,
  props
}: RenderChoiceCellsProps) => {
  if (multipleChoice) {
    return <MultipleChoiceCells {...props} />
  }
  return <SingleChoiceCells {...props} />
}
