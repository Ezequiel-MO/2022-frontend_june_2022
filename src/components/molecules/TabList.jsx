import { TabItem } from '../atoms'

export const TabList = ({ tabListItems, activeTab, setActiveTab }) => {
  if (tabListItems.length === 0) return null
  return (
    <ul className='flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row'>
      {tabListItems?.map((tabListItem, index) => (
        <TabItem
          key={tabListItem._id}
          tabListItem={tabListItem}
          index={index}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </ul>
  )
}
