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
          <tr className='border-t'>
            <td className='px-4 py-2'>Conference Centers</td>
            <td className='px-4 py-2'>
              Barcelona International Convention Centre, Casa Llotja de Mar,
              etc.
            </td>
          </tr>
          <tr className='border-t'>
            <td className='px-4 py-2'>Hotels with Meeting Facilities</td>
            <td className='px-4 py-2'>Over 300 hotels</td>
          </tr>
          <tr className='border-t'>
            <td className='px-4 py-2'>Connectivity</td>
            <td className='px-4 py-2'>
              Barcelona–El Prat Airport, high-speed rail links
            </td>
          </tr>
          <tr className='border-t'>
            <td className='px-4 py-2'>Incentive Attractions</td>
            <td className='px-4 py-2'>
              Sagrada Familia, Park Güell, Picasso Museum, etc.
            </td>
          </tr>
          <tr className='border-t'>
            <td className='px-4 py-2'>Local Cuisine</td>
            <td className='px-4 py-2'>
              Diverse culinary scene, from traditional Catalan cuisine to
              international gourmet
            </td>
          </tr>
          <tr className='border-t'>
            <td className='px-4 py-2'>Sustainability</td>
            <td className='px-4 py-2'>
              Committed to eco-friendly practices, ideal for green events
            </td>
          </tr>
          <tr className='border-t'>
            <td className='px-4 py-2'>Tech Hub</td>
            <td className='px-4 py-2'>
              22@ district, home to several tech startups and innovation centers
            </td>
          </tr>
          <tr className='border-t'>
            <td className='px-4 py-2'>Americas Cup Host</td>
            <td className='px-4 py-2'>Hosting Americas Cup in 2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
