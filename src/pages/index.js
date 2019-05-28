import React, { useState, useEffect } from "react";
import Camera from "../components/Camera";
import Layout from "../components/Layout";
import ComplaintForm from "../components/ComplaintForm";
import UserForm from "../components/UserForm";
import { Router, navigate, Link } from "@reach/router";
import { getStoredUser, getIsNew, storeNew } from "../utils/methods";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesSquare } from "@fortawesome/pro-regular-svg-icons";

const ModalDiv = styled.div`
  justify-content: center;
  align-content: center;
  position: fixed;
  top: 16px;
  left: calc(50% - 45vw);
  background-color: white;
  padding: 20px 40px;
  width: 90vw;
  min-height: 400px;
  text-align: center;
  align-self: center;
  button {
    display: block;
    width: 40vw;
    max-width: 200px;
    margin: 24px auto;
    text-decoration: none;
  }
  #dialog-close {
    width: fit-content;
    position: absolute;
    top: 0px;
    right: 24px;
  }
`;

const Div = ({ image, setImage }) => {
  const [isNew, setNew] = useState(getIsNew());

  useEffect(() => {
    if (isNew === false) {
      return;
    }
    const returning = getIsNew();
    if (returning) {
      setNew(true);
    }
  });
  const handleNew = () => {
    storeNew(false);
    setNew(false);
  };
  return (
    <Layout>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isNew}
      >
        <ModalDiv>
          <h2>Welcome to the Lane Breach Web App!</h2>
          <p>
            This is a tool to help you report vehicles blocking bike lanes,
            [currently only supporting San Francisco]
          </p>
          <p>
            To register a complaint, you can use the camera screen to take a
            photo, fill out a couple details, and then submit your complaint.
          </p>
          <p>
            If you want SFMTA to be able to follow-up with you, you can{" "}
            <Link to="user" onClick={handleNew}>
              <Button variant="outlined" type="button">
                Add contact info
              </Button>
            </Link>
          </p>
          <p>Otherwise, click below to proceed!</p>
          <Button
            variant="outlined"
            color="primary"
            id="dialog-proceed"
            onClick={handleNew}
          >
            Let's go!
          </Button>
        </ModalDiv>
      </Modal>
      {isNew ? null : (
        <Camera
          onTakePhoto={dataUri => {
            console.log(dataUri);
            setImage(dataUri);
            navigate("/form");
          }}
          image={image}
          setImage={setImage}
        />
      )}
    </Layout>
  );
};

const App = () => {
  const [image, setImage] = useState();
  const [init, setInit] = useState(false);
  const [isNew, setNew] = useState();
  const [user, setUser] = useState({
    emailAddress: "",
    fullName: "",
    phoneNumber: ""
  });

  if (!init) {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setInit(true);
  }

  return (
    <Router>
      <Div path="/" image={image} setImage={setImage} />
      <ComplaintForm path="form" image={image} user={user} />
      <UserForm path="user" user={user} setUser={setUser} />
    </Router>
  );
};

export default App;
