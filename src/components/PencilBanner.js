import React from "react";
import styled from "styled-components";

const PencilDiv = styled.div`
  width: 100vw;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  background-color: #357c2e;
  color: white;
  padding: 0;
  margin: 0;
  margin-left: -10vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-transform: uppercase;
`;

const PencilBanner = () => {
  // TODO: Make this message environment dependent
  const message = process.env.GATSBY_PENCIL_MESSAGE;

  console.log(message);

  if (!message) return null;
  return <PencilDiv>{message}</PencilDiv>;
};

export default PencilBanner;
