import React, { useState, useRef } from 'react';
import Slider from './components/slide/Slider.js';
import LeftArrow from './svgs/left-arrow.svg';
import RightArrow from './svgs/right-arrow.svg';
import { images } from './data.js';
function App() {
  const [startPosition, setStartPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [movedBy, setMovedBy] = useState(0);
  const [translateXValue,setTranslateXValue] = useState(0);
  const sliderRef = useRef();

  const touchStart = (e, index) => {
    setIsDragging(true);
    setCurrentIndex(index);
    setStartPosition(e.touches[0].clientX);
    const transformMatrix = window.getComputedStyle(sliderRef.current).getPropertyValue('transform');
        if(transformMatrix !== 'none'){
            setTranslateXValue(parseInt(transformMatrix.split(',')[4].trim()));
        }
    setGrabbing(true);
  }
  const touchEnd = () => {
    setIsDragging(false);
    if (movedBy < -100) {
      setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
    }
   else if (movedBy > 100) {
      setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    }
    setGrabbing(false);
    // setCurrentPosition(0);
    // setStartPosition(0);
    // setMovedBy(0);
  }
  const touchMove = (e) => {
    if (isDragging) {
      setCurrentPosition(e.touches[0].clientX);
      setMovedBy(currentPosition - startPosition);
      sliderRef.current.style.transform = `translateX(${translateXValue + currentPosition - startPosition}px)`;
    }
  }

  const goNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  const goPrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  return (
    <div className="app">
      <div className={grabbing ? "slider-container grabbing" : "slider-container"}>
        <div className="wrapper" style={{ width: `${images.length * 100}vw`, transform: `translateX(${-currentIndex * 100}vw)` }} ref={sliderRef}>
          {images.map((image, index) => (
            <Slider image={image} key={index} index={index} touchStart={touchStart} touchEnd={touchEnd} touchMove={touchMove} />
          ))}
        </div>
        <button className="prev-btn" onClick={() => goPrev()}>
          <img src={LeftArrow} alt="left-arrow" />
        </button>
        <button className="next-btn" onClick={() => goNext()}>
          <img src={RightArrow} alt="right-arrow" />
        </button>
        <div className="dots-container">
          {Array.from(images).map((dot, index) => (
            <div className={currentIndex === index ? "dot active" : "dot"} key={index} onClick={() => setCurrentIndex(index)}></div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default App;
