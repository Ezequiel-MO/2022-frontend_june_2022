import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ImageTile } from '../'

describe('ImageTile', () => {
  it('renders correctly', () => {
    const mockFn = jest.fn()
    const { getByAltText } = render(
      <ImageTile imageSrc='testImage.jpg' onClick={mockFn} />
    )
    const image = getByAltText('items-gallery')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'testImage.jpg')
  })

  it('calls onClick when image is clicked', () => {
    const mockFn = jest.fn()
    const { getByAltText } = render(
      <ImageTile imageSrc='testImage.jpg' onClick={mockFn} />
    )
    const image = getByAltText('items-gallery')

    fireEvent.click(image)
    expect(mockFn).toHaveBeenCalled()
  })
  it('does not throw an error when onClick is not provided', () => {
    const { getByAltText } = render(<ImageTile imageSrc='testImage.jpg' />)
    const image = getByAltText('items-gallery')
    expect(() => fireEvent.click(image)).not.toThrow()
  })
})
