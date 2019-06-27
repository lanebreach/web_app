import React, { useState, useEffect } from "react";
import Camera from "../components/Camera";
import Layout from "../components/Layout";
import ComplaintForm from "../components/ComplaintForm";
import UserForm from "../components/UserForm";
import { getStoredUser, getIsNew, storeNew } from "../utils/methods";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import Home from "../components/Home";
import gif from "../images/Smile.gif";

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
}
`;

const IndexPage = ({ data }) => {
  const [image, setImage] = useState();
  const [init, setInit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isNew, setNew] = useState();
  const [page, setPage] = useState("home");
  const [user, setUser] = useState({
    emailAddress: "",
    fullName: "",
    phoneNumber: ""
  });
  const reset = () => {
    setImage("");
    setPage("home");
  };

  if (!init) {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setInit(true);
  }
  const triggerSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };
  const CurrentRoute = () => {
    if (page === "form") {
      return (
        <ComplaintForm
          image={image}
          user={user}
          setPage={setPage}
          reset={reset}
          success={success}
          triggerSuccess={triggerSuccess}
        />
      );
    }

    if (page === "user") {
      return <UserForm user={user} setUser={setUser} setPage={setPage} />;
    }
    return <Home image={image} setImage={setImage} setPage={setPage} />;
  };
  return (
    <Layout setPage={setPage}>
      {success ? (
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
      <CurrentRoute />
    </Layout>
  );
};

export default IndexPage;
