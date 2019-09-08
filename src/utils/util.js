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

export const getFaceData = async imageSrc => {
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
export const mapTopType = apiDataResponse => {
  const wearingHat = apiDataResponse.filter(field => {
    return field.name === "wearing hat";
  })[0];

  console.log("Wearing Hat?", wearingHat.value);
  if (wearingHat.value === "yes" && wearingHat.confidence > 0.8) {
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

  // none, very short, short, average, long, very long
  const hairLength = apiDataResponse.filter(field => {
    return field.name === "hair length";
  })[0].value;

  // very short, short, average, thick, very thick
  const hairTop = apiDataResponse.filter(field => {
    return field.name === "hair top";
  })[0].value;
  console.log("hair length", hairLength);
  console.log("hair top", hairTop);

  switch (hairLength) {
    case "none":
      // already did NoHair This is Sanity Check
      if (hairTop === "very short") {
        return "ShortHairTheCaesar";
      }
      if (hairTop === "short") {
        return "ShortHairRound";
      }
      break;
    case "very short":
      return "ShortHairTheCaesar";
    case "short":
      return "ShortHairRound";
    case "average":
      return "LongHairNotTooLong";
    default:
      return "LongHairStraight";
  }
};

export const mapHairColor = apiDataResponse => {
  //black, blond, red, brown, brown light, not natural light, not natural
  const hairColor = apiDataResponse.filter(field => {
    return field.name === "hair color type";
  })[0];
  console.log("haircolor", hairColor);
  switch (hairColor.value) {
    case "black":
      return "Black";
    case "blond":
      return "Blonde";
    case "brown":
      return "BrownDark";
    case "brown light":
      return "Brown";
    case "red":
      if (hairColor.confidence > 0.8) return "Red";
      break;
    default:
      return "Brown";
  }
};

export const mapGlasses = apiDataResponse => {
  const hasGlasses = apiDataResponse.filter(field => {
    return field.name === "glasses";
  })[0].value;
  return hasGlasses === "yes" ? "Prescription02" : "Blank";
};
