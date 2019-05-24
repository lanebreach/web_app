import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES
} from "jslib-html5-camera-photo";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/pro-regular-svg-icons";
import CircleButton from "./CircleButton";
import Button from "@material-ui/core/Button";

const StyledFigure = styled.figure`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: baseline;
  video {
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
  constructor(props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.setupVideo(true);
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
    return (
      <Layout>
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
          <StyledFigure>
            <video
              ref={this.videoRef}
              autoPlay
              onClick={() => {
                this.takePhoto();
              }}
            />
            <CircleButton
              onClick={() => {
                this.takePhoto();
              }}
              isClicked={!image}
            />
          </StyledFigure>
        )}
      </Layout>
    );
  }
}

export default Camera;
