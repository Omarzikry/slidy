import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import img1 from "../../assets/imgs/slide1.jpg";
import img2 from "../../assets/imgs/slide2.jpg";
import img3 from "../../assets/imgs/slide3.jpg";
import img4 from "../../assets/imgs/slide4.jpg";
import Arrows from "../../components/Arrows/Arrows";
import Pagination from "../../components/Pagination/Pagination";
import Controls from "../../components/Controls/Controls";
import Slide from "../../components/Slide/Slide";

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
  {
    src: img4,
    alt: "vacation",
  },
];

const SSlider = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.black};
  overflow: hidden;
`;

const SSliderContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  transition: transform 0.7s ease;
  img {
    height: 100%;
    width: 100%;

    &.cover {
      object-fit: cover;
    }
    &.fit {
      object-fit: contain;
    }
  }
`;

const SSliderContainer = styled.div`
  position: relative;
  width: 60vw;
  height: 70vh;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 90vw;
    height: 50vh;
  }
`;

const Slider = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(new Date());
  const [slideWidth, SetSlideWidth] = useState();
  const [lastIndex, setLastIndex] = useState(0);
  const [slides, setSlides] = useState(imgsArray);
  const [isTransitioning, setIsTransitioning] = useState();
  const [stretch, setStretch] = useState(true);
  const [pagination, setPagination] = useState(true);
  const slider = useRef();
  const sliderContent = useRef();

  // create a clone of last and first element to make infinite loop effect
  useEffect(() => {
    const firstElement = imgsArray.slice(0, 1)[0];
    const lastElement = imgsArray.slice(imgsArray.length - 1)[0];
    const slidesArray = [lastElement, ...slides, firstElement];
    setSlides(slidesArray);
  }, []);

  useEffect(() => {
    setIsTransitioning(true);

    // wait for the animation to finish then rewind the slider to it's beginning position or end position
    setTimeout(() => {
      if (activeSlide === slides.length - 2) {
        sliderContent.current.style.transition = "none";
        setActiveSlide(0);
        setLastIndex(0);
        sliderContent.current.style.transform = "translate3d(-100%,0,0)";
      }

      if (activeSlide === -1) {
        sliderContent.current.style.transition = "none";
        setActiveSlide(slides.length - 3);
        setLastIndex(slides.length - 3);
        sliderContent.current.style.transform = `translate3d(${
          -100 * (slides.length - 3) - 100
        }%,0,0)`;
      }

      setIsTransitioning(false);
    }, 700);
  }, [activeSlide]);

  // handle when next button clicked
  const nextClickHandler = () => {
    sliderContent.current.style.transition = "transform 0.7s ease";
    if (activeSlide < slides.length - 2 && !isTransitioning)
      setActiveSlide(activeSlide + 1);
  };

  // handle when prev button clicked
  const prevClickHandler = () => {
    sliderContent.current.style.transition = "transform 0.7s ease";
    if (activeSlide > -1 && !isTransitioning) setActiveSlide(activeSlide - 1);
  };

  // get drag on x value weather the device is touch or not
  const getDragX = (event, isTouch) => {
    return isTouch ? event.touches[0].pageX : event.pageX;
  };

  // handle drag start
  const handleDragStart = (event, isTouch) => {
    sliderContent.current.style.transition = "transform 0.7s ease";

    const x = getDragX(event, isTouch);

    setDragStart(x);
    setDragStartTime(new Date());

    SetSlideWidth(slider.current.offsetWidth);
  };

  // handle drag Move
  const handleDragMove = (event, isTouch) => {
    const x = getDragX(event, isTouch);
    const offset = dragStart - x;
    const percentageOffset = offset / slideWidth;
    const newIndex = lastIndex + percentageOffset;

    setActiveSlide(newIndex);
  };

  // handle drag end
  const handleDragEnd = () => {
    const timeElapsed = new Date().getTime() - dragStartTime.getTime();
    const offset = lastIndex - activeSlide;
    const velocity = Math.round((offset / timeElapsed) * 10000);

    let newIndex = Math.round(activeSlide);

    // set a threshold for swiping
    if (Math.abs(velocity) > 5) {
      newIndex = velocity < 0 ? lastIndex + 1 : lastIndex - 1;
    }

    setDragStart(0);
    setActiveSlide(newIndex);
    setLastIndex(newIndex);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    sliderContent.current.style.transition = "transform 0.7s ease";
    setActiveSlide(index);
    setLastIndex(index);
  };

  // toggle fit or cover
  const handleStretchElement = () => {
    setStretch(!stretch);
  };

  // toggle Pagination
  const togglePagination = () => {
    setPagination(!pagination);
  };

  return (
    <>
      <Controls
        stretch={stretch}
        handleStretchElement={handleStretchElement}
        togglePagination={togglePagination}
        pagination={pagination}
      />
      <SSliderContainer>
        <SSlider ref={slider}>
          <SSliderContent
            style={{
              transform: `translate3d(${-100 * activeSlide - 100}%,0,0)`,
            }}
            onTouchStart={(event) => handleDragStart(event, true)}
            onTouchMove={(event) => handleDragMove(event, true)}
            onTouchEnd={() => handleDragEnd(true)}
            ref={sliderContent}
          >
            {slides.map((img, index) => {
              return (
                <Slide key={index}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={stretch ? "cover" : "fit"}
                  />
                </Slide>
              );
            })}
          </SSliderContent>
        </SSlider>
        <Arrows
          nextClickHandler={nextClickHandler}
          prevClickHandler={prevClickHandler}
        />
        {pagination && (
          <Pagination
            slides={imgsArray}
            goToSlide={goToSlide}
            isTransitioning={isTransitioning}
            activeIndex={activeSlide}
          />
        )}
      </SSliderContainer>
    </>
  );
};

export default Slider;
