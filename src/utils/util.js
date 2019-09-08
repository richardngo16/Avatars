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
    return data.media.faces[0].tags;
  } catch (e) {
    console.error(e);
  }
};

// Takes in Array of Data
// {
//   "name": "5oclock shadow",
//   "value": "no",
//   "confidence": 0.43
// }
export const mapHairData = apiDataResponse => {
  const wearingHat = apiDataResponse.filter(field => {
    return field.name === "wearing hat";
  })[0].value;

  console.log("Wearing Hat?", wearingHat);
  if (wearingHat === "yes") {
    console.log("yes hat");
    return "Hat";
  }

  const noHairCheck = apiDataResponse.filter(field => {
    return field.name === "bald";
  })[0];

  console.log(
    "NoHair?",
    noHairCheck.value,
    "Confidence?",
    noHairCheck.confidence
  );

  if (noHairCheck.value === "yes" && noHairCheck.confidence >= 0.9) {
    return "NoHair";
  }

  //none, very short, short, average, long, very long
  const hairLength = apiDataResponse.filter(field => {
    return field.name === "hair length";
  })[0].value;
  console.log("hair length", hairLength);

  return "ShortHairFrizzle";
};
export { getFaceData };
