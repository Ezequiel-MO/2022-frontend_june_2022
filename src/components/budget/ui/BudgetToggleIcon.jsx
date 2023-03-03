import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'

export const BudgetToggleIcon = ({ isOpen, onClick }) => {
  const icon = isOpen ? (
    <Icon icon='bx:up-arrow' color='#ea5933' />
  ) : (
    <Icon icon='bx:down-arrow' color='#ea5933' />
  )
  return <IconButton onClick={onClick}>{icon}</IconButton>
}
