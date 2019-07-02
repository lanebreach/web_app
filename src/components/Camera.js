import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES
} from "jslib-html5-camera-photo";
import Layout from "./Layout";
import CircleButton from "./CircleButton";
import Button from "@material-ui/core/Button";

const StyledFigure = styled.figure`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 100vw;
  height: -webkit-fill-available;
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
          <StyledFigure
            onClick={() => {
              this.takePhoto();
            }}
          >
            <video ref={this.videoRef} autoPlay />
            <CircleButton isClicked={!image} />
          </StyledFigure>
        )}
      </>
    );
  }
}

export default Camera;
