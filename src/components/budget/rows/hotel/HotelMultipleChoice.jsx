import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { useBudget } from '../../../../hooks'

export const HotelMultipleChoice = ({ options }) => {
  const { hotelName, setSelectedHotelName } = useBudget()

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant='standard' sx={{ m: 1, minWidth: '15rem' }}>
        <Select
          value={hotelName || options[0].name}
          onChange={(e) => setSelectedHotelName(e.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option._id} value={option.name}>
              <Typography variant='body1'>{option.name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
