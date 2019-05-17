import React, { useState, useEffect } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Layout from "./Layout";

const CustomCamera = ({ onTakePhoto, complete }) => {
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
    if (complete) {
      stream.removeTrack(stream.getTracks()[0]);
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
      {!complete ? (
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
      ) : null}
    </Layout>
  );
};
export default CustomCamera;
