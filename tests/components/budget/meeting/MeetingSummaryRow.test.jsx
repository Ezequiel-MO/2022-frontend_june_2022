import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { BudgetContext } from '../../../../src/components/budget/context/context'
import { BUDGET_ACTIONS } from '../../../../src/components/budget/context/reducer'
import MeetingSummaryRow from '../../../../src/components/budget/rows/meeting/MeetingSummaryRow'

describe('meeting rows', () => {
  afterEach(cleanup)

  const budgetValues = {
    meetingBreakdownOpen: false,
    selectedMeetingName: 'Meeting 1'
  }

  it('should render', () => {
    render(
      <BudgetContext.Provider value={{ budgetValues: {}, dispatch: () => {} }}>
        <MeetingSummaryRow />
      </BudgetContext.Provider>
    )
  })

  it('should display a row', () => {
    const { getAllByRole } = render(
      <BudgetContext.Provider value={{ budgetValues: {}, dispatch: () => {} }}>
        <MeetingSummaryRow />
      </BudgetContext.Provider>
    )
    const rows = getAllByRole('row')
    expect(rows).toHaveLength(1)
  })
  it('should display 6 cells', () => {
    render(
      <BudgetContext.Provider value={{ budgetValues: {}, dispatch: () => {} }}>
        <MeetingSummaryRow />
      </BudgetContext.Provider>
    )
    const cells = screen.getAllByRole('cell')
    expect(cells).toHaveLength(6)
  })
  it('should display prop date in first cell', () => {
    const date = 'Arrival Day'
    render(
      <BudgetContext.Provider value={{ budgetValues: {}, dispatch: () => {} }}>
        <MeetingSummaryRow date={date} />
      </BudgetContext.Provider>
    )
    const cells = screen.getAllByRole('cell')
    expect(cells[0].innerHTML).toBe(date)
  })

  it('The second cell should display a button', () => {
    render(
      <BudgetContext.Provider value={{ budgetValues: {}, dispatch: () => {} }}>
        <MeetingSummaryRow />
      </BudgetContext.Provider>
    )
    const cells = screen.getAllByRole('cell')
    expect(cells[1].querySelector('button')).toBeTruthy()
  })
  it('on click the button should dispatch a toggle action to the Budget Context', () => {
    const dispatch = jest.fn()
    render(
      <BudgetContext.Provider value={{ budgetValues, dispatch }}>
        <MeetingSummaryRow />
      </BudgetContext.Provider>
    )
    const cells = screen.getAllByRole('cell')
    const button = cells[1].querySelector('button')
    fireEvent.click(button)
    expect(dispatch).toHaveBeenCalledWith({
      type: BUDGET_ACTIONS.TOGGLE_MEETING_BREAKDOWN,
      payload: !budgetValues.meetingBreakdownOpen
    })
  })
})
