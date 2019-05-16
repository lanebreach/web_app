import React from "react";
import styled, { createGlobalStyle } from "styled-components";
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
  nav {
    position: relative;
    margin-top: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    height: 50px;
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
        <button type="button">
          <Link to="/">Home</Link>
        </button>
        <button type="button">
          <Link to="/user">Settings</Link>
        </button>
      </nav>
    </Container>
  );
};
export default Layout;
