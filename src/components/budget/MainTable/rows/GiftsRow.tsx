import { useEffect, useState } from 'react'
import { IGift } from '../../../../interfaces'
import { useBudget, useCurrentProject, useFindByName } from '../../../../hooks'
import { GiftsRowRender } from './GiftsRowRender'

interface Props {
  nrPax: number
}

export const GiftsRow = ({ nrPax }: Props) => {
  const {
    currentProject: { gifts }
  } = useCurrentProject() as { currentProject: { gifts: IGift[] } }

  const { updateCurrentGift, setGifts } = useBudget()
  const [giftName, setGiftName] = useState<string>(gifts[0]?.name || '')

  const { selectedOption: selectedGift } = useFindByName(gifts, giftName)

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setGiftName(e.target.value)
  }

  useEffect(() => {
    setGifts(gifts)
  }, [gifts])

  useEffect(() => {
    updateCurrentGift(selectedGift as IGift)
  }, [selectedGift])

  return (
    <>
      {selectedGift ? (
        <GiftsRowRender
          gifts={gifts}
          nrPax={nrPax}
          handleChange={handleChange}
          selectedGift={selectedGift as IGift}
        />
      ) : null}
    </>
  )
}
