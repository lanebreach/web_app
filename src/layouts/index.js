import React from "react";
import { navigate } from "gatsby";
import styled, { createGlobalStyle } from "styled-components";
import store from "store";
import { Helmet } from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import gif from "../images/Smile.gif";
import { getSubmissions } from "../utils/methods";
import PencilBanner from "../components/PencilBanner";

const SuccessScreen = styled.div`
  position: fixed;
  z-index: 10;
  color: white;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #357c2e;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  animation: fadeInFromNone 0.5s ease;
  h2 {
    font-size: 2.5rem;
    font-family: Arial, Helvetica, sans-serif;
  }
  @keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: flex;
      opacity: 0;
    }

    100% {
      display: flex;
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  position: relative;
  height: 100vh;
  max-height: calc(100vh - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
  margin: auto;
  padding: 0 10vw;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  img {
    max-width: 100%;
  }
`;

const Nav = styled.nav`
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  margin-top: auto;
  max-height: 50px;
  height: 50px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;

  svg {
    height: 30px;
    max-height: 100%;
    width: 100%;
  }
  button {
    box-sizing: border-box;
    margin: auto;
    display: block;
    background: transparent;
    border: none;
    width: 100%;
    width: -webkit-fill-available;
    height: 100%;
    height: -webkit-fill-available;
    border: 1px solid #acacac;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }
`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        height: 100vh;
    }
`;

export const AppContext = React.createContext();

class Layout extends React.Component {
  state = {
    image: "",
    success: false,
    user: {
      emailAddress: "",
      fullName: "",
      phoneNumber: ""
    },
    description: "",
    category: "Private vehicle",
    submissions: []
  };

  setImage = (image, cb) => {
    this.setState({ image }, cb);
  };

  setSuccess = success => {
    this.setState({ success });
  };

  setUser = user => {
    this.setState({ user });
    store.set("user", user);
  };

  setSubmissions = submissions => {
    this.setState({ submissions });
    store.set("submissions", submissions);
  };

  setDescription = description => {
    this.setState({ description });
  };

  setCategory = category => {
    this.setState({ category });
  };

  reset() {
    this.setState(
      {
        image: "",
        description: "",
        category: "Private vehicle"
      },
      () => {
        navigate("/");
      }
    );
  }
  triggerSuccess = () => {
    const { setSuccess } = this;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  componentWillMount() {
    this.setState({
      user: store.get("user"),
      submissions: store.get("submissions")
    });
  }

  componentDidMount() {
    this.setImage = this.setImage.bind(this);
    this.triggerSuccess = this.triggerSuccess.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setSubmissions = this.setSubmissions.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    const {
      state,
      props,
      setImage,
      setSubmissions,
      setDescription,
      setCategory,
      triggerSuccess,
      setUser,
      reset
    } = this;
    const { children } = props;
    const sharedContext = {
      ...state,
      setImage,
      setSubmissions,
      setDescription,
      setCategory,
      triggerSuccess,
      setUser,
      reset
    };
    return (
      <Container>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Helmet>
        <CssBaseline />
        <GlobalStyle />
        <AppContext.Provider value={sharedContext}>
          <PencilBanner />
          {this.state.success ? (
            <SuccessScreen>
              <picture>
                <source
                  type="video/mp4"
                  srcSet="https://lane-breach.s3-us-west-1.amazonaws.com/images/Bike_Smile.mp4"
                />
                <img src={gif} />
                <h2>Success!</h2>
              </picture>
            </SuccessScreen>
          ) : null}
          {children}
        </AppContext.Provider>
        <Nav>
          <button
            type="button"
            aria-labelledby="homeScreen camera"
            onClick={() => navigate("/")}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="camera"
              className="svg-inline--fa fa-camera fa-w-16 fa-2x "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M342.7 144H464v288H48V144h121.3l24-64h125.5l23.9 64zM324.3 32h-131c-20 0-37.9 12.4-44.9 31.1L136 96H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48h-88l-14.3-38c-5.8-15.7-20.7-26-37.4-26zM256 408c-66.2 0-120-53.8-120-120s53.8-120 120-120 120 53.8 120 120-53.8 120-120 120zm0-192c-39.7 0-72 32.3-72 72s32.3 72 72 72 72-32.3 72-72-32.3-72-72-72z"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-labelledby="submitForm"
            onClick={() => navigate("/form")}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="poll-h"
              className="svg-inline--fa fa-poll-h fa-w-14 fa-2x "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M448 432V80c0-26.5-21.5-48-48-48H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48zm-400 0V80h352v352H48zm48-280v16c0 8.84 7.16 16 16 16h128c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H112c-8.84 0-16 7.16-16 16zm0 96v16c0 8.84 7.16 16 16 16h224c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H112c-8.84 0-16 7.16-16 16zm0 96v16c0 8.84 7.16 16 16 16h64c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-64c-8.84 0-16 7.16-16 16z"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-labelledby="submissions"
            onClick={() => navigate("/submissions")}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="list"
              className="svg-inline--fa fa-list fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M80 48H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416-136H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16z"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-labelledby="settingsScreen"
            onClick={() => navigate("/user")}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="user-edit"
              className="svg-inline--fa fa-user-edit fa-w-20 fa-2x "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M358.9 433.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-41.8 41.8 71.8 71.7 41.8-41.8c9.2-9.3 9.2-24.4-.1-33.8zM223.9 288c79.6.1 144.2-64.5 144.1-144.1C367.9 65.6 302.4.1 224.1 0 144.5-.1 79.9 64.5 80 144.1c.1 78.3 65.6 143.8 143.9 143.9zm-4.4-239.9c56.5-2.6 103 43.9 100.4 100.4-2.3 49.2-42.1 89.1-91.4 91.4-56.5 2.6-103-43.9-100.4-100.4 2.3-49.3 42.2-89.1 91.4-91.4zM134.4 352c14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 16.7 0 32.2 5 45.5 13.3l34.4-34.4c-22.4-16.7-49.8-26.9-79.9-26.9-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h258.3c-3.8-14.6-2.2-20.3.9-48H48v-25.6c0-47.6 38.8-86.4 86.4-86.4z"
              />
            </svg>
          </button>
        </Nav>
      </Container>
    );
  }
}
export default Layout;
