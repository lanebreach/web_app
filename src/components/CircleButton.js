import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 20%;
  height: 40px;
  width: 40px;
  #outer-circle {
    position: absolute;
    left: -37px;

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

export const CircleButton = ({ onClick, isClicked, className }) => {
  const innerCircleClasses = isClicked ? "is-clicked" : "";
  return (
    <StyledButton id="container-circles" className={className}>
      <div id="outer-circle" onClick={onClick}>
        <div id="inner-circle" className={innerCircleClasses} />
      </div>
    </StyledButton>
  );
};

CircleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired
};

export default CircleButton;
