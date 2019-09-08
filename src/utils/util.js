const betaFaceRequest = imageSrc => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // Free Api Key, Don't need .env
      api_key: "d45fd466-51e2-4701-8da8-04351c872236",
      file_base64: imageSrc.replace("data:image/jpeg;base64,", ""),
      detection_flags: "classifiers,extended"
    })
  };
  return fetch("https://www.betafaceapi.com/api/v2/media", options);
};

const getFaceData = async imageSrc => {
  try {
    const data = await (await betaFaceRequest(imageSrc)).json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export { getFaceData };
