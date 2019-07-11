import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES
} from "jslib-html5-camera-photo";
import Layout from "./Layout";
import CircleButton from "./CircleButton";
import Button from "@material-ui/core/Button";
import { checkHappyPath } from "../utils/methods";
import CameraInput from "./CameraInput";

const ButtonsDiv = styled.div`
  position: relative;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  margin-left: -10vw;
  height: 200px;
  color: white;
  .placeholder {
    width: 75px;
    height: 75px;
    tab-index: -1;
    pointer-events: none;
    opacity: 0;
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

const InputDiv = styled.div`
  color: white;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  background-color: black;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  left: -10vw;
  height: 100vh;
  width: 100vw;
  button[title="Media"] {
    height: 30vh;
    width: 30vh;
  }
  h4 {
    padding: 10vw;
    text-align: center;
  }
`;

class Camera extends React.Component {
  state = {
    supportedBrowser: false
  };
  constructor(props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const happyPath = checkHappyPath();
    if (happyPath) {
      this.setupVideo(true);
      this.setState({ supportedBrowser: checkHappyPath() });
    }
  }

  componentDidUpdate() {
    this.setupVideo(false);
  }

  async componentWillUnmount() {
    const unmountPromise = new Promise((resolve, reject) => {
      function stopStreamedVideo(videoElem) {
        if (!videoElem) resolve();
        let stream = videoElem.srcObject;
        if (!stream) resolve();
        let tracks = stream.getTracks();
        tracks.forEach(function(track) {
          track.stop();
        });

        videoElem.srcObject = null;
        resolve();
      }
      stopStreamedVideo(this.videoRef?.current);
    });
    await unmountPromise;
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
      return image ? (
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
        <InputDiv>
          <CameraInput
            inputRef={this.inputRef}
            onChange={e => {
              this.handleInput(e.target.files[0]);
            }}
          />
          <h4>Click to take open your camera or select&nbsp;a&nbsp;photo</h4>
        </InputDiv>
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
              <div className="placeholder" />
              <CircleButton
                isClicked={!image}
                onClick={() => {
                  this.takePhoto();
                }}
              />
              <CameraInput
                inputRef={this.inputRef}
                onChange={e => {
                  this.handleInput(e.target.files[0]);
                }}
                preferCamera={false}
              />
            </ButtonsDiv>
          </>
        )}
      </>
    );
  }
}

export default Camera;
