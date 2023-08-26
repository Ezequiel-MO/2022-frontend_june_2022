import { useEffect, useState } from 'react'
import { IGift } from '../../../../interfaces'
import { TableCell, TableRow } from '@mui/material'
import { OptionSelect } from '../multipleOrSingle'
import { useBudget, useFindByName } from '../../../../hooks'

interface Props {
  gifts: IGift[]
  pax: number
}

export const GiftsRow = ({ gifts, pax }: Props) => {
  if (!gifts || gifts.length === 0) return null
  const [giftName, setGiftName] = useState<string>(gifts[0].name)
  const { setGifts, updateCurrentGift } = useBudget()

  const { selectedOption: selectedGift } = useFindByName(gifts, giftName)

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setGiftName(e.target.value)
  }

  useEffect(() => {
    if (gifts) {
      setGifts(gifts)
    }
    if (selectedGift && 'qty' in selectedGift) {
      updateCurrentGift(selectedGift)
    }
  }, [selectedGift])

  return (
    <>
      <TableRow className='dark:bg-[#a9ba9d]'>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>
          <OptionSelect
            options={gifts}
            value={selectedGift?.name || gifts[0].name}
            handleChange={handleChange}
          />
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    </>
  )
}
