import React from 'react'

type ImageTileProps = {
  imageSrc: string
  onClick: () => void
}

export const ImageTile: React.FC<ImageTileProps> = ({ imageSrc, onClick }) => (
  <div className='m-2 p-2 scale-125 hover:scale-150 ease-in duration-200 hover:z-50'>
    <img
      src={imageSrc}
      alt='items-gallery'
      onClick={onClick}
      className='block cursor-pointer w-28 h-28 border-solid hover:border-orange-50 border-2 rounded-md object-cover'
    />
  </div>
)
