import { Icon } from '@iconify/react'
import * as styles from '../../../constants/styles/mainsection'
import { RichParagraph } from '../../atoms/RichParagraph'

interface Props {
  id: string
  icon: string
  title: string
  introduction?: string
  children?: React.ReactNode
}

export const ScheduleItemLayout: React.FC<Props> = ({
  id,
  icon,
  title,
  introduction,
  children
}) => (
  <div id={id} className='page-break-after'>
    <div className='flex items-center'>
      <Icon icon={icon} className='text-2xl mr-2' />
      <h1 className={styles.h1Title}>{title}</h1>
    </div>
    {introduction && <RichParagraph text={introduction} />}
    {children}
  </div>
)
