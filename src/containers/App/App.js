import React from "react";
import styled from "styled-components";
import Slider from "../Slider/Slider";

const STitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  padding-top: 1px;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
`;

const SAlert = styled.p`
  text-align: center;
  span {
    color: ${(props) => props.theme.colors.samon};
  }
`;

const App = () => {
  return (
    <>
      <STitle>Slidy Demo</STitle>
      <SAlert>
        Please switch to phone to test swiping{" "}
        <a href="http://slidy.surge.sh/">Demo</a>{" "}
        <span>(Infinite Supported)</span>
      </SAlert>
      <Slider />
    </>
  );
};

export default App;
