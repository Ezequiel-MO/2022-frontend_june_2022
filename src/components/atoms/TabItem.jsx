export const TabItem = ({ tabListItem, index, activeTab, setActiveTab }) => {
  const isActive = activeTab === index + 1

  return (
    <li className='m-1 last:mr-0' id={tabListItem._id}>
      <a
        className={`max-w-md text-sm font-bold uppercase px-5 py-3 shadow-sm rounded block leading-normal ${
          isActive
            ? 'dark:bg-orange-50 bg-orange-50 text-white-100 transition-all ease-in-out'
            : 'bg-white-100 dark:bg-gray-50 transition-all ease-in-out'
        }  dark:hover:text-black-50 focus:outline-none focus:shadow-outline`}
        onClick={(e) => {
          e.preventDefault()
          setActiveTab(index + 1)
        }}
        href={`#tab${index + 1}`}
        role='tablist'
      >
        {tabListItem.name}
      </a>
    </li>
  )
}
