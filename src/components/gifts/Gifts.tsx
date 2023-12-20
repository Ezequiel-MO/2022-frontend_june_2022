import { useActiveTab } from '../../context/ActiveTabProvider'
import { IGift } from '../../interfaces'
import { useTranslation } from '../../translations/translationContext'
import { TabContent } from '../atoms'
import { TabList } from '../molecules'
import { GiftCard } from './GiftCard'

interface Props {
  gifts: IGift[]
}

export const Gifts = ({ gifts }: Props) => {
  const { activeTab, setActiveTab } = useActiveTab()
  const { t } = useTranslation()

  const tabListItems = gifts.map((gift) => ({
    _id: gift._id,
    name: gift.name
  }))

  return (
    <>
      <div className='flex flex-wrap page-break-after' id='gifts_id'>
        {gifts?.length > 0 ? (
          <div className='w-full'>
            <h2 className='text-lg md:text-xl my-4 font-extrabold'>{`${t(
              'GIFTS'
            )}`}</h2>
            <TabList
              tabListItems={tabListItems}
              type='gift'
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onTabClick={function (id: string): void {
                throw new Error('Function not implemented.')
              }}
            />
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded'>
              <div className='px-4 py-5 flex-auto'>
                <div className='tab-content tab-space'>
                  {gifts.map((gift, index) => (
                    <TabContent
                      key={gift._id}
                      activeTab={activeTab}
                      index={index}
                    >
                      <GiftCard gift={gift} />
                    </TabContent>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
