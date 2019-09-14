import React, { useState } from "react";
import UserAvatar from "./components/UserAvatar";
import CameraMode from "./components/CameraMode";

// TODO Split this file into different components
// Use contextapi if needed
const App = () => {
  //states
  const [uiState, setUiState] = useState("camera");
  const [apiResponseData, setApiResponseData] = useState([]);
  const [screenshot, setScreenshot] = useState("");

  const LoadingScreen = () => {
    return (
      <div>
        <h1>Please Wait ...</h1>
      </div>
    );
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      {uiState === "camera" && (
        <CameraMode
          setUiState={setUiState}
          setScreenshot={setScreenshot}
          setApiResponseData={setApiResponseData}
        />
      )}
      {uiState === "loading" && <LoadingScreen />}
      {uiState === "avatar" && (
        <UserAvatar apiResponseData={apiResponseData} screenshot={screenshot} />
      )}
    </div>
  );
};

export default App;
