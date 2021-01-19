import React, { useState } from "react";
import styled from "styled-components";

const SPagination = styled.div`
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  display: flex;
  button {
    background-color: ${(props) => props.theme.colors.samon};
    border: none;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    cursor: pointer;
    color: ${(props) => props.theme.colors.white};
    font-size: 1.2rem;
    transition: transform 0.3s ease;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      transform: scale3d(1.2, 1.2, 1.2);
    }
    &:hover {
      transform: scale3d(1.2, 1.2, 1.2);
    }
    &:disabled {
      opacity: 0.2;
    }
  }
`;

const Pagination = (props) => {
  const { slides, goToSlide, isTransitioning, activeIndex } = props;
  return (
    <SPagination>
      {slides.map((slide, index) => {
        return (
          <button
            onClick={() => {
              goToSlide(index);
            }}
            disabled={isTransitioning ? "disabled" : false}
            className={activeIndex === index ? "active" : ""}
            key={index}
          >
            {index + 1}
          </button>
        );
      })}
    </SPagination>
  );
};

export default Pagination;
