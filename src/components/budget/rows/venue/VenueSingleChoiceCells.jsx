import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useBudget } from '../../../../hooks/useBudget'

const VenueSingleChoiceCells = ({ pax, options, description, date, id }) => {
  const { updateEventTotalCost, setCurrentMeals } = useBudget()

  useEffect(() => {
    setCurrentMeals(date, id, options[0]._id)
  }, [options[0], id])

  useEffect(() => {
    updateEventTotalCost(date, id, pax, options[0]._id)
  }, [id])

  return <Box>{options[0].name}</Box>
}

export default VenueSingleChoiceCells
