import { TableRow, TableCell } from '@mui/material'
import { OptionSelect } from '../multipleOrSingle'
import accounting from 'accounting'
import { IGift } from '../../../../interfaces'

interface Props {
  gifts: IGift[]
  nrPax: number
  handleChange(e: React.ChangeEvent<{ value: string }>): void
  selectedGift: IGift
}

export const GiftsRowRender = ({
  gifts,
  nrPax,
  handleChange,
  selectedGift
}: Props) => {
  return (
    <>
      <TableRow className='dark:bg-[#a9ba9d]'>
        <TableCell></TableCell>
        <TableCell>Proposed Gifts</TableCell>
        <TableCell>
          <OptionSelect
            options={gifts}
            value={selectedGift?.name || gifts[0]?.name}
            handleChange={handleChange}
          />
        </TableCell>
        <TableCell> {selectedGift.qty}</TableCell>
        <TableCell>{accounting.formatMoney(selectedGift.price, '€')}</TableCell>
        <TableCell>
          {accounting.formatMoney(
            (selectedGift.qty ?? nrPax) * selectedGift.price,
            '€'
          )}
        </TableCell>
      </TableRow>
    </>
  )
}
