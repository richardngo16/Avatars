import React from "react";
import Webcam from "react-webcam";
import { getFaceData } from "../utils/util";
import Button from "@material-ui/core/Button";

const videoConstraints = {
  facingMode: "user"
};

const CameraMode = props => {
  const { setScreenshot, setUiState, setApiResponseData } = props;
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenshot(imageSrc);
    setUiState("loading");
    const data = await getFaceData(imageSrc);
    setApiResponseData(data);
    setUiState("avatar");
  }, [webcamRef]);
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

export default CameraMode;
