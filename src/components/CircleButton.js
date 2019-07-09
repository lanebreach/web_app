import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  position: relative;
  left: 30px;
  width: 40px;
  margin-bottom: 7vh;
  border: none;
  background: transparent;

  #outer-circle {
    position: absolute;
    left: -18px;
    top: 0;
    height: 75px;
    width: 75px;

    /*
    opacity of 0.4
  */
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;

    z-index: 1;
  }

  #inner-circle {
    position: absolute;
    left: 50%;
    top: 38px;

    height: 44px;
    width: 44px;

    background: white;
    border-radius: 50%;

    /*
   Offset the position correctly with
   minus half of the width and minus half of the height
  */
    margin: -22px 0px 0px -22px;

    /*
    On the top of outer-circle
  */
    z-index: 2;
  }

  #inner-circle.is-clicked {
    height: 38px;
    width: 38px;
    margin: -19px 0px 0px -19px;
  }
`;

export const CircleButton = ({ className }) => {
  const [isClicked, setClicked] = useState(false);
  const innerCircleClasses = isClicked ? "is-clicked" : "";

  return (
    <div
      style={{ position: "relative", height: "100px", width: "100px" }}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
    >
      <StyledButton id="container-circles" className={className}>
        <div id="outer-circle">
          <div id="inner-circle" className={innerCircleClasses} />
        </div>
      </StyledButton>
    </div>
  );
};

CircleButton.propTypes = {
  isClicked: PropTypes.bool.isRequired
};

export default CircleButton;
