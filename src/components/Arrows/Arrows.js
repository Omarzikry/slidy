import React, { useState } from "react";
import styled from "styled-components";
import arrowRight from "../../assets/imgs/arrow-right.svg";

const SArrows = styled.div`
  button {
    height: 100px;
    background: none;
    border: none;
    position: absolute;
    cursor: pointer;
    mix-blend-mode: difference;
    filter: saturate(1.2);
    img {
      height: 100%;
    }
    &:focus {
      outline: 0;
    }
  }
`;

const SArrowPrevBtn = styled.button`
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const SArrowNextBtn = styled.button`
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const SPrevImg = styled.img`
  transform: rotate(180deg);
`;

const Slider = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { nextClickHandler, prevClickHandler } = props;

  return (
    <SArrows>
      <SArrowPrevBtn onClick={prevClickHandler}>
        <SPrevImg src={arrowRight} alt="" />
      </SArrowPrevBtn>

      <SArrowNextBtn onClick={nextClickHandler}>
        <img src={arrowRight} alt="" />
      </SArrowNextBtn>
    </SArrows>
  );
};

export default Slider;
