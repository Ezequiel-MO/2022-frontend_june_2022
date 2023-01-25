import { useCurrentProject } from '../../hooks'
import ParagraphText from '../Text'
import { Meals, Events } from './'

export const Schedule = () => {
  const { currentProject } = useCurrentProject()
  const { schedule, suplementaryText } = currentProject

  const renderSchedule = schedule?.map((day, index) => {
    return (
      <div key={day._id} className='mb-6'>
        <div className='flex flex-col' id={`${day.date}_id`}>
          <h2
            className='text-lg md:text-xl mb-4 font-extrabold'
            id={`day_${index}`}
          >
            {day.date}
          </h2>
          {day.morningEvents.length > 0 ? (
            <>
              <ParagraphText text={day.morningEvents[0].introduction} />
              <Events events={day.morningEvents} />
            </>
          ) : suplementaryText === true ? (
            <h3 className='italic m-2 hidden'>
              No tours planned in the morning
            </h3>
          ) : null}
          {/* {day.morningMeetings.length > 0 ? (
            <>
              <p className='text-black-50 dark:text-white-50'>
                {day.morningMeetings[0].introduction}
              </p>
              <Meetings meetings={day.morningMeetings} timing='Morning' />
            </>
          ) : (
            <h3 className='italic m-2 hidden'>
              No events planned in the morning
            </h3>
          )} */}
          {day.lunch.length > 0 ? (
            <>
              <ParagraphText text={day.lunch[0].introduction} />
              <Meals restaurants={day.lunch} />
            </>
          ) : suplementaryText === true ? (
            <h3 className='italic m-2'>No meals planned for lunch</h3>
          ) : null}
          {day.afternoonEvents.length > 0 ? (
            <>
              <ParagraphText text={day.afternoonEvents[0].introduction} />
              <Events events={day.afternoonEvents} />
            </>
          ) : suplementaryText === true ? (
            <h3 className='italic m-2'>No events planned in the afternoon</h3>
          ) : null}
          {day.dinner.length > 0 ? (
            <>
              <ParagraphText text={day.dinner[0].introduction} />
              <Meals restaurants={day.dinner} />
            </>
          ) : suplementaryText === true ? (
            <h3 className='italic m-2'>No events planned for dinner</h3>
          ) : null}
        </div>

        <hr className='mt-6' />
      </div>
    )
  })

  return <div>{renderSchedule}</div>
}
