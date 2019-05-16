import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 16px);
  margin: auto;
  width: 90vw;
  top: 0;
  left: 0;
  nav {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    height: 50px;
  }
`;

const Layout = ({ children }) => {
  return (
    <Container>
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
