import React, { useState } from "react";
import Webcam from "react-webcam";
import { getFaceData, mapHairData } from "./utils/util";
import Button from "@material-ui/core/Button";
import Avatar from "avataaars";

// TODO Split this file into different components
// Use contextapi if needed

const videoConstraints = {
  facingMode: "user"
};

const App = () => {
  //states
  const [uiState, setUiState] = useState("camera");
  const [apiResponseData, setApiResponseData] = useState([]);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUiState("loading");
    const data = await getFaceData(imageSrc);
    console.log(data);
    setApiResponseData(data);
    setUiState("avatar");
  }, [webcamRef]);

  const CameraMode = () => {
    return (
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          height={300}
          width={"100%"}
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

  const LoadingScreen = () => {
    return (
      <div>
        <h1>Please Wait ...</h1>
      </div>
    );
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      {uiState === "camera" && <CameraMode />}
      {uiState === "loading" && <LoadingScreen />}
      {uiState === "avatar" && (
        <Avatar
          topType={mapHairData(apiResponseData)}
          clotheType="Hoodie"
          clotheColor="Black"
          eyeType="Default"
          eyebrowType="Default"
        />
      )}
    </div>
  );
};

export default App;
