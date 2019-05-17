import React, { useState, useEffect } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Layout from "./Layout";

const CustomCamera = ({ onTakePhoto, image, setImage }) => {
  const [windowSize, setWindowSize] = useState({});
  const [stream, setStream] = useState();
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (!init && typeof window !== undefined) {
      setInit(true);
      setWindowSize({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
      });
    }
    if (image && stream) {
      stream.removeTrack(stream.getTracks()[0]);
      setStream(undefined);
    }
  });
  function onCameraStart(newStream) {
    if (!stream) {
      console.log("onCameraStart");
      setStream(newStream);
    }
  }
  return (
    <Layout>
      {!image ? (
        <Camera
          onTakePhoto={dataUri => {
            onTakePhoto(dataUri);
          }}
          onCameraStart={onCameraStart}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          idealResolution={{
            height: windowSize.innerHeight,
            width: windowSize.innerWidth
          }}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.97}
          isMaxResolution={false}
          isImageMirror={false}
          isSilentMode={false}
          isDisplayStartCameraError={true}
          isFullscreen={false}
          sizeFactor={1}
        />
      ) : (
        <div>
          <p>You have already taken an image:</p>
          <img src={image} />
          Reset:{" "}
          <button type="reset" onClick={() => setImage("")}>
            reset
          </button>
        </div>
      )}
    </Layout>
  );
};
export default CustomCamera;
