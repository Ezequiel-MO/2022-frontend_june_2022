import { useActiveTab } from '../../context/ActiveTabProvider'
import { useTranslation } from '../../translations/translationContext'
import { TabContent } from '../atoms'
import { TabList } from '../molecules'
import { GiftCard } from './GiftCard'

export const Gifts = ({ gifts }) => {
  const { activeTab, setActiveTab } = useActiveTab()
  const { t } = useTranslation()
  return (
    <>
      <div className='flex flex-wrap page-break-after' id='gifts_id'>
        <h2 className='text-lg md:text-xl my-4 font-extrabold'>{`${t(
          'GIFTS'
        )}`}</h2>
        {gifts?.length > 0 ? (
          <div className='w-full'>
            <TabList
              tabListItems={gifts}
              type='gift'
              activeTab={activeTab}
              setActiveTab={setActiveTab}
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
