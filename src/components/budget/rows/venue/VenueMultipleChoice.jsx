import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { useBudget } from '../../../../hooks/useBudget'

export const VenueMultipleChoice = ({ options }) => {
  const { venueName, setSelectedVenueName } = useBudget()

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant='standard' sx={{ m: 1, minWidth: '15rem' }}>
        <Select
          value={venueName || options[0].name}
          onChange={(e) => setSelectedVenueName(e.target.value)}
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
