import { useEffect, useState } from 'react'
import accounting from 'accounting'
import { IGift } from '../../../../interfaces'
import { TableCell, TableRow } from '@mui/material'
import { OptionSelect } from '../multipleOrSingle'
import { useBudget, useFindByName } from '../../../../hooks'

interface Props {
  gifts: IGift[]
}

export const GiftsRow = ({ gifts }: Props) => {
  const [giftName, setGiftName] = useState<string>(gifts[0]?.name || '')
  const { setGifts, updateCurrentGift } = useBudget()

  const { selectedOption: selectedGift } = useFindByName(gifts, giftName)

  const isSelectedGift = selectedGift && 'qty' in selectedGift

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setGiftName(e.target.value)
  }

  useEffect(() => {
    if (gifts) {
      setGifts(gifts)
    }
    if (isSelectedGift) {
      updateCurrentGift(selectedGift)
    }
  }, [selectedGift])

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
        <TableCell> {isSelectedGift && selectedGift.qty}</TableCell>
        <TableCell>
          {isSelectedGift && accounting.formatMoney(selectedGift.price, '€')}
        </TableCell>
        <TableCell>
          {isSelectedGift &&
            accounting.formatMoney(selectedGift.qty * selectedGift.price, '€')}
        </TableCell>
      </TableRow>
    </>
  )
}
