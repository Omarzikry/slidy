import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import img1 from "../../assets/imgs/slide1.jpg";
import img2 from "../../assets/imgs/slide2.jpg";
import Pagination from "../Pagination/Pagination";

const imgsArray = [
  {
    src: img1,
    alt: "Photographer",
  },
  {
    src: img2,
    alt: "Shoes",
  },
  {
    src: img1,
    alt: "Photographer",
  },
];

const SSlider = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
  overflow: hidden;
`;

const SSliderContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  transition: transform 0.7s ease;
  div {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
  }
  img {
    height: 100%;
    max-width: 100%;
  }
`;

const SSliderContainer = styled.div`
  position: relative;
  width: 60vw;
  height: 600px;
  margin: 0 auto;
`;

const Slider = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(new Date());
  const [transition, setTransition] = useState(false);
  const [slideWidth, SetSlideWidth] = useState();
  const [lastIndex, setLastIndex] = useState(0);
  const slider = useRef(null);

  const nextClickHandler = () => {
    if (activeSlide < imgsArray.length - 1) setActiveSlide(activeSlide + 1);
  };
  const prevClickHandler = () => {
    if (activeSlide !== 0) setActiveSlide(activeSlide - 1);
  };

  const getDragX = (event, isTouch) => {
    // console.log(isTouch ? "is Touch:" + event.touches[0].pageX : event.pageX);
    return isTouch ? event.touches[0].pageX : event.pageX;
  };

  // handle drag start

  const handleDragStart = (event, isTouch) => {
    const x = getDragX(event, isTouch);

    setDragStart(x);
    setDragStartTime(new Date());
    setTransition(false);

    SetSlideWidth(slider.current.offsetWidth);
  };

  // handle drag start
  const handleDragMove = (event, isTouch) => {
    const x = getDragX(event, isTouch);
    const offset = dragStart - x;
    const percentageOffset = offset / slideWidth;
    console.log(percentageOffset);
    const newIndex = lastIndex + percentageOffset;
    // const SCROLL_OFFSET_TO_STOP_SCROLL = 30;

    // Stop scrolling if you slide more than 30 pixels
    // if (Math.abs(offset) > SCROLL_OFFSET_TO_STOP_SCROLL) {
    //   event.stopPropagation();
    //   event.preventDefault();
    // }
    setActiveSlide(newIndex);
  };

  // handle drag end
  const handleDragEnd = () => {
    const timeElapsed = new Date().getTime() - dragStartTime.getTime();
    const offset = lastIndex - activeSlide;
    const velocity = Math.round((offset / timeElapsed) * 10000);

    let newIndex = Math.round(activeSlide);

    if (Math.abs(velocity) > 5) {
      newIndex = velocity < 0 ? lastIndex + 1 : lastIndex - 1;
    }

    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= imgsArray.length) {
      newIndex = imgsArray.length - 1;
    }

    setDragStart(0);
    setActiveSlide(newIndex);
    setLastIndex(newIndex);
    setTransition(true);
  };

  //TODO: automatic slide
  //   const autoSlide = () => {
  //     setInterval(() => {
  //       if (activeSlide < imgsArray.length - 1) setActiveSlide(activeSlide + 1);
  //     }, 2000);
  //   };

  return (
    <SSliderContainer>
      <SSlider ref={slider}>
        <SSliderContent
          style={{ transform: `translate3d(${-100 * activeSlide}%,0,0)` }}
          onTouchStart={(event) => handleDragStart(event, true)}
          onTouchMove={(event) => handleDragMove(event, true)}
          onTouchEnd={() => handleDragEnd(true)}
        >
          {imgsArray.map((img, index) => {
            return (
              <div key={index}>
                <img src={img.src} alt={img.alt} />
              </div>
            );
          })}
        </SSliderContent>
      </SSlider>
      <Pagination
        nextClickHandler={nextClickHandler}
        prevClickHandler={prevClickHandler}
      />
    </SSliderContainer>
  );
};

export default Slider;
