import React from 'react'
import { Icon } from '@iconify/react'
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import { useCurrentProject } from '../../hooks'

interface Props {
  leftIconsText: string[]
  rightIconsText: string[]
}

const HotelIcons: React.FC<Props> = ({ leftIconsText, rightIconsText }) => {
  const { currentProject } = useCurrentProject()
  const { clientCompany = [] } = currentProject
  const { colorPalette = [] } = clientCompany[0] || {}
  const defaultColor = '#ea5933'
  const iconColor = colorPalette.length > 0 ? colorPalette[0] : defaultColor

  const createIconElement = (iconName: string) => (
    <Icon icon={iconName} color={iconColor} width='28' />
  )

  const leftIcons = [
    createIconElement('akar-icons:location'),
    createIconElement('bx:bx-restaurant'),
    createIconElement('icon-park-outline:hotel-please-clean'),
    createIconElement('akar-icons:wifi')
  ]

  const rightIcons = [
    createIconElement('ic:outline-pool'),
    createIconElement('akar-icons:clock'),
    createIconElement('ic:sharp-meeting-room'),
    createIconElement('si-glyph:wheel-chair')
  ]

  const createMixedArray = (icons: JSX.Element[], texts: string[]) => {
    return icons.map((icon, i) => ({ icon, text: texts[i] }))
  }

  const mixedLeft = createMixedArray(leftIcons, leftIconsText)
  const mixedRight = createMixedArray(rightIcons, rightIconsText)

  const renderList = (items: { icon: JSX.Element; text: string }[]) => (
    <List component='nav'>
      {items.map((item, i) => (
        <ListItem key={i}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <div className='overflow-x-scroll no-scrollbar'>
      <div className='flex justify-start'>
        {renderList(mixedLeft)}
        {renderList(mixedRight)}
      </div>
    </div>
  )
}

export default HotelIcons
