import { MapOutlined } from '@mui/icons-material'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'

function SidebarRow({ title }) {
  return (
    <ListItem button>
      <ListItemIcon>
        <MapOutlined />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  )
}

export default SidebarRow
