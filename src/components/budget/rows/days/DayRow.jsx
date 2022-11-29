import { TableCell, TableRow } from '@mui/material'
import MultipleChoiceCells from '../cells/MultipleChoiceCells'
import SingleChoiceCells from '../cells/SingleChoiceCells'
import TransferCells from '../cells/TransferCells'
import TransferInOutCells from '../cells/TransferInOutCells'

const DayRow = ({ pax, date, options, description, multipleChoice, id }) => {
  const props = {
    pax,
    description,
    options,
    id,
    date
  }

  if (id === 'meetGreet' || id === 'assistance') {
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        <TransferInOutCells
          date={date}
          description={description}
          options={options}
          pax={pax}
          id={id}
        />
      </TableRow>
    )
  }

  if (id === 'transfer_in' || id === 'transfer_out') {
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        <TransferInOutCells
          date={date}
          description={description}
          options={options}
          pax={pax}
          id={id}
        />
      </TableRow>
    )
  }

  if (
    id.startsWith('transfer') &&
    id !== 'transfer_in' &&
    id !== 'transfer_out'
  ) {
    if (
      options[0]?.selectedService === '' ||
      options[0]?.selectedService === undefined
    ) {
      return null
    }
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        <TransferCells {...props} />
      </TableRow>
    )
  }

  if (id === 'morningEvents' || id === 'afternoonEvents') {
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        {multipleChoice === true ? (
          <MultipleChoiceCells {...props} />
        ) : (
          <SingleChoiceCells {...props} />
        )}
      </TableRow>
    )
  }

  if (id === 'lunch' || id === 'dinner') {
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        {multipleChoice === true ? (
          <MultipleChoiceCells {...props} />
        ) : (
          <SingleChoiceCells {...props} />
        )}
      </TableRow>
    )
  }

  return <div></div>
}
export default DayRow
