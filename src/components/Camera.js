import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES
} from "jslib-html5-camera-photo";
import Layout from "./Layout";
import CircleButton from "./CircleButton";
import Button from "@material-ui/core/Button";

const ButtonsDiv = styled.div`
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-left: -10vw;
  height: 200px;
  color: white;
  button[role="trigger"] {
    position: absolute;
    bottom: 15px;
    left: calc(50% + 75px);
    height: 50px;
    width: 50px;
    border-radius: 100%;
    padding: 10px;
    border: none;
    filter: invert(1);
  }
  input {
    display: none;
    background-color: white;
  }
`;

const StyledFigure = styled.figure`
  position: relative;
  top: 0;
  left: -10vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 100vw;
  width: 100vw;
  height: -webkit-fill-available;
  max-height: 80%;
  background: black;
  margin: 0;
  video {
    /* margin-top: calc(((100vh - 50px) - 100vw) * 0.33); */
    width: 100%;
    max-width: 60vh;
  }
`;

const ResetDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .row {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    margin: 24px;
    button {
      margin-left: 12px;
    }
  }
`;

class Camera extends React.Component {
  state = {
    supportedBrowser: true
  };
  constructor(props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.setupVideo(true);
    if (!("navigator" in window) || !navigator.mediaDevices) {
      this.setState({ supportedBrowser: false });
    }
  }

  componentDidUpdate() {
    this.setupVideo(false);
  }

  setupVideo(initialize) {
    if (this.videoRef?.current && !this.props.image) {
      if (initialize) this.cameraPhoto = new CameraPhoto(this.videoRef.current);
      this.startCamera();
    }
  }

  startCamera() {
    if (!this.cameraPhoto) this.setupVideo(true);
    this.cameraPhoto
      ?.startCamera(FACING_MODES.ENVIRONMENT, { width: 640, height: 640 })
      .then(() => {
        console.log("camera is started !");
      })
      .catch(error => {
        console.error("Camera not started!", error);
      });
  }

  takePhoto() {
    const config = {
      sizeFactor: 1
    };
    this.props.onTakePhoto(this.cameraPhoto.getDataUri(config));
    this.stopCamera();
  }

  handleInput(file) {
    var reader = new FileReader();
    var uri = reader.readAsDataURL(this.inputRef?.current?.files[0]);
    const { onTakePhoto } = this.props;
    reader.addEventListener(
      "load",
      function() {
        onTakePhoto(reader.result);
      },
      false
    );
  }

  stopCamera() {
    this.cameraPhoto
      .stopCamera()
      .then(() => {
        console.log("Camera stoped!");
      })
      .catch(error => {
        console.log("No camera to stop!:", error);
      });
  }
  inputRef = React.createRef();
  render() {
    const { image, setImage } = this.props;
    // TODO #4 Support file upload as fallback for camera
    if (!this.state?.supportedBrowser)
      return (
        <p style={{ marginBottom: "100%" }}>
          We're sorry, but this browser does not support all the features we
          need for this app to work correctly.
        </p>
      );
    return (
      <>
        {image ? (
          <ResetDiv>
            <p>You have already taken an image:</p>
            <img src={image} />
            <div className="row">
              Reset:{" "}
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                type="reset"
                onClick={() => setImage("")}
              >
                Reset
              </Button>
            </div>
          </ResetDiv>
        ) : (
          <>
            <StyledFigure
              onClick={() => {
                this.takePhoto();
              }}
            >
              <video ref={this.videoRef} autoPlay />
            </StyledFigure>
            <ButtonsDiv>
              <CircleButton isClicked={!image} />
              <label htmlFor="camera-input">
                <button
                  onClick={() => {
                    this.inputRef?.current?.click();
                  }}
                  type="button"
                  role="trigger"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="image"
                    class="svg-inline--fa fa-image fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V112c0-8.822 7.178-16 16-16h416c8.822 0 16 7.178 16 16v288zM112 232c30.928 0 56-25.072 56-56s-25.072-56-56-56-56 25.072-56 56 25.072 56 56 56zm0-80c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm207.029 23.029L224 270.059l-31.029-31.029c-9.373-9.373-24.569-9.373-33.941 0l-88 88A23.998 23.998 0 0 0 64 344v28c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-92c0-6.365-2.529-12.47-7.029-16.971l-88-88c-9.373-9.372-24.569-9.372-33.942 0zM416 352H96v-4.686l80-80 48 48 112-112 80 80V352z"
                    />
                  </svg>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  name="camera-input"
                  ref={this.inputRef}
                  onChange={e => {
                    this.handleInput(e.target.files[0]);
                  }}
                />
              </label>
            </ButtonsDiv>
          </>
        )}
      </>
    );
  }
}

export default Camera;
