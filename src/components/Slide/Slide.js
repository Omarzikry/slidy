import React, { useState } from "react";
import styled from "styled-components";

const SSlide = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;

const Slide = (props) => {
  const { children } = props;
  return <SSlide>{children}</SSlide>;
};

export default Slide;
