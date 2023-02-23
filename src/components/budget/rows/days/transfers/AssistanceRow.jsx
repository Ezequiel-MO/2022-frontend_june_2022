export const AssistanceRow = ({ items, date }) => {
  const NoAssistance = items.length === 0
  if (NoAssistance) return null
  const Props = {
    date,
    options: items,
    id: 'assistance'
  }
  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>Assistance on Bus</TableCell>
      <TableCell></TableCell>
      <TableCell>{items[0]?.assistance}</TableCell>
    </TableRow>
  )
}
