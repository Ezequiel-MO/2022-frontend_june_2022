import { useCallback, useState } from 'react'
import Modal from './Modal'
import { ImageTile } from '../../components/atoms'

const RenderPhotos = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)

  const handleImageClick = useCallback((image, index) => {
    setCurrentImage(image)
    setCurrentIndex(index)
  }, [])

  const handleRotationRight = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length
    setCurrentImage(images[nextIndex])
    setCurrentIndex(nextIndex)
  }, [currentIndex, images])

  const handleRotationLeft = useCallback(() => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    setCurrentImage(images[prevIndex])
    setCurrentIndex(prevIndex)
  }, [currentIndex, images])

  return (
    <>
      <div className='m-auto w-full'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-10 photos-layout'>
          {images.map((image, index) => (
            <ImageTile
              key={index}
              imageSrc={image}
              onClick={() => handleImageClick(image, index)}
            />
          ))}
        </div>

        {currentImage && (
          <Modal
            clickedImg={currentImage}
            setClickedImg={setCurrentImage}
            handleRotationLeft={handleRotationLeft}
            handleRotationRight={handleRotationRight}
          />
        )}
      </div>
    </>
  )
}

export default RenderPhotos
