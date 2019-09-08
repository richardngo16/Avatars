import React, { useState } from "react";
import Webcam from "react-webcam";
import { getFaceData } from "./utils/util";
import Button from "@material-ui/core/Button";

// TODO Split this file into different components
// Use contextapi if needed
const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user"
};

const App = () => {
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    getFaceData(imageSrc);
  }, [webcamRef]);

  return (
    <div
      className="App"
      style={{ width: "100%", height: "100%", textAlign: "center" }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <div>
        <Button variant="contained" color="primary" onClick={capture}>
          Capture Photo
        </Button>
      </div>
    </div>
  );
};

export default App;
