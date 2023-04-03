import { SingleChoiceCells, MultipleChoiceCells } from './'

export const RenderChoiceCells = ({ multipleChoice, props }) => {
  if (multipleChoice) {
    return <MultipleChoiceCells {...props} />
  }
  return <SingleChoiceCells {...props} />
}
