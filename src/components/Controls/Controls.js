import React, { useState } from "react";
import styled from "styled-components";

const SControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  button {
    background-color: ${(props) => props.theme.colors.samon};
    color: ${(props) => props.theme.colors.white};
    height: 50px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
  }
`;

const Controls = (props) => {
  const { stretch, handleStretchElement, togglePagination, pagination } = props;
  return (
    <SControls>
      <button onClick={handleStretchElement}>
        {stretch ? "Fit" : "Cover"}
      </button>
      <button onClick={togglePagination}>
        {pagination ? "Remove Pagination" : "Show Pagination"}
      </button>
    </SControls>
  );
};

export default Controls;
