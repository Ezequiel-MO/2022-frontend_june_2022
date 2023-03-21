import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { usePartialCostsData } from './usePartialCostsData'
import { CostItem } from './CostItem'

export const PartialCosts = ({ colorPalette = [] }) => {
  const { data, costItems } = usePartialCostsData()

  ChartJS.register(ArcElement, Tooltip, Legend)

  const iconColor = colorPalette.length > 0 ? colorPalette[2] : '#ea5933'

  return (
    <div className='flex flex-row items-center justify-center'>
      <div className='mt-10 w-2/3'>
        {costItems.map((item) => (
          <CostItem key={item.title} {...item} color={iconColor} />
        ))}
      </div>
      <div className='w-1/3 hidden md:flex md:justify-center md:items-center'>
        <Doughnut data={data} className='flex-shrink-0' />
      </div>
    </div>
  )
}
