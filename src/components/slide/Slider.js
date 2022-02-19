import React from 'react'
import './slider.css';
const Slider = ({image, touchStart, touchEnd, touchMove, index}) => {
  return (
    <div className="slider"
        onTouchStart={(e) => touchStart(e,index)} 
        onTouchMove={(e) => touchMove(e)}
        onTouchEnd={() => touchEnd()}
        // onMouseDown={(e) => {touchStart(e,index)}} 
        // onMouseMove={(e) => touchMove(e)}   
        // onMouseUp={() => touchEnd()} 
        // onMouseLeave={() => touchEnd()} 
        onContextMenu={(e) => e.preventDefault()}
        >
      <h2>{image.title}</h2>
      <h4>{image.price}</h4>
      <img src={image.url} alt={image.tilte} onDragStart={(e) => e.preventDefault()}/>
      <button className="btn">Buy Now</button>
    </div>
  )
}

export default Slider;