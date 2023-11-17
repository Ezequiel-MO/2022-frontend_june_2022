import { OptionSelect } from '../../multipleOrSingle'
import accounting from 'accounting'
import { IGift } from '../../../../../interfaces'

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
      <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
        <td></td>
        <td>Proposed Gifts</td>
        <td>
          <OptionSelect
            options={gifts}
            value={selectedGift?.name || gifts[0]?.name}
            handleChange={handleChange}
          />
        </td>
        <td> {selectedGift.qty}</td>
        <td>{accounting.formatMoney(selectedGift.price, '€')}</td>
        <td>
          {accounting.formatMoney(
            (selectedGift.qty ?? nrPax) * selectedGift.price,
            '€'
          )}
        </td>
      </tr>
    </>
  )
}
