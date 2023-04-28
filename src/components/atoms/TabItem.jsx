export const TabItem = ({ tabListItem, index, activeTab, setActiveTab }) => {
  const isActive = activeTab === index + 1

  return (
    <li className='mr-2 last:mr-0 flex-auto' id={tabListItem._id}>
      <a
        className={`${
          isActive
            ? 'bg-orange-500 dark:bg-blue-50 transition-all ease-in-out'
            : 'bg-white-100 dark:bg-gray-50 transition-all ease-in-out'
        } text-sm font-bold uppercase px-5 py-3 shadow-sm rounded block leading-normal bg-white-100 hover:bg-gray-100 dark:bg-gray-50 dark:hover:bg-green-50 dark:hover:text-black-50 focus:outline-none focus:shadow-outline`}
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
