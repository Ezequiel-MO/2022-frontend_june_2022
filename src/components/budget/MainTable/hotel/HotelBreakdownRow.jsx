import accounting from 'accounting'

export const HotelBreakdownRow = ({ title, units, rate, nights }) => {
  return (
    <tr className='border-b border-gray-200 hover:bg-gray-100 hover:text-[#000]'>
      <td className='py-3 px-6 text-left whitespace-nowrap'>
        <div className='flex items-center'>
          <span className='font-medium'>{title}</span>
        </div>
      </td>
      <td className='py-3 px-6 text-center'>
        <span
          className={`${
            units !== null
              ? 'bg-orange-50 text-[#fff] font-extrabold py-1 px-3 rounded-full text-sm'
              : null
          }`}
        >
          {units}
        </span>
      </td>
      <td className='py-3 px-6 text-center'>{nights}</td>
      <td className='py-3 px-6 text-center'>
        {accounting.formatMoney(rate, '€')}
      </td>
      <td className='py-3 px-6 text-center'>
        {accounting.formatMoney(units * rate * nights, '€')}
      </td>
    </tr>
  )
}
