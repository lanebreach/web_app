import React from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";

const ModalDiv = styled.div`
  justify-content: center;
  align-content: center;
  position: fixed;
  top: 16px;
  left: calc(50% - 45vw);
  background-color: white;
  padding: 20px 40px;
  width: 90vw;
  max-height: calc(100vh - 32px);
  overflow-y: scroll;
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

const WelcomeModal = ({ isNew, handleNew }) => (
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
        To register a complaint, you can use the camera screen to take a photo,
        fill out a couple details, and then submit your complaint.
      </p>
      <p>
        CAUTION: some drivers have responded to reporting with aggression. Of
        course, assaulting a bystander for reporting a traffic violation is
        illegal, but please exercise your best judgment and stay safe on the
        streets.
      </p>
      <p>
        If you want SFMTA to be able to follow-up with you, you can{" "}
        <Button
          variant="outlined"
          type="button"
          onClick={handleNew}
          id="add-contact"
        >
          Add contact info
        </Button>
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
);

export default WelcomeModal;
