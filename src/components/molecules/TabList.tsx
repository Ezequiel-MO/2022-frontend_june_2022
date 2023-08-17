import { TabItem } from '../atoms'
import './styles.css'
import { useEffect, useRef, useState } from 'react'

type TabListItemType = {
  _id: string
  name: string
}

type TabListProps = {
  tabListItems: TabListItemType[]
  type: string
  activeTab: number
  setActiveTab: (index: number) => void
}

export const TabList = ({
  tabListItems,
  type,
  activeTab,
  setActiveTab
}: TabListProps) => {
  const ref = useRef<HTMLUListElement>(null)

  const [indicatorStyles, setIndicatorStyles] = useState<{
    left: string
    width: string
  }>({
    left: '0px',
    width: '0px'
  })

  useEffect(() => {
    if (ref.current) {
      const nodes = ref.current.childNodes
      if (nodes[activeTab - 1]) {
        const element = nodes[activeTab - 1] as HTMLElement
        setIndicatorStyles({
          left: `${element.offsetLeft}px`,
          width: `${element.offsetWidth}px`
        })
      }
    }
  }, [activeTab, ref])

  return (
    <ul className='flex flex-wrap gap-1 md:gap-2 py-4 pl-4 tab-list' ref={ref}>
      {tabListItems.map((tabListItem, index) => (
        <TabItem
          key={tabListItem._id}
          tabListItem={tabListItem}
          type={type}
          index={index}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
      <span
        style={{
          ...indicatorStyles,
          position: 'absolute',
          bottom: '0',
          height: '4px',
          backgroundColor: '#ea5933'
        }}
        className='transition-all ease-in-out duration-300'
      ></span>
    </ul>
  )
}
