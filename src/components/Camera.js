import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES
} from "jslib-html5-camera-photo";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/pro-regular-svg-icons";

const StyledFigure = styled.figure`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: baseline;
  video {
    width: 100%;
  }
  button {
    border: none;
    border-radius: 100%;
    background-color: whitesmoke;
    width: fit-content;
    position: absolute;
    bottom: 8px;
    padding: 0;
    margin: 0;
    transform: scale(1.5);
    svg {
      transform: scale(1.1);
    }
  }
`;

class Camera extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.setupVideo();
  }

  componentDidUpdate() {
    this.setupVideo();
  }

  setupVideo() {
    if (this.videoRef?.current && !this.props.image) {
      this.cameraPhoto = new CameraPhoto(this.videoRef.current);
      this.startCamera();
    }
  }

  startCamera() {
    this.cameraPhoto
      .startCamera(FACING_MODES.ENVIRONMENT, { width: 640, height: 640 })
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
    return (
      <Layout>
        {image ? (
          <div>
            <p>You have already taken an image:</p>
            <img src={image} />
            Reset:{" "}
            <button type="reset" onClick={() => setImage("")}>
              reset
            </button>
          </div>
        ) : (
          <StyledFigure>
            <video
              ref={this.videoRef}
              autoPlay
              onClick={() => {
                this.takePhoto();
              }}
            />
            <button
              id="camera-button"
              onClick={() => {
                this.takePhoto();
              }}
            >
              <FontAwesomeIcon icon={faCircle} size="3x" />
            </button>
          </StyledFigure>
        )}
      </Layout>
    );
  }
}

export default Camera;
