import {
  EventNoteOutlined,
  HotelOutlined,
  MapOutlined,
  SearchOutlined
} from '@mui/icons-material'
import {
  Divider,
  Drawer,
  IconButton,
  Box,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'

const Sidebar = () => {
  return (
    <Drawer
      open={true}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 2 }}>
        <List>
          <ListItem>
            <Input
              type='text'
              placeholder='Search...'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label='toggle password visibility'>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MapOutlined />
            </ListItemIcon>
            <ListItemText primary={'Map'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EventNoteOutlined />
            </ListItemIcon>
            <ListItemText primary={'Overview'} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <HotelOutlined />
            </ListItemIcon>
            <ListItemText primary={'Accommodation'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
