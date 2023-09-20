import { ArrowIcon } from '../../atoms'

interface Props {
  onClick: () => void
  item: 'Meeting' | 'Hotel' | 'Venue'
  isOpen: boolean
}

export const BudgetBreakdownButton = ({ onClick, item, isOpen }: Props) => {
  return (
    <tr className='w-full bg-white-100 dark:bg-[#a9ba9d]'>
      <td colSpan={6} className='p-0 bg-transparent'>
        <button
          id='hotel-details'
          className='m-1 py-2 px-4 flex items-center justify-between bg-orange-300 dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-white-0 rounded-md transition duration-500 ease-in-out hover:bg-orange-500 focus:outline-none'
          onClick={onClick}
        >
          {isOpen ? `Hide ${item} Details` : `Show ${item} Details`}
          <ArrowIcon open={isOpen} />
        </button>
      </td>
    </tr>
  )
}
