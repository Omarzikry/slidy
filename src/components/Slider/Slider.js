import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import img1 from "../../assets/imgs/slide1.jpg";
import img2 from "../../assets/imgs/slide2.jpg";
import img3 from "../../assets/imgs/slide3.jpg";
import Pagination from "../Pagination/Pagination";

let imgsArray = [
  {
    src: img1,
    alt: "Photographer",
  },
  {
    src: img2,
    alt: "Shoes",
  },
  {
    src: img3,
    alt: "jumper",
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
    width: 100%;
    object-fit: cover;
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
  const [slideWidth, SetSlideWidth] = useState();
  const [lastIndex, setLastIndex] = useState(0);
  const [slides, setSlides] = useState(imgsArray);
  const [isTransitioning, setIsTransitioning] = useState();
  const slider = useRef();
  const sliderContent = useRef();

  useEffect(() => {
    const firstElement = imgsArray.slice(0, 1)[0];
    const lastElement = imgsArray.slice(imgsArray.length - 1)[0];
    const slidesArray = [lastElement, ...slides, firstElement];
    setSlides(slidesArray);
  }, []);

  useEffect(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (activeSlide === slides.length - 2) {
        sliderContent.current.style.transition = "none";
        setActiveSlide(0);
        sliderContent.current.style.transform = "translate3d(-100%,0,0)";
      }
      if (activeSlide === -1) {
        sliderContent.current.style.transition = "none";
        setActiveSlide(slides.length - 3);
        sliderContent.current.style.transform = `translate3d(${
          -100 * (slides.length - 3) - 100
        }%,0,0)`;
      }
      setIsTransitioning(false);
    }, 700);
  }, [activeSlide]);

  const nextClickHandler = () => {
    sliderContent.current.style.transition = "transform 0.7s ease";
    if (activeSlide < slides.length - 2 && !isTransitioning)
      setActiveSlide(activeSlide + 1);
  };
  const prevClickHandler = () => {
    sliderContent.current.style.transition = "transform 0.7s ease";
    if (activeSlide > -1 && !isTransitioning) setActiveSlide(activeSlide - 1);
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
    } else if (newIndex >= slides.length) {
      newIndex = slides.length - 1;
    }

    setDragStart(0);
    setActiveSlide(newIndex);
    setLastIndex(newIndex);
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
          style={{ transform: `translate3d(${-100 * activeSlide - 100}%,0,0)` }}
          onTouchStart={(event) => handleDragStart(event, true)}
          onTouchMove={(event) => handleDragMove(event, true)}
          onTouchEnd={() => handleDragEnd(true)}
          ref={sliderContent}
        >
          {slides.map((img, index) => {
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
