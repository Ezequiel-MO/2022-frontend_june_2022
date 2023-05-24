import { render, screen } from '@testing-library/react'
import { HotelBreakdownRow } from '../../../MainTable/hotel'
import '@testing-library/jest-dom'

it('renders correctly', () => {
  const title = 'Double Room //Twin Room'
  const units = 2
  const rate = 100
  const nights = 4

  render(
    <table>
      <tbody>
        <HotelBreakdownRow
          title={title}
          units={units}
          rate={rate}
          nights={nights}
        />
      </tbody>
    </table>
  )

  expect(screen.getByText(title)).toBeInTheDocument()
  expect(screen.getByText(units.toString())).toBeInTheDocument()
  expect(screen.getByText(nights.toString())).toBeInTheDocument()
  expect(screen.getByText('€100.00')).toBeInTheDocument()
  expect(screen.getByText('€800.00')).toBeInTheDocument()
})
