import React from "react";
import styled from "styled-components";

const PencilDiv = styled.div`
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
`;

const message = process.env.GATSBY_PENCIL_MESSAGE;

const PencilBanner = () => {
  if (!message) return null;
  return <PencilDiv>{message}</PencilDiv>;
};

export default PencilBanner;
