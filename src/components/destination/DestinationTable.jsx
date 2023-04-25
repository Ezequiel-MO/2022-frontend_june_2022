export const DestinationTable = () => {
  return (
    <div className='py-8'>
      <h2 className='text-2xl font-semibold mb-4'>Corporate Event Details</h2>
      <table className='w-full text-left border-collapse '>
        <thead className='dark:text-black-50'>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2'>Category</th>
            <th className='px-4 py-2'>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-t'>
            <td className='px-4 py-2'>Population</td>
            <td className='px-4 py-2'>1.6 million</td>
          </tr>
          {/* Add more rows */}
        </tbody>
      </table>
    </div>
  )
}
