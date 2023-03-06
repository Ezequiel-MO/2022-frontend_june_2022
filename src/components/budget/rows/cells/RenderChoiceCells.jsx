import { MultipleChoiceCells } from './MultipleChoiceCells'
import { SingleChoiceCells } from './SingleChoiceCells'

export const RenderChoiceCells = ({ multipleChoice, props }) => {
  if (multipleChoice) {
    return <MultipleChoiceCells {...props} />
  }
  return <SingleChoiceCells {...props} />
}
