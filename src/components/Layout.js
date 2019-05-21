import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faPollH,
  faPortrait
} from "@fortawesome/pro-regular-svg-icons";
import { Link } from "@reach/router";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 16px);
  margin: auto;
  width: 90vw;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  img {
    max-width: 100%;
  }
  nav {
    position: relative;
    margin-top: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    height: 50px;
    a,
    div {
      width: 25%;
      border: 1px solid #acacac;
      background-color: transparent;
      svg {
        max-height: 100%;
        width: 100%;
        height: 100%;
      }
      button {
        display: block;
        width: -webkit-fill-available;
        height: -webkit-fill-available;
      }
    }
  }
`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        height: 100vh;
    }
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      {children}
      <nav>
        <Link to="/">
          <button type="button" aria-labelledby="homeScreen camera">
            <FontAwesomeIcon icon={faCamera} size="3x" />
          </button>
        </Link>
        <Link to="/form">
          <button type="button" aria-labelledby="submitForm">
            <FontAwesomeIcon icon={faPollH} size="3x" />
          </button>
        </Link>
        <Link to="/">
          <button type="button" disabled />
        </Link>
        <Link to="/user">
          <button type="button" aria-labelledby="settingsScreen">
            <FontAwesomeIcon icon={faPortrait} size="3x" />
          </button>
        </Link>
      </nav>
    </Container>
  );
};
export default Layout;
